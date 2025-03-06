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
import { useState } from "react";
import { FormField } from "@/components/ui/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import useCurrencyFormatter from "@/lib/hooks/use-currency-formatter";

const formSchema = z.object({
    search: z.string().optional(),
    date: z.array(z.date()).default([]),
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
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
            date: [],
            sort: "newest",
        },
    });

    const [tab, setTab] = useState<"all" | "pending" | "completed">("all");

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

    return (
        <div className="w-full pt-6 flex flex-col items-start gap-6">
            <div className="w-full px-6">
                <Tabs defaultValue="all" className="w-full mb-4">
                    <TabsList className="bg-gray-50 w-fit">
                        <TabsTrigger value="all" onClick={() => setTab("all")} className="data-[state=active]:bg-white w-[100px] h-7">All</TabsTrigger>
                        <TabsTrigger value="pending" onClick={() => setTab("pending")} className="data-[state=active]:bg-white w-[100px] h-7">In progress</TabsTrigger>
                        <TabsTrigger value="completed" onClick={() => setTab("completed")} className="data-[state=active]:bg-white w-[100px] h-7">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex justify-center w-full">
                    <Form {...form}>
                        <form className="flex flex-wrap items-center justify-center gap-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Input placeholder="Search..." className="pl-10 h-10 w-full hover:bg-gray-50 shadow-none hover:border-gray-50 rounded-lg placeholder:text-soft-400 placeholder:font-normal placeholder:text-sm border border-soft-200" />
                            </div>
                            <div className="w-auto">
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
                                                            "min-w-[125px] transition-all group h-9 duration-200 pl-3 text-left font-normal flex justify-end flex-row-reverse items-center",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value && field.value.length > 0 ? (
                                                            field.value.length === 1
                                                                ? format(field.value[0], "PPP")
                                                                : `${field.value.length} dates selected`
                                                        ) : (
                                                            <span className="text-soft-400 group-hover:text-main-900 transition-all duration-200 font-medium text-sm">Select Date</span>
                                                        )}
                                                        <Icons.calendar className="size-4 group-hover:stroke-main-900 transition-all duration-200" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[280px] p-3 bg-white rounded-xl shadow-lg border-none"
                                                align="start">
                                                <Calendar
                                                    mode="multiple"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                    className="rounded-md"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[122px] hover:bg-accent hover:data-[placeholder]:text-main-900 group h-9 cursor-pointer rounded-lg border flex items-center justify-between appearance-none">
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
                        </form>
                    </Form>
                </div>
            </div>

            <div className="w-full overflow-x-auto px-2">
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
                        {filteredBilling.map((billing) => (
                            <TableRow key={billing.id} className="border-soft-200 hover:bg-white cursor-auto">
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-center gap-2 mt-6">
                    <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                        &laquo;
                    </Button>
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
                    <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                        4
                    </Button>
                    <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                        5
                    </Button>
                    <span>...</span>
                    <Button variant="outline" className="w-8 h-8 border-soft-200 bg-white text-sub-600 font-medium text-s m rounded-lg p-1.5">
                        16
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                        &rsaquo;
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 p-0">
                        &raquo;
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Billing;