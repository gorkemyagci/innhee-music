"use client";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative w-full">
            <div className="max-w-[1376px] px-4 md:px-8 mx-auto py-5 flex flex-col md:flex-row items-start gap-0 md:gap-8">
                {children}
            </div>
        </div>
    );
}

export default Layout;