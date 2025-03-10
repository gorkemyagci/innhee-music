import LayoutSidebar from "@/modules/settings-modal/ui/components/layout-sidebar";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-8 max-w-[1440px] mx-auto w-full flex items-start justify-start">
        <LayoutSidebar />
        <div className="flex-1 py-6">
            {children}
        </div>
    </div>
}

export default SettingsLayout;