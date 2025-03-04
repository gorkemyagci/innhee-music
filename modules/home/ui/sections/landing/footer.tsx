import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-[#0F0F0F] flex flex-col items-center gap-4 md:gap-6">
            <div className="w-full max-w-[1440px] px-4 md:px-6 xl:px-5 flex flex-col lg:flex-row items-start gap-8 lg:gap-0 lg:justify-between mx-auto pt-8 md:pt-10">
                <div className="flex flex-col items-start gap-3 w-full lg:max-w-lg">
                    <Icons.logo />
                    <span className="text-white text-base md:text-lg font-light">Start by downloading the Finpro mobile app from the App Store or Google Play.</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full lg:w-auto">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-white font-medium text-base md:text-lg tracking-tight">Company</span>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    About Us
                                </Link>
                            </li>
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Contact
                                </Link>
                            </li>
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-white font-medium text-base md:text-lg tracking-tight">For Workers</span>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Find Work
                                </Link>
                            </li>
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Get Paid
                                </Link>
                            </li>
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Skill Development
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-white font-medium text-base md:text-lg tracking-tight">For Workers</span>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Find Work
                                </Link>
                            </li>
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Get Paid
                                </Link>
                            </li>
                            <li className="text-white font-medium text-xs md:text-sm">
                                <Link href="#">
                                    Skill Development
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="text-white font-medium text-base md:text-lg tracking-tight">Social Media</span>
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.instagram className="size-4 md:size-[18px]" />
                            </div>
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.dribble className="size-4 md:size-[18px]" />
                            </div>
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.twitter className="size-4 md:size-[18px]" />
                            </div>
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.youtube className="size-4 md:size-[18px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="bg-white/20" />
            <div className="pb-8 md:pb-10 pt-3 md:pt-4 w-full flex items-center justify-center px-4 text-center">
                <span className="text-[#D9DBE1] text-xs md:text-sm font-normal">© 2024 WanderNurse Staffing Solutions. All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;