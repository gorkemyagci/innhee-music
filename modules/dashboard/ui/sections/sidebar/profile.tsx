import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";
import { UserType } from "@/lib/types/index";

interface ProfileProps {
    user: UserType
}

const Profile = ({ user }: ProfileProps) => {
    return (
        <div className="p-4 flex flex-col items-center gap-2">
            <UserAvatar
                imageUrl={user?.profilePicture?.url || ""}
                name={user?.nickname || ""}
                className="w-12 h-12"
            />
            <div className="flex flex-col items-center gap-1">
                <p className="text-sub-600 font-medium text-xs max-w-[120px] truncate text-center">{user?.nickname || "Anonymous"}</p>
                <div className="flex items-center gap-0.5">
                    <Icons.star />
                    <span className="text-sub-600 font-normal text-xs">4.9(125)</span>
                </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1">
                    <Icons.google className="size-3.5 md:size-4" />
                    <span className="text-sub-600 text-xs font-medium">Google</span>
                </div>
                <div className="flex items-center gap-1">
                    <Icons.google className="size-3.5 md:size-4" />
                    <span className="text-sub-600 text-xs font-medium">Google</span>
                </div>
            </div>
        </div>
    )
}

export default Profile;