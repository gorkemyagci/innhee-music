import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";

const Invite = () => {
    return (
        <div className="flex flex-col items-start gap-1 w-full">
            <span className="text-soft-400 font-medium text-xs pl-1">LATEST CONTACT</span>
            {new Array(4).fill(0).map((_, i) => (
                <>
                    <div key={i} className="flex cursor-pointer hover:bg-weak-50 transition-all items-center p-2 rounded-[10px] h-14 w-full justify-between">
                        <div className="flex items-center gap-2">
                            <UserAvatar
                                imageUrl="/assets/images/avatar2.png"
                                name="John Doe"
                                className="w-12 h-12 object-contain shrink-0 p-0.5"
                            />
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-sub-600 font-medium text-sm">James Brown</p>
                                <div className="flex items-center gap-0.5">
                                    <Icons.star />
                                    <span className="text-sub-600 font-normal text-xs">4.9(125)</span>
                                </div>
                            </div>
                        </div>
                        <span className="h-5 w-[52px] rounded-full bg-[#F2F5F8] flex items-center justify-center text-[#717784] font-medium text-xs">1 hour</span>
                    </div>
                    {i !== 3 && <Separator className="bg-soft-200 w-full" />}
                </>
            ))}
            <Button variant="outline" className="flex mt-0.5 items-center gap-1 h-9 w-full rounded-lg bg-white border-soft-200 text-sub-600 font-medium text-sm">
                <Icons.plus className="size-3 fill-sub-600" />
                Invite
            </Button>
        </div>
    )
}

export default Invite;