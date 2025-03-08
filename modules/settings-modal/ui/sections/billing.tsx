"use client";

import { Input } from "@/components/ui/input";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { FormField } from "@/components/ui/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import useCurrencyFormatter from "@/lib/hooks/use-currency-formatter";
import { DatePickerForm } from "@/components/custom/form-elements/date-picker";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
    search: z.string().optional(),
    date: z.date().default(new Date()),
    sort: z.string().optional(),
});

type BillingStatus = "Active" | "Pending" | "Close" | "Dispute" | "Overdue";

interface Billing {
    id: string;
    companyName: string;
    contactPerson: {
        name: string;
        avatar: string;
    };
    subject: string;
    amount: number;
    contractDetails: {
        name: string;
        size: string;
    };
    rating: number;
    status: BillingStatus;
}

const mockBilling: Billing[] = [
    {
        id: "1",
        companyName: "James Brown",
        contactPerson: {
            name: "James Brown",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Active"
    },
    {
        id: "2",
        companyName: "Arthur Taylor",
        contactPerson: {
            name: "Arthur Taylor",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Pending"
    },
    {
        id: "3",
        companyName: "Matthew Johnson",
        contactPerson: {
            name: "Matthew Johnson",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Active"
    },
    {
        id: "4",
        companyName: "Emma Wright",
        contactPerson: {
            name: "Emma Wright",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Close"
    },
    {
        id: "5",
        companyName: "Natalia Nowak",
        contactPerson: {
            name: "Natalia Nowak",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Dispute"
    },
    {
        id: "6",
        companyName: "Wei Chen",
        contactPerson: {
            name: "Wei Chen",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Overdue"
    },
    {
        id: "7",
        companyName: "Lena Müller",
        contactPerson: {
            name: "Lena Müller",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Active"
    },
    {
        id: "8",
        companyName: "Juma Omondi",
        contactPerson: {
            name: "Juma Omondi",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Active"
    },
    {
        id: "9",
        companyName: "Ravi Patel",
        contactPerson: {
            name: "Ravi Patel",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Active"
    },
    {
        id: "10",
        companyName: "Laura Perez",
        contactPerson: {
            name: "Laura Perez",
            avatar: "/assets/images/profile.png"
        },
        subject: "Subject name",
        amount: 1598,
        contractDetails: {
            name: "trello-contract.WAV",
            size: "1.9 MB"
        },
        rating: 4.5,
        status: "Active"
    }
];

const Billing = () => {
    const pathname = usePathname();
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
            date: new Date(),
            sort: "newest",
        },
    });

    const [tab, setTab] = useState<"all" | "pending" | "completed">("all");
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    // Check screen size when component mounts and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 640);
            setIsTablet(width >= 640 && width < 1024);
            setIsLoading(false);
        };
        
        // Initial check
        checkScreenSize();
        
        // Add event listener for window resize
        window.addEventListener("resize", checkScreenSize);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    }

    const filteredBilling = mockBilling.filter(billing => {
        if (tab === "all") return true;
        if (tab === "pending") return billing.status === "Pending";
        if (tab === "completed") return billing.status === "Close";
        return true;
    });

    const { formatCurrency } = useCurrencyFormatter();

    const getBadge = (status: BillingStatus) => {
        switch (status) {
            case "Active":
                return <Badge className="h-6 w-14 py-1 px-2 bg-white border border-soft-200 text-sub-600 font-medium text-xs">{status}</Badge>
            case "Pending":
                return <Badge className="h-6 flex items-center gap-1 py-1 px-2 bg-white border border-soft-200 text-sub-600 font-medium text-xs">
                    <Icons.warning />
                    {status}</Badge>
            case "Close":
                return <Badge className="h-6 flex items-center gap-1 py-1 px-2 bg-white border border-soft-200 text-sub-600 font-medium text-xs">
                    <Icons.forbid_fill />
                    {status}</Badge>
            case "Dispute":
                return <Badge className="h-6 flex items-center gap-1 py-1 px-2 bg-white border border-soft-200 text-sub-600 font-medium text-xs">
                    <Icons.error_warning_fill />
                    {status}</Badge>
            case "Overdue":
                return <Badge className="h-6 flex items-center gap-1 py-1 px-2 bg-white border border-soft-200 text-sub-600 font-medium text-xs">
                    <Icons.error_warning_fill />
                    {status}</Badge>
        }
    }

    const toggleExpandRow = (id: string) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    // Don't render until we've determined the screen size
    if (isLoading) {
        return null;
    }

    return (
        <div className={cn(
            "w-full flex flex-col items-start",
            isMobile ? "pt-3 gap-4" : "pt-6 gap-6"
        )}>
            <div className={cn(
                "w-full",
                isMobile ? "px-4" : "px-6",
                {
                    "flex flex-row items-center justify-between": pathname === "/orders" && !isMobile,
                    "flex flex-col gap-4": isMobile
                }
            )}>
                <Tabs defaultValue="all" className={cn(
                    "w-full",
                    isMobile ? "mb-2" : "mb-4"
                )}>
                    <TabsList className={cn(
                        "bg-gray-50 w-fit",
                        isMobile && "w-full"
                    )}>
                        <TabsTrigger 
                            value="all" 
                            onClick={() => setTab("all")} 
                            className={cn(
                                "cursor-pointer data-[state=active]:bg-white h-7",
                                isMobile ? "flex-1" : "w-[100px]"
                            )}
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger 
                            value="pending" 
                            onClick={() => setTab("pending")} 
                            className={cn(
                                "cursor-pointer data-[state=active]:bg-white h-7",
                                isMobile ? "flex-1" : "w-[100px]"
                            )}
                        >
                            In progress
                        </TabsTrigger>
                        <TabsTrigger 
                            value="completed" 
                            onClick={() => setTab("completed")} 
                            className={cn(
                                "cursor-pointer data-[state=active]:bg-white h-7",
                                isMobile ? "flex-1" : "w-[100px]"
                            )}
                        >
                            Completed
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className={cn(
                    "flex",
                    isMobile ? "w-full flex-col gap-3" : "w-full justify-center",
                    pathname !== "/orders" ? "justify-center" : "justify-end"
                )}>
                    <Form {...form}>
                        <form className={cn(
                            "flex items-center gap-4",
                            isMobile ? "flex-col w-full" : "flex-wrap",
                            pathname !== "/orders" && "w-full justify-center"
                        )} onSubmit={form.handleSubmit(onSubmit)}>
                            <div className={cn(
                                "bg-white border border-[#E1E4EA] rounded-xl h-9 flex items-center pl-3 pr-2.5 py-2.5",
                                isMobile ? "w-full" : "w-[300px]"
                            )}>
                                <Icons.search />
                                <Input className="bg-transparent shadow-none border-none placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Serch..." />
                                {!isMobile && (
                                    <div className="bg-transparent border border-[#E1E4EA] w-8 h-5 rounded-sm py-0.5 px-1.5 flex items-center justify-center">
                                        <Icons.shortcut />
                                    </div>
                                )}
                            </div>
                            <div className={cn(
                                "flex items-center gap-4",
                                isMobile ? "w-full justify-between" : ""
                            )}>
                                {pathname !== "/orders" ? (
                                    <div className={cn(
                                        isMobile ? "flex-1" : "w-auto"
                                    )}>
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <Popover modal>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "transition-all group h-9 duration-200 pl-3 text-left font-normal flex justify-end flex-row-reverse items-center",
                                                                    !field.value && "text-muted-foreground",
                                                                    isMobile ? "flex-1 w-full" : "min-w-[125px]"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span className="text-soft-400 group-hover:text-main-900 transition-all duration-200 font-medium text-sm">Select Date</span>
                                                                )}
                                                                <Icons.calendar className="size-4 group-hover:stroke-main-900 transition-all duration-200" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0 shadow-none bg-transparent border-none"
                                                        align="start">
                                                        <DatePickerForm
                                                            form={form}
                                                            open={true}
                                                            label=""
                                                            name="date"
                                                            className="shadow-sm border border-soft-200 h-10 py-0 w-40 rounded-[10px] flex items-center justify-center"
                                                            icon={<Icons.calendar_line className="size-5" />}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <Button variant="outline" className={cn(
                                        "border border-soft-200 h-9 rounded-lg flex items-center gap-1 text-sub-600 font-medium text-sm",
                                        isMobile ? "flex-1" : "w-[82px]"
                                    )}>
                                        <Icons.filter />
                                        Filter
                                    </Button>
                                )}
                                <Select>
                                    <SelectTrigger className={cn(
                                        "hover:bg-accent hover:data-[placeholder]:text-main-900 group h-9 cursor-pointer rounded-lg border flex items-center justify-between appearance-none",
                                        isMobile ? "flex-1" : "w-[122px]"
                                    )}>
                                        <Icons.sort_desc className="group-hover:fill-main-900 transition-all duration-200" />
                                        <SelectValue placeholder="Sort by" className="group-hover:data-[placeholder]:text-main-900 transition-all duration-200" />
                                    </SelectTrigger>
                                    <SelectContent className="border-soft-200">
                                        <SelectGroup>
                                            <SelectItem value="newest">Newest</SelectItem>
                                            <SelectItem value="oldest">Oldest</SelectItem>
                                            <SelectItem value="highest">Highest</SelectItem>
                                            <SelectItem value="lowest">Lowest</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <div className={cn(
                "w-full",
                isMobile ? "px-0" : "px-2 overflow-x-auto"
            )}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                    >
                        {isMobile ? (
                            // Mobile card view
                            <div className="flex flex-col gap-4 px-4">
                                {filteredBilling.map((billing, index) => (
                                    <motion.div
                                        key={billing.id}
                                        className="border border-soft-200 rounded-lg p-4 bg-white"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.05,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <span className="absolute -top-1 -right-1 size-5 z-10">
                                                        <Icons.top_rated />
                                                    </span>
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={billing.contactPerson.avatar} alt={billing.contactPerson.name} />
                                                        <AvatarFallback>{billing.contactPerson.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm text-strong-950">{billing.companyName}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="text-yellow-400 fill-yellow-400" size={14} />
                                                        <span className="text-sm text-strong-950 font-normal">{billing.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getBadge(billing.status)}
                                                <Button variant="ghost" size="icon" className="rounded-md cursor-pointer h-8 w-8 p-0">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sub-600 text-xs">Subject:</span>
                                                <span className="text-strong-950 font-normal text-sm">{billing.subject}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sub-600 text-xs">Amount:</span>
                                                <span className="text-strong-950 font-normal text-sm">{formatCurrency(billing.amount)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sub-600 text-xs">Contract:</span>
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/assets/svgs/wav.svg"
                                                        alt="Pdf"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-strong-950">{billing.contractDetails.name}</p>
                                                        <p className="text-xs text-sub-600 font-normal">{billing.contractDetails.size}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            // Desktop table view
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="w-[250px]">Company Name</TableHead>
                                        <TableHead className="w-[250px]">Contact Person</TableHead>
                                        <TableHead className="w-[250px]">Contract Details</TableHead>
                                        <TableHead className="w-[100px]">Rating</TableHead>
                                        <TableHead className="w-[150px]">Status</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBilling.map((billing, index) => (
                                        <motion.tr
                                            key={billing.id}
                                            className="border-soft-200 hover:bg-white cursor-auto"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                            custom={index}
                                        >
                                            <TableCell className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <span className="absolute -top-1 -right-1 size-5 z-10">
                                                            <Icons.top_rated />
                                                        </span>
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={billing.contactPerson.avatar} alt={billing.contactPerson.name} />
                                                            <AvatarFallback>{billing.contactPerson.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-sm text-strong-950">{billing.companyName}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="text-yellow-400 fill-yellow-400" size={14} />
                                                            <span className="text-sm text-strong-950 font-normal">{billing.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <span className="text-strong-950 font-normal text-sm">Subject name</span>
                                                    <p className="text-xs text-sub-600">{formatCurrency(billing.amount)}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src="/assets/svgs/wav.svg"
                                                        alt="Pdf"
                                                        width={32}
                                                        height={32}
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-strong-950">{billing.contractDetails.name}</p>
                                                        <p className="text-xs text-sub-600 font-normal">{billing.contractDetails.size}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                                    <span className="text-strong-950 font-normal text-sm">{billing.rating}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getBadge(billing.status)}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="rounded-md cursor-pointer">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        <div className={cn(
                            "flex items-center justify-center gap-2 mt-6",
                            isMobile && "flex-wrap px-4"
                        )}>
                            {!isMobile && (
                                <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                                    &laquo;
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                                &lsaquo;
                            </Button>
                            <Button variant="outline" className="w-8 h-8 p-0 bg-weak-50 text-sub-600 font-medium text-sm">
                                1
                            </Button>
                            <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                                2
                            </Button>
                            <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                                3
                            </Button>
                            {!isMobile && (
                                <>
                                    <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                                        4
                                    </Button>
                                    <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                                        5
                                    </Button>
                                </>
                            )}
                            <span>...</span>
                            <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                                16
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                                &rsaquo;
                            </Button>
                            {!isMobile && (
                                <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                                    &raquo;
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Billing;