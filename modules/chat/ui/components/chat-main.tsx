"use client";

import { useState, useRef, useEffect } from "react";
import { Message, User, Offer } from "@/modules/chat/types";
import { format } from "date-fns";
import { Paperclip, Send, Smile, X } from "lucide-react";
import MessageItem from "@/modules/chat/ui/components/message-item";
import OfferModal from "@/modules/chat/ui/sections/offer-modal";
import Image from "next/image";
import { Icons } from "@/components/icons";

interface ChatMainProps {
    messages: Message[];
    selectedUser: User | undefined;
    currentUser: User;
    onSendMessage: (content: string, attachments?: File[]) => void;
    onSendOffer: (offer: Offer) => void;
}

const ChatMain = ({
    messages,
    selectedUser,
    currentUser,
    onSendMessage,
    onSendOffer,
}: ChatMainProps) => {
    const [messageText, setMessageText] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Auto-resize textarea based on content
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [messageText]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (messageText.trim() || attachments.length > 0) {
            onSendMessage(messageText, attachments);
            setMessageText("");
            setAttachments([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments((prev) => [...prev, ...newFiles]);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleOfferSubmit = (offer: Offer) => {
        onSendOffer(offer);
        setIsOfferModalOpen(false);
    };

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center bg-soft-50">
                <p className="text-sub-600">Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            {/* Chat header */}
            <div className="h-16 py-2 px-[14px] border-b border-soft-200 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="relative">
                        <div className="w-11 h-11 p-0.5 flex items-center justify-center rounded-full overflow-hidden">
                            <Image
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                                className="w-11 h-11 object-contain"
                                width={44}
                                height={44}
                            />
                        </div>
                        {selectedUser.online && (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div className="ml-3">
                        <h3 className="font-medium text-sub-600 text-xs">{selectedUser.name}</h3>
                        <p className="text-xs text-sub-600 font-normal">
                            {selectedUser.online ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsOfferModalOpen(true)}
                    >
                        <Icons.hamburger_menu />
                    </button>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-soft-50">
                {messages.map((message) => (
                    <MessageItem
                        key={message.id}
                        message={message}
                        isOwn={message.senderId === currentUser.id}
                        sender={
                            message.senderId === currentUser.id
                                ? currentUser
                                : selectedUser
                        }
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-soft-200 p-4 bg-white">
                {attachments.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                        {attachments.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-soft-100 rounded-md p-2 pr-3"
                            >
                                <div className="w-10 h-10 bg-soft-200 rounded-md flex items-center justify-center mr-2">
                                    <Paperclip size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-main-900 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-sub-600">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeAttachment(index)}
                                    className="ml-2 text-sub-600 hover:text-main-900"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex items-end gap-2">
                    <div className="flex-1 border border-soft-200 rounded-lg overflow-hidden">
                        <textarea
                            ref={textareaRef}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="w-full p-3 resize-none focus:outline-none text-sm max-h-[150px] overflow-y-auto"
                            rows={1}
                        />
                        <div className="flex items-center px-3 py-2 border-t border-soft-200">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="text-sub-600 hover:text-main-900 mr-3"
                            >
                                <Paperclip size={18} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                multiple
                            />
                            <button className="text-sub-600 hover:text-main-900">
                                <Smile size={18} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>

            {/* Offer Modal */}
            <OfferModal
                isOpen={isOfferModalOpen}
                onClose={() => setIsOfferModalOpen(false)}
                onSubmit={handleOfferSubmit}
            />
        </div>
    );
};

export default ChatMain; 