const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative">
            <div className={`max-w-[1376px] mx-auto lg:px-8 px-4 pt-4 py-5`}>
                {children}
            </div>
        </div>
    );
}

export default Layout;