import Sidebar from "@/modules/buyer/ui/sections/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="max-w-[1376px] px-8 mx-auto py-5 flex items-start gap-8">
        <Sidebar />
        {children}
    </div>
}

export default Layout;