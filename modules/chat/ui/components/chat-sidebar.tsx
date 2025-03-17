"use client";

import { User } from "../../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatSidebarProps {
  users: User[];
  selectedChat: string | null;
  onSelectChat: (userId: string) => void;
}

const ChatSidebar = ({ users, selectedChat, onSelectChat }: ChatSidebarProps) => {
  return (
    <div className="w-full md:w-[200px] p-4 border-r border-soft-200 flex flex-col gap-4 h-full overflow-hidden">
      <div>
        <h1 className="text-2xl font-medium text-strong-950">Chat</h1>
      </div>
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scroll">
        {users.map((user) => (
          <div
            key={user.id}
            className={cn(
              "flex items-center gap-2 p-2 cursor-pointer rounded-[10px] hover:bg-weak-50 transition-colors",
              selectedChat === user.id && "bg-weak-50"
            )}
            onClick={() => onSelectChat(user.id)}
          >
            <div className="relative">
              <div className="w-11 h-11 p-0.5 flex items-center justify-center rounded-full">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-contain"
                  width={44}
                  height={44}
                />
              </div>
              {user.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-sub-600 text-xs">{user.name}</h3>
              <p className="text-sub-600 text-xs font-normal truncate mt-1">
                1 days ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar; 