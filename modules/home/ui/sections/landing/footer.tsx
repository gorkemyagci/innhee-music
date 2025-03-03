import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-[#0F0F0F] flex flex-col items-center gap-6">
            <div className="w-full max-w-7xl xl:px-5 flex items-start justify-between mx-auto pt-10">
                <div className="flex flex-col items-start gap-3">
                    <Icons.dark_logo />
                    <span className="text-white text-lg font-light max-w-lg">Start by downloading the Finpro mobile app from the App Store or Google Play.</span>
                </div>
                <div className="flex items-start gap-8">
                    <div className="flex flex-col items-start gap-6">
                        <span className="text-white font-medium text-lg tracking-tight">Company</span>
                        <ul className="flex flex-col items-start gap-4">
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    About Us
                                </Link>
                            </li>
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Contact
                                </Link>
                            </li>
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-6">
                        <span className="text-white font-medium text-lg tracking-tight">For Workers</span>
                        <ul className="flex flex-col items-start gap-4">
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Find Work
                                </Link>
                            </li>
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Get Paid
                                </Link>
                            </li>
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Skill Development
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-6">
                        <span className="text-white font-medium text-lg tracking-tight">For Workers</span>
                        <ul className="flex flex-col items-start gap-4">
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Find Work
                                </Link>
                            </li>
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Get Paid
                                </Link>
                            </li>
                            <li className="text-white font-medium text-sm">
                                <Link href="#">
                                    Skill Development
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start gap-6">
                        <span className="text-white font-medium text-lg tracking-tight">Social Media</span>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.instagram />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.dribble />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.twitter />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Icons.youtube />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="text-white" />
            <div className="pb-10 pt-4 w-full flex items-center justify-center">
                <span className="text-[#D9DBE1] text-sm font-normal">© 2024 WanderNurse Staffing Solutions. All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;