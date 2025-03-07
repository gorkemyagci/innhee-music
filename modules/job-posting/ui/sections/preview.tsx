"use client"
import CardLayout from "../components/card-layout";
import { jobPostingMenu } from "@/lib/mockData";
import { useQueryState } from "nuqs";


const Preview = () => {
    const [tab, setTab] = useQueryState("tab", { defaultValue: "basic-information" });
    const isOpen = tab === "preview";
    const item = jobPostingMenu.find((item) => item.value === "preview");
    return <CardLayout isOpen={isOpen} toggleOpen={() => setTab(tab === "preview" ? "" : "preview")} item={item}>
        <div className="w-full flex flex-col gap-0">
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3  h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 1 DESCRIPTON
                </span>
                <div className="p-4 text-sub-600 font-medium text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, laborum.
                </div>
            </div>
            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 2 TAGS
                </span>
                <div className="p-4 flex flex-col gap-8">
                    {/* Experience Levels */}
                    <div className="flex flex-row justify-between gap-10 items-start">
                        <h3 className="text-gray-600 text-sm font-normal shrink-0">Experience Levels</h3>
                        <div className="flex flex-wrap gap-2 justify-end">
                            <div className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                Entry Level
                            </div>
                            <div className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                Intership
                            </div>
                            <div className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                Mid-level Senior
                            </div>
                            <div className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                Manual Entry
                            </div>
                        </div>
                    </div>

                    {/* Candidate Sources */}
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-600 text-sm font-normal">Candidate Sources</h3>
                        <div className="flex flex-wrap gap-3 justify-end">
                            <div className="border border-soft-200 h-6 py-1 px-2 rounded-md text-sub-600 font-medium text-xs">
                                Manual Entry
                            </div>
                        </div>
                    </div>

                    {/* File */}
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-gray-600 text-sm font-normal">File</h3>
                        <span className="text-sub-600 text-sm font-medium">Name.wav</span>
                    </div>
                </div>
            </div>


            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 3 PRIVACY
                </span>
                <div className="p-4 flex flex-col gap-3">
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-sub-600 font-medium text-sm">Private</p>
                        <span className="text-sub-600 font-normal text-xs">Any worker can apply for the job.</span>
                    </div>
                    <div className="flex flex-col items-start gap-2.5">
                        <p className="text-sub-600 font-medium text-sm">Public</p>
                        <span className="text-sub-600 font-normal text-xs">Any worker can apply for the job.</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-0">
                <span className="bg-weak-50 py-1.5 px-3 h-7 w-full text-soft-400 text-xs font-medium flex items-center">
                    STEP 4 ORDER AMOUNT & DATE
                </span>
                <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">Deadline</p>
                        <span className="text-strong-950 text-sm font-medium">18 Feb, 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">Order Amount</p>
                        <span className="text-strong-950 text-sm font-medium">$ 200</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">Discount <span className="text-soft-400 text-xs">codeabcde</span></p>
                        <span className="text-strong-950 text-sm font-medium">-$ 200</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-normal text-sm text-sub-600">Amount paid</p>
                        <span className="text-strong-950 text-sm font-medium">$ 180</span>
                    </div>
                </div>
            </div>


        </div>
    </CardLayout>
}

export default Preview;