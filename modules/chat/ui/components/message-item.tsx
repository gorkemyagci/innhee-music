"use client";

import { Attachment, Message, User } from "../../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import UserAvatar from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ContractDetailsModal from "@/components/custom/modals/contract-details/index";
import { useTranslations } from "next-intl";
import { Socket } from "socket.io-client";
import { toast } from "sonner";

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  sender: User;
}

const MessageItem = ({ message, isOwn, sender }: MessageItemProps) => {
  const t = useTranslations("chat.main");
  const tMessages = useTranslations("chat.messages");
  const [showContractDetails, setShowContractDetails] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const handleViewContract = () => {
    setShowContractDetails(true);
  };

  const handleContractAction = (contractId: string, status: "ACCEPTED" | "REJECTED") => {
    if (!socketRef.current?.connected) return;
    
    socketRef.current.emit("updateContractStatus", {
      contractId,
      status
    }, (response: any) => {
      if (response?.success) {
        toast.success(`Contract ${status.toLowerCase()} successfully`);
      } else {
        toast.error(`Failed to ${status.toLowerCase()} contract`);
      }
    });
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    if (!text.match(urlRegex)) {
      return text;
    }

    const result = [];
    let lastIndex = 0;

    let match;
    let counter = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0];
      const urlIndex = match.index;
      if (urlIndex > lastIndex) {
        result.push(
          <span key={`text-${counter}`}>
            {text.substring(lastIndex, urlIndex)}
          </span>
        );
      }
      result.push(
        <a
          key={`link-${counter}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-xs font-normal"
        >
          {url}
        </a>
      );
      lastIndex = urlIndex + url.length;
      counter++;
    }
    if (lastIndex < text.length) {
      result.push(
        <span key={`text-last`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return result;
  };

  if (message.type === "system") {
    return (
      <div className="flex flex-col w-full items-end my-4">
        {message.content.includes("Accepted an offer") ? (
          <div className="flex flex-col items-start w-1/2 gap-3">
            <span className="text-xs text-sub-600 font-normal">{tMessages("system.acceptedOffer")}</span>
            <button
              className="text-primary-base w-full text-xs h-[52px] flex items-center justify-start rounded-[12px] bg-weak-50 p-4 font-medium"
              onClick={handleViewContract}
            >
              {tMessages("system.viewContract")}
            </button>
          </div>
        ) : (
          message.content !== "Activated the milestone" && (
            <div className="bg-soft-100 text-sub-600 text-xs px-3 py-1 rounded-full mb-2">
              {message.content}
            </div>
          )
        )}
        <ContractDetailsModal
          isOpen={showContractDetails}
          onClose={() => setShowContractDetails(false)}
          contractData={{
            contractId: "126895",
            contractName: "Contract name here...",
            startDate: "10 March, 2025",
            deadline: "15 March, 2025",
            amount: 240.00
          }}
        />
      </div>
    );
  }

  if (message.type === "offer") {
    return (
      <div
        className={cn(
          "flex mb-6",
          isOwn ? "justify-end" : "justify-start"
        )}
      >
        <div className="max-w-[80%] flex flex-row gap-2.5">
          <UserAvatar
            imageUrl={sender.avatar}
            name={sender.name}
            className="w-10 h-10 rounded-full p-1"
          />
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-0.5 text-xs">
                <span className="font-medium text-sub-600">{sender.name}</span>
                <span className="font-normal text-soft-400">{formatTime(message.timestamp)}</span>
              </div>
              <span className="text-sub-600 font-normal text-xs flex items-center gap-1">{tMessages("offer.title")} <Icons.information_line /></span>
            </div>
            <div
              className={cn(
                "lg:w-[360px] w-full rounded-2xl border border-soft-200"
              )}
            >
              <div className="p-4 bg-weak-50 rounded-t-2xl flex items-center justify-between">
                <span className="font-medium text-sm text-strong-950">
                  {message.offer?.title}
                </span>
                <span className="font-medium text-base text-strong-950">
                  {message.offer?.currency === "USD" ? "USD$" : message.offer?.currency}{message.offer?.amount}
                </span>
              </div>
              <div className="flex flex-col items-start gap-3 p-4">
                <span className="text-strong-950 font-normal text-xs">{message.offer?.description}</span>
                <Separator className="bg-soft-200" />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-strong-950 text-xs font-medium">
                    {tMessages("offer.yourOfferIncludes")}
                  </span>
                  <div className="flex items-center gap-1">
                    <Icons.time_line />
                    <span className="text-sub-600 text-xs font-normal">
                      {message.offer?.deliveryDays} {tMessages("offer.deliveryTime")}
                    </span>
                  </div>
                </div>
              </div>
              {!isOwn && message.content.includes("Accepted") ? (
                <div className="mt-3">
                  <button
                    className="text-blue-600 text-xs font-medium hover:underline"
                    onClick={handleViewContract}
                  >
                    {tMessages("system.viewContract")}
                  </button>
                </div>
              ) : !isOwn && (
                <div className="p-4 flex gap-3 items-center border-t border-soft-200">
                  <Button 
                    variant="outline" 
                    onClick={() => handleContractAction(message.offer?.id || "", "REJECTED")}
                    className="h-9 flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm"
                  >
                    {tMessages("offer.cancel")}
                  </Button>
                  <Button
                    onClick={() => handleContractAction(message.offer?.id || "", "ACCEPTED")}
                    className="h-9 flex-1 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                    <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                    {tMessages("offer.accept")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <ContractDetailsModal
          isOpen={showContractDetails}
          onClose={() => setShowContractDetails(false)}
          contractData={{
            contractId: "126895",
            contractName: "Contract name here...",
            startDate: "10 March, 2025",
            deadline: "15 March, 2025",
            amount: 240.00,
            offerAmount: message.offer?.amount
          }}
        />
      </div>
    );
  }

  // Render milestone messages
  if (message.type === "milestone") {
    return (
      <div
        className={cn(
          "flex",
          isOwn ? "justify-end" : "justify-start"
        )}
      >
        <div className="flex items-start gap-2.5 max-w-[80%]">
          <UserAvatar
            imageUrl={sender.avatar}
            name={sender.name}
            className="w-10 h-10 rounded-full p-1"
          />
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-0.5 text-xs">
                <span className="font-medium text-sub-600">{sender.name}</span>
                <span className="font-normal text-soft-400">{formatTime(message.timestamp)}</span>
              </div>
              <span className="text-sub-600 font-normal text-xs">{tMessages("milestone.activated")}</span>
            </div>
            <div
              className={cn(
                "w-full rounded-lg p-4 bg-weak-50"
              )}
            >
              <h4 className="font-normal text-strong-950 text-sm mb-1">{message.milestone?.title}</h4>
              <div className="flex justify-between items-center">
                <span className="font-normal text-strong-950 text-sm">{t("milestone.amount")} $70.00</span>
              </div>
              <div className="mt-1">
                <button
                  className="text-primary-base text-sm cursor-pointer font-medium hover:underline"
                  onClick={handleViewContract}
                >
                  {tMessages("milestone.viewContract")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <ContractDetailsModal
          isOpen={showContractDetails}
          onClose={() => setShowContractDetails(false)}
          contractData={{
            contractId: "126895",
            contractName: "Contract name here...",
            startDate: "10 March, 2025",
            deadline: "15 March, 2025",
            amount: 240.00,
            milestoneAmount: message.milestone?.amount
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      {!isOwn && (
        <div className="w-10 h-10 rounded-full p-1 overflow-hidden mr-2 flex-shrink-0 mt-1">
          <UserAvatar
            imageUrl={sender.avatar}
            name={sender.name}
            className="w-10 h-10 rounded-full p-1"
          />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%]",
          isOwn ? "text-main-900" : "bg-white border border-soft-200",
          "rounded-lg p-3 overflow-hidden flex flex-col"
        )}
      >
        <div className="flex items-center justify-between mb-1 flex-shrink-0">
          <span className="text-xs font-medium text-sub-600">
            {isOwn ? tMessages("regular.me") : sender.name}
          </span>
          <span className="text-xs text-sub-600 ml-2">{formatTime(message.timestamp)}</span>
        </div>
        <div className="whitespace-pre-wrap break-words overflow-hidden overflow-wrap-break-word hyphens-auto text-sub-600 font-normal text-xs max-h-[300px] overflow-y-auto custom-scroll flex-grow">
          {renderTextWithLinks(message.content)}
        </div>

        {message.additionalInfo && (
          <div className="text-xs text-sub-600 mt-1 whitespace-pre-wrap break-words overflow-hidden overflow-wrap-break-word hyphens-auto">
            {renderTextWithLinks(message.additionalInfo)}
          </div>
        )}

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap items-start gap-5">
            {message.attachments.map((attachment) => {
              const isImage = attachment.path.match(/\.(jpg|jpeg|png|gif|webp)(?:_\d+)?$/i);
              const isPDF = attachment.path.match(/\.pdf(?:_\d+)?$/i);
              const isDocument = attachment.path.match(/\.(doc|docx|xls|xlsx|txt)(?:_\d+)?$/i);
              const isAudio = attachment.path.match(/\.(mp3|wav|ogg)(?:_\d+)?$/i);
              const isVideo = attachment.path.match(/\.(mp4|mov|avi)(?:_\d+)?$/i);
              return (
                <div key={attachment.id} className="relative max-w-[160px]">
                  {isImage ? (
                    <img
                      src={attachment.url}
                      alt={attachment.path}
                      className="w-full h-[112px] rounded object-cover"
                    />
                  ) : (
                    <div className="w-full h-[112px] rounded bg-soft-50 border border-soft-200 flex flex-col items-center justify-center p-3">
                      <div className="w-12 h-12 rounded-full bg-white border border-soft-200 flex items-center justify-center mb-2">
                        {isPDF && <Icons.file className="w-6 h-6 text-red-500" />}
                        {isDocument && <Icons.file className="w-6 h-6 text-blue-500" />}
                        {isAudio && <Icons.file className="w-6 h-6 text-green-500" />}
                        {isVideo && <Icons.file className="w-6 h-6 text-purple-500" />}
                        {!isPDF && !isDocument && !isAudio && !isVideo && <Icons.file className="w-6 h-6 text-gray-500" />}
                      </div>
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-base hover:underline font-medium text-center"
                      >
                        {tMessages("attachments.downloadFile")}
                      </a>
                    </div>
                  )}
                  <div className="text-[11px] text-soft-400 font-medium mt-1 flex justify-between">
                    <span className="truncate">{attachment.path}</span>
                    <span>{attachment.size} KB</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {message.fileCount && (
          <div className="mt-2 text-xs text-sub-600">
            <span>{tMessages("regular.files", { count: message.fileCount })}</span>
          </div>
        )}
      </div>
      {isOwn && (
        <div className="w-10 h-10 rounded-full p-1 overflow-hidden ml-2 flex-shrink-0 mt-1">
          <img
            src={sender.avatar || "/assets/images/avatar-4.png"}
            alt={sender.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MessageItem; 