import EditAbout from "@/components/custom/modals/edit-about";
import { Icons } from "@/components/icons";

const About = ({ edit = true, aboutText }: { edit?: boolean, aboutText?: string }) => {
    return (
        <div className="p-4 flex flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
                <span className="text-main-900 font-medium text-xs">About</span>
                {edit && (
                    <EditAbout>
                        <Icons.pencil className="size-5 cursor-pointer" />
                    </EditAbout>
                )}
            </div>
            <p className="text-sub-600 font-normal text-xs leading-[16px]">
                {aboutText}
            </p>
            <div className="flex items-center gap-5">
                <Icons.twitch className="size-6" />
                <Icons.x className="size-6" />
                <Icons.google className="size-6" />
            </div>
        </div>
    )
}

export default About;