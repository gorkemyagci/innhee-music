import Sidebar from "@/modules/find-works/ui/components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full max-w-[1440px] mx-auto p-4 flex items-start gap-4">
            <Sidebar />
            {children}
        </main>
    )
}

export default Layout;