"use client";

import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import ChatSidebar from "@/modules/chat/ui/components/chat-sidebar";
import ChatMain from "@/modules/chat/ui/components/chat-main";
import ContractDetails from "@/modules/chat/ui/components/contract-details";
import { Message, User } from "@/modules/chat/types";
import { trpc } from "@/trpc/client";
import { ChatRoom } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

const ChatView = () => {
  const [chatId, setChatId] = useQueryState("chatId");
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chatRooms } = trpc.chat.chatRooms.useQuery();
  const { data: messagesData, isPending } = trpc.chat.getRoomMessages.useQuery(
    { roomId: chatId || "" },
    { enabled: !!chatId }
  );
  const { data: contractsData } = trpc.chat.getRoomContracts.useQuery(
    { roomId: chatId || "" },
    { enabled: !!chatId }
  );
  const { user: currentAuthUser, initializeFromToken } = useAuthStore();
  const selectedChat = chatRooms?.find((room: ChatRoom) => room.id === chatId);
  const totalContractAmount = selectedChat?.contracts?.reduce((acc: number, contract: any) => {
    return acc + Number(contract.amount);
  }, 0);

  useEffect(() => {
    initializeFromToken();
  }, [initializeFromToken]);

  useEffect(() => {
    if (!chatId && chatRooms && chatRooms.length > 0) {
      setChatId(chatRooms[0].id);
    }
  }, [chatId, chatRooms, setChatId]);

  useEffect(() => {
    if (messagesData && selectedChat) {
      const formattedMessages = (Array.isArray(messagesData) ? messagesData : []).map((msg: {
        id: string;
        content: string;
        createdAt: string;
        senderId: string;
        attachments: any[];
      }) => ({
        id: msg.id,
        content: msg.content,
        timestamp: new Date(msg.createdAt),
        senderId: msg.senderId,
        receiverId: msg.senderId === currentAuthUser?.id
          ? selectedChat.users.find((u: { userId: string }) => u.userId !== currentAuthUser?.id)?.userId
          : currentAuthUser?.id,
        type: "text" as const,
        attachments: msg.attachments || []
      }));

      const contractMessages = (contractsData || []).map((contract: any) => ({
        id: `contract-${contract.id}`,
        content: "",
        timestamp: new Date(contract.createdAt),
        senderId: contract.senderId,
        receiverId: contract.receiverId,
        type: "offer" as const,
        offer: {
          id: contract.id,
          title: `Contract Offer`,
          description: contract.description,
          amount: contract.amount,
          currency: contract.amountCurrency,
          deliveryDays: Math.ceil((new Date(contract.deadline).getTime() - new Date(contract.startDate).getTime()) / (1000 * 60 * 60 * 24)),
          status: contract.status
        }
      }));

      const allMessages = [...formattedMessages, ...contractMessages].sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
      );

      setMessages(allMessages);
    } else {
      setMessages([]);
    }
  }, [messagesData, contractsData, selectedChat, currentAuthUser]);

  const getOtherUser = (room: ChatRoom): User => {
    const otherUser = room.users.find(u => u.userId !== currentAuthUser?.id)?.user;
    if (!otherUser) {
      return {
        id: "default",
        name: "Unknown User",
        avatar: "/assets/images/avatar-4.png",
        online: false
      };
    }

    return {
      id: otherUser.id,
      name: otherUser.nickname,
      avatar: otherUser.avatar || "/assets/images/avatar-4.png",
      online: room.users.find(u => u.userId !== currentAuthUser?.id)?.isOnline || false
    };
  };

  const getCurrentUser = (room: ChatRoom): User => {
    const user = room.users.find(u => u.userId === currentAuthUser?.id)?.user;
    if (!user) {
      return {
        id: currentAuthUser?.id || "default",
        name: currentAuthUser?.nickname || "Current User",
        avatar: currentAuthUser?.avatar || "/assets/images/avatar-4.png",
        online: true
      };
    }

    return {
      id: user.id,
      name: user.nickname,
      avatar: user.avatar || "/assets/images/avatar-4.png",
      online: true
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
            setMessages={setMessages}
            selectedUser={getOtherUser(selectedChat)}
            currentUser={getCurrentUser(selectedChat)}
            onBack={() => setChatId(null)}
            isLoading={isPending}
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
            setMessages={setMessages}
            selectedUser={getOtherUser(selectedChat)}
            currentUser={getCurrentUser(selectedChat)}
            isLoading={isPending}
          />
        )}
        {selectedChat && <ContractDetails
          people={selectedChat?.users || []}
          selectedUser={selectedChat?.users.find((u: { userId: string }) => u.userId !== currentAuthUser?.id)?.user}
          contracts={contractsData || []} />}
      </div>
    </div>
  );
};

export default ChatView; 