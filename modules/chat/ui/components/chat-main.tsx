"use client";

import { useState, useRef, useEffect } from "react";
import { Message, Offer } from "@/modules/chat/types";
import { ChevronLeft, Loader2 } from "lucide-react";
import MessageItem from "@/modules/chat/ui/components/message-item";
import OfferModal from "@/modules/chat/ui/sections/offer-modal";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContractDetails from "@/modules/chat/ui/components/contract-details";
import { useTranslations } from "next-intl";
import { parseCookies } from "nookies";
import { io, Socket } from "socket.io-client";
import { ExtendedChatMainProps, UploadingFile, UploadedAttachment, ChatRoom } from "@/lib/types";
import { useQueryState } from "nuqs";
import { trpc } from "@/trpc/client";
import IsTyping from "./is-typing";
import AttachmentItem from "./attachment-item";
import { toast } from "sonner";
import EmojiPicker from 'emoji-picker-react';

const SOCKET_URL = "wss://inhee-chat-production.up.railway.app/chat";

type ExtendedMessage = Message & {
    status?: 'sending' | 'sent' | 'failed';
};

const ChatMain = ({
    messages,
    setMessages,
    selectedUser,
    currentUser,
    onBack,
    isLoading = false,
    contracts = []
}: ExtendedChatMainProps) => {
    const t = useTranslations("chat.main");
    const [messageText, setMessageText] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isContractDetailsOpen, setIsContractDetailsOpen] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<Record<string, UploadingFile>>({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messageQueue, setMessageQueue] = useState<any[]>([]);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const MESSAGE_RATE_LIMIT = 300;
    const maxReconnectAttempts = 5;
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<Socket | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const cookies = parseCookies();
    const [chatRoomId, setChatRoomId] = useQueryState("chatId");
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const utils = trpc.useUtils();
    const [isSending, setIsSending] = useState(false);
    const [lastScrolledMessageId, setLastScrolledMessageId] = useState<string | null>(null);

    const { data: contractsData } = trpc.chat.getRoomContracts.useQuery(
        { roomId: chatRoomId || "" },
        { enabled: !!chatRoomId }
    );
    

    const initializeSocket = () => {
        if (socketRef.current?.connected) {
            return;
        }

        socketRef.current = io(SOCKET_URL, {
            extraHeaders: {
                Authorization: `Bearer ${cookies.token}`
            },
            auth: {
                Authorization: `Bearer ${cookies.token}`
            },
            reconnection: true,
            reconnectionAttempts: maxReconnectAttempts,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
            forceNew: true
        });

        const socket = socketRef.current;

        const handleConnect = () => {
            setIsConnected(true);
            setReconnectAttempts(0);
            processMessageQueue();
            startHeartbeat();
        };

        const handleConnectError = (error: any) => {
            setIsConnected(false);
            handleReconnect();
        };

        const handleDisconnect = (reason: string) => {
            setIsConnected(false);
            stopHeartbeat();
            if (reason === 'io server disconnect') {
                handleReconnect();
            }
        };

        const handleError = (error: any) => {
            setIsConnected(false);
            handleReconnect();
        };

        const handleMessageSent = (data: any) => {
            if (data?.success) {
                setMessageQueue(prev => prev.filter(msg => msg.id !== data.messageId));
            }
        };

        const handleUserTyping = (data: any) => {
            if (data.userId !== currentUser?.id) {
                setIsTyping(data.isTyping);
            }
        };

        const handleContractUpdated = (data: any) => {
            const systemMessage = {
                id: `msg-${Date.now()}`,
                content: `Your contract has been ${data.status.toLowerCase()} by ${data.sender.nickname}`,
                type: "system",
                senderId: data.senderId,
                receiverId: data.receiverId,
                timestamp: new Date(),
                chatRoomId: data.chatRoomId
            } as Message;
            setMessages(prev => [...prev, systemMessage]);
        };

        const handleNewMessage = (message: Message) => {
            setMessages((prev: Message[]) => {
                if (prev.some(m => m.id === message.id)) {
                    return prev;
                }
                const newMessage = {
                    ...message,
                    timestamp: new Date(message.createdAt || new Date()),
                    attachments: message.attachments || [],
                    fileCount: message.attachments?.length || 0
                };

                return [...prev, newMessage];
            });
        };

        socket.on("connect", handleConnect);
        socket.on("connect_error", handleConnectError);
        socket.on("disconnect", handleDisconnect);
        socket.on("error", handleError);
        socket.on("message_sent", handleMessageSent);
        socket.on("userTyping", handleUserTyping);
        socket.on("contractUpdated", handleContractUpdated);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("connect_error", handleConnectError);
            socket.off("disconnect", handleDisconnect);
            socket.off("error", handleError);
            socket.off("message_sent", handleMessageSent);
            socket.off("userTyping", handleUserTyping);
            socket.off("contractUpdated", handleContractUpdated);
            socket.off("newMessage", handleNewMessage);
            stopHeartbeat();
            if (socket.connected) {
                socket.disconnect();
            }
            socketRef.current = null;
        };
    };

    const handleReconnect = () => {
        if (reconnectAttempts >= maxReconnectAttempts) {
            return;
        }

        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        setReconnectAttempts(prev => prev + 1);

        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
        }

        reconnectTimeoutRef.current = setTimeout(() => {
            initializeSocket();
        }, delay);
    };

    const startHeartbeat = () => {
        if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
        }

        heartbeatIntervalRef.current = setInterval(() => {
            if (socketRef.current?.connected) {
                socketRef.current.emit('ping');
            }
        }, 30000);
    };

    const stopHeartbeat = () => {
        if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = null;
        }
    };

    const processMessageQueue = () => {
        if (!socketRef.current?.connected || messageQueue.length === 0) {
            return;
        }

        const [message, ...rest] = messageQueue;
        socketRef.current.emit("sendMessage", message.data, (response: any) => {
            if (response?.success) {
                setMessageQueue(rest);
                setMessages((prev: Message[]) => 
                    prev.map(msg => 
                        msg.id === message.id 
                            ? { ...msg, status: "sent" } 
                            : msg
                    )
                );
            }
        });
    };

    useEffect(() => {
        if (socketRef.current?.connected && messageQueue.length > 0) {
            const interval = setInterval(() => {
                processMessageQueue();
            }, 300);

            return () => clearInterval(interval);
        }
    }, [socketRef.current?.connected, messageQueue]);

    useEffect(() => {
        const cleanup = initializeSocket();
        return () => {
            if (cleanup) cleanup();
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [cookies.token, chatRoomId, currentUser]);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            const isInQueue = messageQueue.some(m => m.id === lastMessage.id);
            const wasScrolledBefore = lastScrolledMessageId === lastMessage.id;
            if (lastMessage.hasOwnProperty('status') && (lastMessage as any).status === "sent" && !isInQueue && !wasScrolledBefore) {
                scrollToBottom();
                setLastScrolledMessageId(lastMessage.id);
            }
            else if (lastMessage.hasOwnProperty('status') && (lastMessage as any).status === "sending" && isInQueue && !wasScrolledBefore) {
                scrollToBottom();
                setLastScrolledMessageId(lastMessage.id);
            }
        }
    }, [messages, messageQueue]);

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

    const handleApplyContract = (contractId: string, status: "ACCEPTED" | "REJECTED") => {
        if (!socketRef.current?.connected) {
            return;
        }

        socketRef.current.emit("updateContractStatus", {
            contractId,
            status,
            chatRoomId
        }, (response: any) => {
            if (response?.success) {
                toast.success(`Contract ${status.toLowerCase()} successfully`);
                utils.chat.getRoomContracts.invalidate();
                utils.chat.getRoomMessages.invalidate();
            } else {
                toast.error(response?.message || `Failed to ${status.toLowerCase()} contract`);
            }
        });
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
            toast.error("Lütfen eklerinizle birlikte bir mesaj ekleyin");
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

            const messageData = {
                chatRoomId: chatRoomId,
                content: messageText,
                type: "text",
                attachmentIds: uploadedAttachments.map((att: UploadedAttachment) => att.id)
            };

            const optimisticMessage = {
                id: `msg-${Date.now()}`,
                senderId: currentUser.id,
                receiverId: selectedUser.id,
                content: messageText,
                timestamp: new Date(),
                type: "text",
                status: "sending",
                attachments: uploadedAttachments.map((att: UploadedAttachment) => ({
                    id: att.id,
                    name: att.filename,
                    filename: att.filename,
                    path: att.path,
                    url: att.path,
                    size: att.size ? Math.round(att.size / 1024) : 0
                }))
            } as Message;

            setMessages((prev: Message[]) => [...prev, optimisticMessage]);
            setMessageText("");
            setAttachments([]);

            setMessageQueue(prev => [...prev, {
                id: optimisticMessage.id,
                data: messageData
            }]);

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Mesaj gönderilemedi. Lütfen tekrar deneyin.");
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

    const onEmojiClick = (emojiObject: any) => {
        setMessageText((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBack = () => {
        setChatRoomId(null);
    };

    const { data: chatRooms } = trpc.chat.chatRooms.useQuery();
    const selectedChat = chatRooms?.find((room: ChatRoom) => room.id === chatRoomId);

    const handleRetry = (messageId: string) => {
        const failedMessage = messages.find(msg => msg.id === messageId);
        if (!failedMessage) return;

        setMessages((prev: Message[]) => 
            prev.map(msg => 
                msg.id === messageId 
                    ? { ...msg, status: "sending" } 
                    : msg
            )
        );

        const messageData = {
            chatRoomId: chatRoomId,
            content: failedMessage.content,
            type: "text",
            attachmentIds: failedMessage.attachments?.map(att => att.id) || []
        };

        if (!socketRef.current?.connected) {
            setMessages((prev: Message[]) => 
                prev.map(msg => 
                    msg.id === messageId 
                        ? { ...msg, status: "failed" } 
                        : msg
                )
            );
            setMessageQueue(prev => [...prev, {
                id: messageId,
                data: messageData
            }]);
            return;
        }

        socketRef.current.emit("sendMessage", messageData, (response: any) => {
            if (!response?.success) {
                setMessages((prev: Message[]) => 
                    prev.map(msg => 
                        msg.id === messageId 
                            ? { ...msg, status: "failed" } 
                            : msg
                    )
                );
                setMessageQueue(prev => [...prev, {
                    id: messageId,
                    data: messageData
                }]);
                toast.error(t("errors.sendFailed"));
            } else {
                setMessages((prev: Message[]) => 
                    prev.map(msg => 
                        msg.id === messageId 
                            ? { ...msg, status: "sent" } 
                            : msg
                    )
                );
            }
        });
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
                            onClick={handleBack}
                            className="mr-2 p-1 rounded-full md:hidden"
                        >
                            <ChevronLeft className="w-5 h-5 text-sub-600" />
                        </button>
                    )}
                    <div className="relative">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 p-0.5 flex items-center justify-center rounded-full overflow-hidden">
                            <Image
                                src={selectedUser.avatar || "/assets/svgs/avatar.svg"}
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
                        className="p-1 sm:p-2 cursor-pointer"
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
                            <span className="text-sub-600 text-sm">{t("loading")}</span>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl space-y-2.5 mx-auto">
                        {messages.map((message) => (
                            <MessageItem
                                key={message.id}
                                message={message}
                                contracts={contractsData || []}
                                isOwn={message.senderId === currentUser.id}
                                handleApplyContract={handleApplyContract}
                                onRetry={handleRetry}
                                sender={
                                    message.senderId === currentUser.id
                                        ? currentUser
                                        : selectedUser
                                }
                            />
                        ))}
                        {isTyping && (
                            <IsTyping selectedUserNickname={selectedUser.name} />
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
                            <div className="flex-1 rounded-xl relative">
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
                                        <div className="relative" ref={emojiPickerRef}>
                                            <button
                                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                className="text-sub-600 hover:text-main-900 cursor-pointer p-1"
                                            >
                                                <Icons.emotion_happy_line className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
                                            </button>
                                            {showEmojiPicker && (
                                                <div className="absolute bottom-full left-0 mb-2 z-[9999]">
                                                    <EmojiPicker
                                                        searchPlaceholder={t("input.searchEmoji")}
                                                        lazyLoadEmojis
                                                        width={300}
                                                        height={400}
                                                        onEmojiClick={onEmojiClick}
                                                    />
                                                </div>
                                            )}
                                        </div>
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
                <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-y-auto custom-scroll p-0">
                    <ContractDetails
                        selectedUser={selectedUser}
                        contracts={contractsData || []}
                        people={selectedChat?.users || []}
                    />
                    <div className="flex items-center justify-between p-4 border-t border-soft-200">
                        <span className="text-xs font-medium text-sub-600">{t("input.fields.totalAmount")}</span>
                        <span className="text-xs font-medium text-strong-950">
                            ${Array.isArray(contractsData) ? contractsData.reduce((total: number, contract: { amount: number }) => total + (contract.amount || 0), 0) : 0}
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChatMain; 