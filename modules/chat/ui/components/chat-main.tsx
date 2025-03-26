"use client";

import { useState, useRef, useEffect } from "react";
import { Message, Offer, User } from "@/modules/chat/types";
import { ChevronLeft, Loader2 } from "lucide-react";
import MessageItem from "@/modules/chat/ui/components/message-item";
import OfferModal from "@/modules/chat/ui/sections/offer-modal";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContractDetails from "@/modules/chat/ui/components/contract-details";
import { contractDetailsData } from "@/lib/chatMockData";
import { useTranslations } from "next-intl";
import { parseCookies } from "nookies";
import { io, Socket } from "socket.io-client";
import { ExtendedChatMainProps, UploadingFile, UploadedAttachment } from "@/lib/types";
import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import IsTyping from "./is-typing";
import AttachmentItem from "./attachment-item";
import { toast } from "sonner";

const SOCKET_URL = "wss://inhee-chat-production.up.railway.app/chat";

const ChatMain = ({
    messages,
    setMessages,
    selectedUser,
    currentUser,
    onBack,
    isLoading = false,
}: ExtendedChatMainProps) => {
    const t = useTranslations("chat.main");
    const [messageText, setMessageText] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isContractDetailsOpen, setIsContractDetailsOpen] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<Record<string, UploadingFile>>({});
    const socketRef = useRef<Socket | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const cookies = parseCookies();
    const [chatRoomId, setChatRoomId] = useQueryState("chatId");
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const utils = trpc.useUtils();
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(SOCKET_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${cookies.token}`
                },
                auth: {
                    Authorization: `Bearer ${cookies.token}`
                },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000
            });

            socketRef.current.on("connect", () => { });
            socketRef.current.on("connect_error", (error) => { });
            socketRef.current.on("disconnect", (reason) => { });
            socketRef.current.on("error", (error) => { });
            socketRef.current.on("message_sent", (data) => { });
            socketRef.current.on("message", (message: Message) => {
                setMessages((prev: Message[]) => [...prev, message]);
            });

            socketRef.current.on("userTyping", (data) => {
                if (data.userId !== currentUser?.id) {
                    setIsTyping(data.isTyping);
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [cookies.token, chatRoomId, currentUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isTyping) {
            scrollToBottom();
        }
    }, [isTyping]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [messageText]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getFilePreview = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                resolve('/file-icon.png');
            }
        });
    };

    const simulateFileUpload = async (file: File) => {
        const fileId = Math.random().toString(36).substring(7);
        const preview = await getFilePreview(file);

        setUploadingFiles(prev => ({
            ...prev,
            [fileId]: {
                progress: 0,
                name: file.name,
                size: file.size
            }
        }));

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadingFiles(prev => ({
                ...prev,
                [fileId]: {
                    ...prev[fileId],
                    progress: progress
                }
            }));

            if (progress >= 100) {
                clearInterval(interval);
                setUploadingFiles(prev => {
                    const newState = { ...prev };
                    delete newState[fileId];
                    return newState;
                });
                setAttachments(prev => [...prev, Object.assign(file, { preview })]);
            }
        }, 200);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            newFiles.forEach(file => {
                simulateFileUpload(file);
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleOfferSubmit = (offer: Offer) => {
        setIsOfferModalOpen(false);
    };

    const handleSendMessage = async () => {
        if (!messageText.trim() && attachments.length === 0) return;
        if (!selectedUser) return;

        if (attachments.length > 0 && !messageText.trim()) {
            toast.error("Please add a message with your attachments");
            return;
        }

        setIsSending(true);
        try {
            let uploadedAttachments: UploadedAttachment[] = [];

            if (attachments.length > 0) {
                const formData = new FormData();
                attachments.forEach((file) => {
                    formData.append('attachments', file);
                });

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/attachments`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${cookies.token}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to upload attachments');
                }

                const result = await response.json();

                if (!result || !Array.isArray(result)) {
                    throw new Error('Invalid response from server');
                }
                uploadedAttachments = result;
                if (uploadedAttachments.length === 0) {
                    throw new Error('No attachments were uploaded successfully');
                }

                const invalidAttachments = uploadedAttachments.filter(att => !att.id || !att.path);
                if (invalidAttachments.length > 0) {
                    throw new Error('Some attachments were uploaded but are invalid');
                }
            }

            if (!socketRef.current?.connected) {
                toast.error("Connection lost. Please try again.");
                return;
            }

            const messageData = {
                chatRoomId: chatRoomId,
                content: messageText,
                type: "text",
                attachmentIds: uploadedAttachments.map((att: UploadedAttachment) => att.id)
            };

            const optimisticMessage: Message = {
                id: `msg-${Date.now()}`,
                senderId: currentUser.id,
                receiverId: selectedUser.id,
                content: messageText,
                timestamp: new Date(),
                type: "text",
                attachments: uploadedAttachments.map((att: UploadedAttachment) => ({
                    id: att.id,
                    name: att.filename,
                    filename: att.filename,
                    path: att.path,
                    url: att.path,
                    size: att.size ? Math.round(att.size / 1024) : 0
                }))
            };

            setMessages((prev: Message[]) => [...prev, optimisticMessage]);
            setMessageText("");
            setAttachments([]);
            return new Promise((resolve, reject) => {
                if (!socketRef.current?.connected) {
                    reject(new Error("Socket connection lost"));
                    return;
                }

                socketRef.current.emit("sendMessage", messageData, (response: any) => {
                    if (!response?.success) {
                        setMessages((prev: Message[]) => prev.filter(msg => msg.id !== optimisticMessage.id));
                        toast.error("Failed to send message. Please try again.");
                        reject(new Error("Message sending failed"));
                    } else {
                        resolve(response);
                    }
                });
            });

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
            throw error;
        } finally {
            setIsSending(false);
        }
    };

    const handleTyping = () => {
        if (!socketRef.current?.connected || !chatRoomId || !currentUser) {
            return;
        }

        socketRef.current.emit("typing", {
            chatRoomId,
            isTyping: true
        });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            socketRef.current?.emit("typing", {
                chatRoomId,
                isTyping: false
            });
        }, 1000);
    };

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center bg-soft-50">
                <p className="text-sub-600">{t("selectChat")}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="h-16 py-2 px-3 sm:px-[14px] border-b border-soft-200 flex items-center justify-between">
                <div className="flex items-center">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mr-2 p-1 rounded-full md:hidden"
                        >
                            <ChevronLeft className="w-5 h-5 text-sub-600" />
                        </button>
                    )}
                    <div className="relative">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 p-0.5 flex items-center justify-center rounded-full overflow-hidden">
                            <Image
                                src={selectedUser.avatar || "/assets/images/avatar-4.png"}
                                alt={selectedUser.name || "Unknown"}
                                className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
                                width={44}
                                height={44}
                            />
                        </div>
                        {selectedUser.online && (
                            <div className="absolute bottom-0 right-0 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div className="ml-2 sm:ml-3">
                        <h3 className="font-medium text-sub-600 text-[11px] sm:text-xs">{selectedUser.name || "Unknown"}</h3>
                        <p className="text-[11px] sm:text-xs text-sub-600 font-normal">
                            {selectedUser.online ? t("status.online") : t("status.offline")}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-row-reverse">
                    <button
                        onClick={() => setIsOfferModalOpen(true)}
                        className="p-1 sm:p-2"
                    >
                        <Icons.hamburger_menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <span
                        onClick={() => setIsContractDetailsOpen(true)}
                        className="text-strong-950 font-medium text-sm md:hidden">
                        {t("contractDetails")}
                    </span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scroll p-2 sm:p-4 space-y-3 sm:space-y-4 bg-soft-50">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center gap-2">
                            <Icons.loader className="animate-spin w-8 h-8 text-sub-600" />
                            <span className="text-sub-600 text-sm">Loading messages...</span>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
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
                        {isTyping && (
                            <IsTyping selectedUserNickname={messages[messages.length - 1].senderId === currentUser.id ? selectedUser.nickname || "Unknown" : currentUser.nickname || "Unknown"} />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <div className="p-2 sm:p-4">
                <div className="max-w-3xl mx-auto">
                    <div className="border border-soft-200 rounded-xl sm:rounded-2xl p-3 sm:p-2 pt-2 bg-white">
                        <AnimatePresence>
                            {(uploadingFiles && Object.keys(uploadingFiles).length > 0) || attachments.length > 0 ? (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                    animate={{ height: "auto", opacity: 1, marginBottom: 8 }}
                                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex mb-2 flex-wrap gap-2 sm:gap-4">
                                        {Object.entries(uploadingFiles).map(([id, file]) => (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                key={id}
                                                className="bg-white relative border border-soft-200 p-2 sm:p-3 flex flex-col items-center gap-1 sm:gap-2 rounded-[12px] shadow-sm w-[100px] sm:w-[124px] h-[90px] sm:h-[114px]"
                                            >
                                                <Icons.close className="absolute top-1 sm:top-2 right-1 sm:right-2 size-4 sm:size-[18px] text-sub-600" />
                                                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                                                    <Icons.loader className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
                                                    <span className="text-strong-950 font-normal text-[10px] sm:text-xs">{t("attachments.uploading")}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5 sm:gap-1 pb-0.5 w-full">
                                                    <span className="text-strong-950 font-medium text-xs sm:text-sm w-full truncate px-1">{file.name}</span>
                                                    <span className="text-sub-600 font-normal text-[10px] sm:text-xs">{t("attachments.fileSize", { size: (file.size / 1024).toFixed(2) })}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                        {attachments.length > 0 && attachments?.map((file: File & { preview?: string }, index) => (
                                            <AttachmentItem key={index} file={file} index={index} removeAttachment={removeAttachment} />
                                        ))}
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>

                        <div className="flex items-end gap-2">
                            <div className="flex-1 overflow-hidden rounded-xl">
                                <textarea
                                    ref={textareaRef}
                                    value={messageText}
                                    onChange={(e) => {
                                        setMessageText(e.target.value);
                                        handleTyping();
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    placeholder={t("input.placeholder")}
                                    className="w-full px-3 pt-2.5 resize-none focus:outline-none text-xs sm:text-sm max-h-[120px] sm:max-h-[150px] overflow-y-auto custom-scroll min-h-[40px]"
                                    rows={1}
                                />
                                <div className="flex items-center justify-between px-2 py-1.5">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="text-sub-600 hover:text-main-900 cursor-pointer p-1"
                                        >
                                            <Icons.emotion_happy_line className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            onClick={(e) => {
                                                (e.target as HTMLInputElement).value = '';
                                            }}
                                            className="hidden"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.mp3,.mp4"
                                        />
                                        <button
                                            onClick={handleAttachmentClick}
                                            className="text-sub-600 hover:text-main-900 cursor-pointer p-1"
                                        >
                                            <Icons.attachment_line className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                    <Button
                                        onClick={handleSendMessage}
                                        type="submit"
                                        disabled={isSending}
                                        className="h-7 sm:h-8 w-[60px] sm:w-[70px] disabled:cursor-auto group rounded-lg text-white text-xs sm:text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                                        <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                                        <div className="flex items-center justify-center gap-1">
                                            {isSending ? (
                                                <>
                                                    <Loader2 className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                                                </>
                                            ) : (
                                                <>
                                                    {t("input.send")} <Icons.send className="stroke-white w-3 h-3 sm:w-4 sm:h-4" />
                                                </>
                                            )}
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OfferModal
                isOpen={isOfferModalOpen}
                onClose={() => setIsOfferModalOpen(false)}
                onSubmit={handleOfferSubmit}
                socket={socketRef.current}
                chatRoomId={chatRoomId || ""}
                receiverId={selectedUser?.id || ""}
                currentUserId={currentUser?.id || ""}
            />

            <Dialog open={isContractDetailsOpen} onOpenChange={setIsContractDetailsOpen}>
                <DialogContent className="sm:max-w-[425px] p-0">
                    <ContractDetails selectedUser={selectedUser} {...contractDetailsData} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChatMain; 