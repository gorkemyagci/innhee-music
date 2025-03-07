import Filter from "@/modules/find-jobs/ui/sections/filter";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main className="w-full max-w-[1440px] mx-auto p-4 flex items-start gap-6">
        <Filter />
        {children}
    </main>
}

export default Layout;