import ReportMessage from "@/components/custom/modals/report-message";
import { Icons } from "@/components/icons";

const Head = () => {
    return <div className="w-full h-10 flex items-center justify-between pr-2.5">
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-sub-600">Find Works</span>
            <Icons.chevron_short_right />
            <span className="text-sub-600 font-medium text-sm">Project Detail</span>
        </div>
        <ReportMessage>
            <span className="cursor-pointer">
                <Icons.flag_line />
            </span>
        </ReportMessage>
    </div>
}

export default Head;