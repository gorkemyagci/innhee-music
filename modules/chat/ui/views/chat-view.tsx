"use client";

import { useEffect, useState, useRef } from "react";
import { useQueryState } from "nuqs";
import ChatSidebar from "@/modules/chat/ui/components/chat-sidebar";
import ChatMain from "@/modules/chat/ui/components/chat-main";
import ContractDetails from "@/modules/chat/ui/components/contract-details";
import { Message, Offer, User } from "@/modules/chat/types";
import { trpc } from "@/trpc/client";
import { ChatRoom } from "@/lib/types";
import { io, Socket } from "socket.io-client";
import { parseCookies } from "nookies";

const SOCKET_URL = "https://inhee-chat-production.up.railway.app";

const ChatView = () => {
  const [chatId, setChatId] = useQueryState("chatId");
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chatRooms } = trpc.chat.chatRooms.useQuery();
  const selectedChat = chatRooms?.find((room: ChatRoom) => room.id === chatId);
  useEffect(() => {
    if (!chatId && chatRooms && chatRooms.length > 0) {
      setChatId(chatRooms[0].id);
    }
  }, [chatId, chatRooms, setChatId]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  const getOtherUser = (room: ChatRoom): User => {
    const user = room.users[0]?.user;
    if (!user) {
      return {
        id: "default",
        name: "Unknown User",
        avatar: "/assets/images/avatar-4.png",
        online: false
      };
    }
    
    return {
      id: user.id,
      name: user.nickname,
      avatar: user.avatar || "/assets/images/avatar-4.png",
      online: room.users[0].isOnline
    };
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white lg:px-8">
      <div className="md:hidden w-full">
        {!selectedChat ? (
          <ChatSidebar 
            selectedChat={chatId} 
            onSelectChat={setChatId} 
          />
        ) : (
          <ChatMain 
            messages={messages} 
            selectedUser={getOtherUser(selectedChat)}
            currentUser={getOtherUser(selectedChat)}
            onBack={() => setChatId(null)}
          />
        )}
      </div>

      <div className="hidden md:flex w-full h-full">
        <ChatSidebar 
          selectedChat={chatId} 
          onSelectChat={setChatId} 
        />
        {selectedChat && (
          <ChatMain 
            messages={messages} 
            selectedUser={getOtherUser(selectedChat)}
            currentUser={getOtherUser(selectedChat)}
          />
        )}
        {selectedChat && <ContractDetails {...selectedChat.contracts[0]} />}
      </div>
    </div>
  );
};

export default ChatView; 