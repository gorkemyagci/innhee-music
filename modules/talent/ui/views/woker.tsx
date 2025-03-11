import { Separator } from "@/components/ui/separator";
import WokerItem from "../components/woker-item";

const Woker = () => {
    return (
        <div className="w-full flex flex-col items-start gap-2">
            {new Array(6).fill(0).map((_, index) => (
                <>
                    <WokerItem key={index} index={index} />
                    <Separator className="bg-soft-200 w-full" />
                </>
            ))}
        </div>
    )
}

export default Woker;