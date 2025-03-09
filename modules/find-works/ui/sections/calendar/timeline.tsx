"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Icons } from "@/components/icons";

// Toplantı durumları için tip tanımı
type MeetingStatus = "Submitted" | "Pending" | "Overdue";

// Toplantı verisi için arayüz
interface Meeting {
    id: string;
    title: string;
    startDate: string;
    amount: number;
    status: MeetingStatus;
}

// Mock veri
const mockMeetings: Meeting[] = [
    {
        id: "1",
        title: "Meeting with James Brown",
        startDate: "JANUARY 28, 2025",
        amount: 253,
        status: "Submitted"
    },
    {
        id: "2",
        title: "Meeting with Laura Perez",
        startDate: "JANUARY 28, 2025",
        amount: 1253,
        status: "Pending"
    },
    {
        id: "3",
        title: "Meeting with Arthur Taylor",
        startDate: "JANUARY 28, 2025",
        amount: 253,
        status: "Overdue"
    },
    {
        id: "4",
        title: "Meeting with Arthur Taylor",
        startDate: "JANUARY 28, 2025",
        amount: 253,
        status: "Overdue"
    },
    {
        id: "5",
        title: "Meeting with Arthur Taylor",
        startDate: "JANUARY 28, 2025",
        amount: 253,
        status: "Overdue"
    }
];

const Timeline = () => {
    const [activeTab, setActiveTab] = useState("7-days");

    // Durum badge'i için renk ve ikon belirleme
    const getStatusBadge = (status: MeetingStatus) => {
        switch (status) {
            case "Submitted":
                return <span className="text-sub-600 text-xs font-medium">Submitted</span>;
            case "Pending":
                return (
                    <div className="flex items-center gap-1 text-sub-600">
                        <Icons.warning className="size-4" />
                        <span className="text-xs font-medium">Pending</span>
                    </div>
                );
            case "Overdue":
                return (
                    <div className="flex items-center gap-1 text-white bg-error-base pr-2 pl-1 h-5 py-0.5 rounded-full">
                        <Icons.overdue className="size-4" />
                        <span className="text-xs font-medium">Overdue</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <Tabs 
                defaultValue="7-days" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full max-w-md mx-auto border-b border-soft-200 flex items-center justify-center"
            >
                <TabsList className="grid grid-cols-3 bg-transparent h-auto p-0">
                    <TabsTrigger 
                        value="7-days" 
                        className="relative cursor-pointer text-sm py-4 px-6 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
                    >
                        7 Days
                        {activeTab === "7-days" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                        )}
                    </TabsTrigger>
                    <TabsTrigger 
                        value="15-days" 
                        className="relative cursor-pointer text-sm py-4 px-6 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
                    >
                        15 Days
                        {activeTab === "15-days" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                        )}
                    </TabsTrigger>
                    <TabsTrigger 
                        value="30-days" 
                        className="relative cursor-pointer text-sm py-4 px-6 font-medium data-[state=active]:bg-transparent data-[state=active]:text-strong-950 data-[state=active]:shadow-none text-sub-600 hover:text-gray-700 rounded-none border-0 h-auto"
                    >
                        30 Days
                        {activeTab === "30-days" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                        )}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex flex-col p-4 gap-2.5">
                {mockMeetings.map((meeting) => (
                    <div 
                        key={meeting.id} 
                        className="bg-weak-50 rounded-[12px] p-4 flex flex-col gap-4"
                    >
                        <div>
                            <h3 className="text-sm font-medium text-strong-950 tracking-[-0.6%]">{meeting.title}</h3>
                            <p className="text-soft-400 text-[11px] tracking-[2%]">STARTED ON {meeting.startDate}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-normal text-sub-600">${meeting.amount.toLocaleString()}</span>
                            {getStatusBadge(meeting.status)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;