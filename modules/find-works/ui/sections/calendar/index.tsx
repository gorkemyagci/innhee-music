import { Separator } from "@/components/ui/separator";
import DatePicker from "./date-picker";
import Timeline from "./timeline";

const Calendar = () => {
    return (
        <div className="border border-soft-200 flex-[2] max-w-[352px] min-h-[calc(100vh-114px)] rounded-[20px]">
            <DatePicker />
            <Separator />
            <Timeline />
        </div>
    )
}

export default Calendar;