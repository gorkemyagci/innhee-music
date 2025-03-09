const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main className="w-full max-w-[1224px] mx-auto">
        {children}
    </main>
}

export default Layout;