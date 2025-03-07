import { Icons } from "@/components/icons";

const Skills = () => {
    return (
        <div className="p-4 flex flex-col items-start gap-3">
            <div className="flex items-center w-full justify-between">
                <span className="text-main-900 font-medium text-xs">Skills</span>
                <Icons.pencil className="size-5 cursor-pointer" />
            </div>
            <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col items-start gap-1">
                    <p className="text-strong-950 font-medium text-xs">Singer - Female</p>
                    <span className="text-sub-600 font-normal text-xs">Average price - $350 per song</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <p className="text-strong-950 font-medium text-xs">Songwriter - Lyric</p>
                    <span className="text-sub-600 font-normal text-xs">Contact for pricing</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <p className="text-strong-950 font-medium text-xs">Top line writer (vocal melody)</p>
                    <span className="text-sub-600 font-normal text-xs">Contact for pricing</span>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <p className="text-strong-950 font-medium text-xs">Vocal Tuning</p>
                    <span className="text-sub-600 font-normal text-xs">Contact for pricing</span>
                </div>
            </div>
        </div>
    )
}

export default Skills;