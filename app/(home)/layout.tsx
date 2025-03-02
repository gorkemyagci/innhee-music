import HomeNavbar from "@/modules/home/ui/components/home-navbar"

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return <div>
        <HomeNavbar />
        {children}
    </div>
}

export default HomeLayout;