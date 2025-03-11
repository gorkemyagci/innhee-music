import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FAQ from "../components/FAQ";

const Detail = () => {
    return <div className="w-full rounded-[20px] p-6 border border-[#E2E4E9] shadow-sm flex flex-col gap-6">
        <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-4">
                <p className="text-strong-950 font-medium text-2xl">Write professional resume, cover letter</p>
                <Badge className="flex h-7 items-center gap-0.5 py-1 md:py-1.5 px-2 md:px-3 rounded-full bg-neutral-100 border border-neutral-200 text-sub-600 font-medium text-[10px] md:text-[11px] whitespace-nowrap">
                    <Icons.group_line_users className="size-3 md:size-3.5" /> Business contract
                </Badge>
            </div>
            <Icons.save />
        </div>
        <Separator className="bg-soft-200" />
        <div className="flex flex-col items-start gap-3">
            <span className="text-[#161922] font-semibold text-base">Project Details</span>
            <p className="text-[#525866] font-medium text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus augue sagittis erat consectetur est. Blandit blandit nec mauris pulvinar. Lectus duis amet tortor, sit tincidunt. Rhoncus tincidunt imperdiet penatibus vitae risus, vitae. Blandit auctor justo nisl massa.
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus dictum ultrices lacus sodales nunc felis eu, consectetur arcu. Vitae nulla scelerisque id pellentesque feugiat vel eu.
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus dictum ultrices lacus sodales nunc felis eu, consectetur arcu. Vitae nulla scelerisque id pellentesque feugiat vel eu.
            </p>
            <ul className="list-disc list-inside text-[#525866] font-medium text-sm">
                <li>Neque sodales ut etiam sit amet nisl purus. Non tellus orci ac auctor.</li>
                <li>Neque sodales ut etiam sit amet nisl purus. Non tellus orci ac auctor.</li>
                <li>Neque sodales ut etiam sit amet nisl purus. Non tellus orci ac auctor.</li>
            </ul>
        </div>
        <Separator className="bg-soft-200" />
        <div className="w-full flex flex-col items-start gap-3">
            <span className="text-[#161922] font-semibold text-base tracking-[-1.5%]">Skills</span>
            <div className="flex items-center gap-2">
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Mixing
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Singing
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Jazz
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Hip pop
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    K pop
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Western Music
                </div>
            </div>
        </div>
        <Separator className="bg-soft-200" />
        <div className="w-full flex flex-col items-start gap-3">
            <span className="text-[#161922] font-semibold text-base tracking-[-1.5%]">Attachments</span>
            <div className="border border-soft-200 w-[248px] bg-[#FDFDFD] rounded-[12px] p-[14px] h-14 flex items-center justify-between gap-3">
                <span className="text-sub-600 font-medium text-sm">Audio Script.mp3</span>
                <Icons.play_pause className="size-7" />
            </div>
        </div>
        <Separator className="bg-soft-200" />
        <FAQ />
    </div>
}

export default Detail;