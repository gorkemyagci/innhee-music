import EditAbout from "@/components/custom/modals/edit-about";
import { Icons } from "@/components/icons";

const About = () => {
    return (
        <div className="p-4 flex flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
                <span className="text-main-900 font-medium text-xs">About</span>
                <EditAbout>
                    <Icons.pencil className="size-5 cursor-pointer" />
                </EditAbout>
            </div>
            <p className="text-sub-600 font-normal text-xs leading-[16px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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