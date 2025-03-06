import { Separator } from "@/components/ui/separator";
import Profile from "../sections/sidebar/profile";
import Menu from "../sections/sidebar/menu";
import Skills from "../sections/sidebar/skills";
import Tags from "../sections/sidebar/tags";
import About from "../sections/sidebar/about";

const Sidebar = () => {
    return (
        <div className="border border-soft-200 pb-6 flex-[2] maw-w-[300px] min-h-[calc(100vh-114px)] rounded-[20px]">
            <Profile />
            <Separator className="bg-soft-200" />
            <Menu />
            <Separator className="bg-soft-200" />
            <Skills />
            <Separator className="bg-soft-200" />
            <Tags />
            <Separator className="bg-soft-200" />
            <About />
        </div>
    )
}

export default Sidebar;