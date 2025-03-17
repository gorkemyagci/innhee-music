import HomeNavbar from "@/modules/home/ui/components/home-navbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HomeNavbar />
      {children}
    </div>
  );
} 