import ProfileSidebar from "@/modules/profile-detail/ui/sections/profile-sidebar";
import ProfileDetail from "@/modules/profile-detail/ui/views/profile-detail";

const Page = () => {
    return <div className="w-full p-4 flex items-start gap-6">
        <ProfileSidebar />
        <ProfileDetail />
    </div>
}

export default Page;