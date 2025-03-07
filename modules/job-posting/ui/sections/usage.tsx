"use client"
import { Checkbox } from "@/components/ui/checkbox";
import CardLayout from "../components/card-layout";
import { jobPostingMenu } from "@/lib/mockData";
import { useQueryState } from "nuqs";



const Usage = () => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const isOpen = tab === "usage";
    const item = jobPostingMenu.find((item) => item.value === "usage");
    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "usage" ? "" : "usage")} item={item}>
        <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex flex-col gap-4 w-full">
                <span className="bg-weak-50 py-1.5 px-3 rounded-md h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    USAGE
                </span>
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-start gap-2">
                        <Checkbox className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">Business</span>
                            <span className="text-sub-600 font-normal text-xs">For purposes such as signing contracts and issuing.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Checkbox className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">Private</span>
                            <span className="text-sub-600 font-normal text-xs">For purposes such as hobbies and interests.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <span className="bg-weak-50 py-1.5 px-3 rounded-md h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    PRIVACY
                </span>
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-start gap-2">
                        <Checkbox className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">Public</span>
                            <span className="text-sub-600 font-normal text-xs">Any worker can apply for the job.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Checkbox className="data-[state=checked]:bg-[#525866] data-[state=checked]:border-[#525866] cursor-pointer" />
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-sub-600 font-medium text-sm">Private</span>
                            <span className="text-sub-600 font-normal text-xs">Only those who have been invited can take part in the work.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CardLayout>
}

export default Usage;