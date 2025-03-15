import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/trpc/client";
import { Separator } from "@/components/ui/separator";
import { getTokenFromCookie } from "@/app/server/action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Tag {
    id: string;
    name: string;
}

interface FileUploadModalProps {
    children: React.ReactNode;
    workerId: string;
    nickname: string;
}

interface FormValues {
    file: File | null;
    subject?: string;
    tags: Tag[];
    displayPreferences: {
        displayOnProfile: boolean;
        disableCommenting: boolean;
    };
}

const FileUploadModal = ({ children, workerId, nickname }: FileUploadModalProps) => {
    const { data: skillTags } = trpc.jobPosting.getSkills.useQuery();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const commandRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            file: null,
            subject: "",
            tags: [],
            displayPreferences: {
                displayOnProfile: true,
                disableCommenting: true
            }
        }
    });

    const file = form.watch("file");
    const tags = form.watch("tags");
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadingAttachments, setUploadingAttachments] = useState(false);

    const availableTags: Tag[] = skillTags && Array.isArray(skillTags)
        ? skillTags.map(tag => ({
            id: tag.id,
            name: tag.name
        }))
        : [];

    const filteredTags = availableTags.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tags.some(selectedTag => selectedTag.id === tag.id)
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            form.setValue("file", selectedFile);
            simulateUpload(selectedFile);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const selectedFile = e.dataTransfer.files[0];
            form.setValue("file", selectedFile);
            simulateUpload(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const simulateUpload = (file: File) => {
        setUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const removeFile = () => {
        form.setValue("file", null);
        setUploading(false);
        setUploadProgress(0);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setIsSearching(value.length > 0);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };

    const addTag = (tag: Tag) => {
        if (!tags.some(t => t.id === tag.id)) {
            form.setValue("tags", [...tags, tag]);
            setSearchQuery("");
            setIsSearching(false);
        }
    };

    const removeTag = (tagId: string) => {
        form.setValue("tags", tags.filter(tag => tag.id !== tagId));
    };

    const shouldShowList = (isFocused && searchQuery === "") || isSearching;

    const { data: portfolio } = trpc.talent.getPortfolioByWorkerId.useQuery(workerId);

    const createPortfolio = trpc.talent.createPortfolio.useMutation({
        onSuccess: () => { },
        onError: () => { }
    });

    const createPortfolioItem = trpc.talent.createPortfolioItem.useMutation({
        onSuccess: async (data) => {
            const portfolioItemId = data.id;
            const formData = new FormData();
            formData.append("attachments", file!, file!.name);
            const token = await getTokenFromCookie();

            try {
                const res = await fetch(`http://localhost:3000/portfolio/${portfolio.id}/portfolio-items/${portfolioItemId}/attachments`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Upload failed with status: ${res.status}`);
                }
                const dataResponse = await res.json();
                if (dataResponse) {
                    toast.success("File uploaded successfully");
                    setUploading(false);
                    setUploadProgress(0);
                    form.setValue("file", null);
                    setOpen(false);
                }
            } catch { }
            finally {
                setUploadingAttachments(false);
            }
        },
        onError: () => { }
    });

    const onSubmit = (data: FormValues) => {
        setUploadingAttachments(true);
        if (portfolio?.statusCode === 404) {
            return createPortfolio.mutate({
                workerId,
                title: `${nickname}'s Portfolio`,
                description: data.subject || "No description",
            }, {
                onSuccess: (portfolioData) => {
                    createPortfolioItem.mutate({
                        portfolioId: portfolioData.id,
                        title: data.subject || "Untitled Portfolio",
                        description: data.subject || "No description",
                        startDate: new Date().toISOString(),
                        endDate: new Date().toISOString(),
                        tagIds: data.tags.map(tag => tag.id),
                        displayOnProfile: data.displayPreferences.displayOnProfile,
                        disableComments: data.displayPreferences.disableCommenting,
                    });
                }
            });
        }

        return createPortfolioItem.mutate({
            portfolioId: portfolio.id,
            title: data.subject || "Untitled Portfolio",
            description: data.subject || "No description",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            tagIds: data.tags.map(tag => tag.id),
            displayOnProfile: data.displayPreferences.displayOnProfile,
            disableComments: data.displayPreferences.disableCommenting,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-h-[750px] overflow-y-auto custom-scroll bg-white rounded-3xl p-0">
                <DialogHeader className="p-4 flex items-start border-b border-soft-200 justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-soft-200 flex items-center justify-center bg-white">
                            <Icons.settings />
                        </div>
                        <div className="flex flex-col gap-1">
                            <DialogTitle><span className="text-main-900 font-medium text-sm">Upload Files</span></DialogTitle>
                            <span className="text-sub-600 font-normal text-xs">Select and upload the files of your choice</span>
                        </div>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="px-6 pb-6">
                            <div
                                key="upload-dropzone"
                                className="border border-dashed h-[200px] border-[#CDD0D5] rounded-[12px] p-8 flex flex-col items-center justify-center gap-5"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <Icons.upload_cloud className="size-6" />
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-sm font-medium text-main-900">Choose a file or drag & drop it here.</p>
                                    <p className="text-xs font-normal text-soft-400">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
                                </div>
                                <label htmlFor="file-upload" className="mt-2">
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".jpeg,.jpg,.png,.pdf,.mp4"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-8 w-[116px] rounded-lg py-1.5 px-4 text-sub-600 shadow-none font-medium text-sm cursor-pointer"
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        Browse File
                                    </Button>
                                </label>
                            </div>

                            {file && (
                                <div key="upload-progress" className="border border-soft-200 rounded-lg p-4 pl-[14px] mt-4">
                                    <div className="flex items-start gap-1 justify-between mb-3">
                                        <div>
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="text-sm font-medium text-sub-600 whitespace-nowrap line-clamp-1">{file.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-sub-600 font-normal">
                                                        {Math.round(file.size / 1024)} KB of {Math.round((file.size / 1024) * 2)} KB
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <Icons.close className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <div className="animate-spin text-blue-600">
                                            {uploading && <Icons.uploading key="uploading-icon" className="w-4 h-4" />}
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {uploading ? "Uploading..." : "Upload complete"}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0.5">
                                            <FormLabel className="block text-strong-950 text-sm font-medium">
                                                Subject <span className="text-sub-600 font-normal text-sm">(optional)</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Project subject"
                                                    className="bg-transparent shadow-none h-10 hover:border-weak-50 hover:bg-weak-50 transition-all duration-200 border border-soft-200 placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0.5">
                                            <FormLabel className="text-strong-950 text-sm font-medium flex items-center">
                                                Tags <span className="text-sub-600 font-normal text-sm">(max. 8)</span> <Icons.info />
                                            </FormLabel>
                                            <FormControl>
                                                <div ref={commandRef} className="relative">
                                                    <Command className="rounded-lg border border-soft-200">
                                                        <div className="flex items-center">
                                                            <CommandInput
                                                                placeholder="Search skills or add your own..."
                                                                className="flex-1 outline-none border-0 focus:ring-0 focus-visible:ring-0 placeholder:text-soft-400"
                                                                value={searchQuery}
                                                                onValueChange={handleSearch}
                                                                onFocus={handleFocus}
                                                                onBlur={handleBlur}
                                                                autoFocus={false}
                                                            />
                                                        </div>
                                                    </Command>

                                                    <AnimatePresence>
                                                        {shouldShowList && (
                                                            <motion.div
                                                                className="absolute z-50 w-full bg-white border border-soft-200 rounded-lg mt-1 shadow-lg max-h-[200px] overflow-auto"
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <Command className="border-0">
                                                                    <CommandList className="max-h-none">
                                                                        {filteredTags.length === 0 ? (
                                                                            <CommandEmpty>No results found.</CommandEmpty>
                                                                        ) : (
                                                                            <CommandGroup heading={searchQuery ? "Search Results" : "All Tags"}>
                                                                                {filteredTags.map((tag) => (
                                                                                    <CommandItem
                                                                                        key={tag.id}
                                                                                        onSelect={() => addTag(tag)}
                                                                                        className="cursor-pointer hover:bg-weak-50"
                                                                                    >
                                                                                        {tag.name}
                                                                                    </CommandItem>
                                                                                ))}
                                                                            </CommandGroup>
                                                                        )}
                                                                    </CommandList>
                                                                </Command>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </FormControl>
                                            <FormMessage />

                                            {tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {tags.map((tag) => (
                                                        <div
                                                            key={tag.id}
                                                            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-weak-50 hover:border-weak-50 transition-all duration-200 bg-white border border-soft-200"
                                                        >
                                                            <span className="text-sub-600 font-medium text-xs">{tag.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTag(tag.id)}
                                                                className="focus:outline-none"
                                                            >
                                                                <Icons.close className="h-3 w-3 text-sub-600 cursor-pointer" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <FormLabel className="block text-strong-950 text-sm font-medium">
                                        Display Preferences
                                    </FormLabel>
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="displayPreferences.displayOnProfile"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-y-0 py-1">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="data-[state=checked]:bg-sub-600 w-4 h-4 data-[state=checked]:text-white"
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-sm text-sub-600 cursor-pointer">
                                                            Display on profile
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="displayPreferences.disableCommenting"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-y-0 py-1">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="data-[state=checked]:bg-sub-600 w-4 h-4 data-[state=checked]:text-white"
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-sm text-sub-600 cursor-pointer">
                                                            Disable commenting
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-6 bg-soft-200" />

                            <div className="flex w-full items-center gap-3 px-5">
                                <Button type="button" variant="outline" className="flex-1 h-9 rounded-lg border-soft-200 bg-white p-2 flex items-center justify-center">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={uploadingAttachments}
                                    className="flex-1 h-9 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                    {uploadingAttachments ? <Loader2 className="size-4 animate-spin" /> : "Upload"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default FileUploadModal;