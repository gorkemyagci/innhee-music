import HomeNavbar from "@/modules/home/ui/components/home-navbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <HomeNavbar />
      {children}
    </div>
  );
} 