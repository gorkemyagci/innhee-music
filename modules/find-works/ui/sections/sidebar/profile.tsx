import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";

const Profile = () => {
    return (
        <div className="p-4 flex flex-col items-center gap-2">
            <UserAvatar
                imageUrl="/assets/images/avatar2.png"
                name="John Doe"
                className="size-11"
            />
            <div className="flex flex-col">
                <p className="text-[#222530] font-medium text-base">Cleve Music</p>
                <div className="flex items-center gap-0.5">
                    <Icons.star />
                    <span className="text-sub-600 font-normal text-xs">4.9(125)</span>
                </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1">
                    <Icons.dollar_square className="size-3.5 md:size-4" />
                    <span className="text-sub-600 text-xs font-medium">Salary</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icons.map className="size-3.5 md:size-4" />
                    <span className="text-sub-600 text-xs font-medium">Work</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icons.star className="size-3.5 md:size-4 fill-blue-800" />
                    <span className="text-sub-600 text-xs font-medium">Specia</span>
                </div>
            </div>
        </div>
    )
}

export default Profile;