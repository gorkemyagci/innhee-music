"use client";

import { useEffect, useState } from "react";
import ChatSidebar from "@/modules/chat/ui/components/chat-sidebar";
import ChatMain from "@/modules/chat/ui/components/chat-main";
import ContractDetails from "@/modules/chat/ui/components/contract-details";
import { User, Message, Offer } from "@/modules/chat/types";
import { mockUsers, currentUserData, getMockMessages, contractDetailsData } from "@/lib/chatMockData";

const ChatView = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(currentUserData);

  // Simulate fetching users
  useEffect(() => {
    if (mockUsers && mockUsers.length > 0) {
      setUsers(mockUsers);
      setSelectedChat(mockUsers[0].id);
    }
  }, []);

  // Simulate fetching messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages(getMockMessages(selectedChat));
    }
  }, [selectedChat]);

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!content.trim() && (!attachments || attachments.length === 0)) return;
    
    const newMessage: Message = {
      id: `msg${messages.length + 1}`,
      senderId: "current-user",
      receiverId: selectedChat!,
      content,
      timestamp: new Date(),
      type: "text",
      attachments: attachments?.map((file, index) => ({
        id: `new-att-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024).toFixed(2)} KB`,
      })),
    };

    setMessages([...messages, newMessage]);
  };

  const handleSendOffer = (offer: Offer) => {
    const newMessage: Message = {
      id: `msg${messages.length + 1}`,
      senderId: "current-user",
      receiverId: selectedChat!,
      content: offer.title,
      timestamp: new Date(),
      type: "offer",
      offer,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white lg:px-8">
      <div className="md:hidden w-full">
        {!selectedChat ? (
          <ChatSidebar 
            users={users} 
            selectedChat={selectedChat} 
            onSelectChat={setSelectedChat} 
          />
        ) : (
          <ChatMain 
            messages={messages} 
            selectedUser={users.find(user => user.id === selectedChat)} 
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onSendOffer={handleSendOffer}
            onBack={() => setSelectedChat(null)}
          />
        )}
      </div>

      <div className="hidden md:flex w-full h-full">
        <ChatSidebar 
          users={users} 
          selectedChat={selectedChat} 
          onSelectChat={setSelectedChat} 
        />
        <ChatMain 
          messages={messages} 
          selectedUser={users.find(user => user.id === selectedChat)} 
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          onSendOffer={handleSendOffer}
        />
        <ContractDetails {...contractDetailsData} />
      </div>
    </div>
  );
};

export default ChatView; 