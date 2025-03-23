import { Icons } from "@/components/icons";
import Link from "next/link";

const Milestone = () => {
    return (
        <div className="bg-weak-50 rounded-[12px] p-4 lg:w-[300px] flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
                <Icons.service_line />
                <span className="text-strong-950 font-medium text-xs">Milestone</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-sub-600 font-normal text-xs">For only $4.99 per month!</span>
                <Link href="#" prefetch className="font-medium text-sub-600 border-b border-sub-600 text-xs">
                    Learn More
                </Link>
            </div>
        </div>
    )
}

export default Milestone;