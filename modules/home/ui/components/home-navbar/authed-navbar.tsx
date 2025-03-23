import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "./profile-dropdown";
import Link from "next/link";
import { pageUrls } from "@/lib/constants/page-urls";
import Notifications from "./notifcations";

const AuthedNavbar = () => {
    return (
        <>
            <Link href={pageUrls.JOB_POSTING} prefetch>
                <Button
                    type="submit"
                    className="h-10 group flex items-center gap-2 rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all
                bg-gradient-to-b from-[#20232D]/90 to-[#20232D]
                border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]"
                >
                    <div className="absolute top-0 left-0 w-full h-0 group-hover:h-4 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] to-[#FFF]/0" />
                    <Icons.plus className="fill-white size-3" />
                    <span className="text-sm font-medium">Create</span>
                </Button></Link>
            <Notifications>
                <motion.span
                    className="cursor-pointer hidden sm:block"
                >
                    <Icons.notification />
                </motion.span>
            </Notifications>
            <ProfileDropdown>
                <Button variant="outline" className="bg-white border border-soft-200 hover:bg-gray-50 h-10 p-2.5 rounded-[10px] text-strong-950 font-medium text-sm">
                    My Account
                </Button>
            </ProfileDropdown>
        </>
    )
}

export default AuthedNavbar;