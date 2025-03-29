"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { trpc } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatRoom } from "@/lib/types";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

interface ChatSidebarProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

const ChatSidebar = ({ selectedChat, onSelectChat }: ChatSidebarProps) => {
  const t = useTranslations("chat");
  const { data: chatRooms, isPending } = trpc.chat.chatRooms.useQuery();
  const cookies = parseCookies();
  const currentUserId = cookies.token ? (jwtDecode(cookies.token) as JwtPayload).id : null;

  const getOtherUser = (room: ChatRoom) => {
    const otherUserData = room.users.find(userData => userData.user.id !== currentUserId);
    return otherUserData?.user;
  };

  const getLastMessageTime = (room: ChatRoom) => {
    if (!room.messages || room.messages.length === 0) {
      return format(new Date(room.updatedAt), "MMM d");
    }
    return format(new Date(room.messages[room.messages.length - 1].createdAt), "MMM d");
  };

  return (
    <div className="w-full md:w-[200px] shrink-0 p-4 border-r border-soft-200 flex flex-col gap-4 h-full overflow-hidden">
      <div>
        <h1 className="text-2xl font-medium text-strong-950">{t("title")}</h1>
      </div>
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scroll">
        {isPending ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2 p-2">
              <Skeleton className="w-11 h-11 rounded-full" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))
        ) : chatRooms && chatRooms.length > 0 ? (
          chatRooms.map((room: ChatRoom) => {
            const otherUser = getOtherUser(room);
            if (!otherUser) return null;
            return (
              <div
                key={room.id}
                className={cn(
                  "flex items-center gap-2 p-2 cursor-pointer rounded-[10px] hover:bg-weak-50 transition-colors",
                  selectedChat === room.id && "bg-weak-50"
                )}
                onClick={() => onSelectChat(room.id)}
              >
                <div className="relative">
                  <div className="w-11 h-11 p-0.5 flex items-center justify-center rounded-full bg-gray-100">
                    <Image
                      src={otherUser.avatar || "/assets/images/avatar-4.png"}
                      alt={otherUser.nickname || "Unknown"}
                      className="w-full h-full object-contain rounded-full"
                      width={44}
                      height={44}
                    />
                  </div>
                  {room.users.find((u: { userId: string; isOnline: boolean }) => u.userId === otherUser.id)?.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-sub-600 text-xs">{otherUser.nickname || "Unknown"}</h3>
                  <p className="text-sub-600 text-xs font-normal truncate mt-1">
                    {getLastMessageTime(room)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sub-600 text-sm">{t("noUsers")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar; 