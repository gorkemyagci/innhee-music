"use client";

import { Message, User } from "../../types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import UserAvatar from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ContractDetailsModal from "@/components/custom/modals/contract-details/index";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  sender: User;
  contracts?: any[];
  handleApplyContract: (contractId: string, status: "ACCEPTED" | "REJECTED") => void;
  onRetry?: (messageId: string) => void;
}

const MessageItem = ({ message, isOwn, sender, contracts, handleApplyContract, onRetry }: MessageItemProps) => {  
  const t = useTranslations("chat.main");
  const tMessages = useTranslations("chat.messages");
  const [showContractDetails, setShowContractDetails] = useState(false);
  const [expandedContracts, setExpandedContracts] = useState<{ [key: string]: boolean }>({});

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const handleViewContract = () => {
    setShowContractDetails(true);
  };

  const toggleExpand = (contractId: string) => {
    setExpandedContracts(prev => ({
      ...prev,
      [contractId]: !prev[contractId]
    }));
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
        {contracts?.find((item: any) => item.id === message?.offer?.id)?.status === "ACCEPTED" ? (
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
          contracts?.find((item: any) => item.id === message?.offer?.id)?.status === "PENDING" && (
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
      <div className={cn(
        "flex flex-col",
        isOwn ? "items-end" : "items-start"
      )}>

        <div
          className={cn(
            "flex flex-col-reverse w-full gap-4 mb-6",
            isOwn ? "items-end" : "items-start"
          )}
        >
          {contracts?.find((item: any) => item.id === message?.offer?.id)?.status === "ACCEPTED" && (
            <div className="flex ml-12 justify-end w-full">
              <div className="flex flex-col items-start w-full gap-2">
                <span className="text-sub-600 font-normal text-xs">Accepted an offer</span>
                <div className="bg-weak-50 w-full max-w-[80%] lg:max-w-[50%] rounded-[12px] p-4">
                  <Link href={`/order-details/${contracts?.find((item: any) => item.id === message?.offer?.id)?.id}`} prefetch className="text-primary-base cursor-pointer text-sm font-medium">
                    View Contract
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className={cn(
            "max-w-[80%] flex flex-row gap-2.5",
            isOwn ? "flex-row-reverse" : "flex-row"
          )}>
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
              <div className="lg:w-[360px] w-full rounded-2xl border border-soft-200">
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
                {!isOwn && contracts?.find((item: any) => item.id === message?.offer?.id)?.status === "ACCEPTED" ? (
                  <></>
                ) : !isOwn && (
                  <div className="p-4 flex gap-3 items-center border-t border-soft-200">
                    <Button
                      variant="outline"
                      disabled={contracts?.find((item: any) => item.id === message?.offer?.id)?.status !== "PENDING"}
                      onClick={() => handleApplyContract(message?.offer?.id || "", "REJECTED")}
                      className="h-9 flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm"
                    >
                      {tMessages("offer.cancel")}
                    </Button>
                    <Button
                      onClick={() => {
                        handleApplyContract(message?.offer?.id || "", "ACCEPTED")
                      }}
                      disabled={contracts?.find((item: any) => item.id === message?.offer?.id)?.status !== "PENDING"}
                      className="h-9 flex-1 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                      <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                      {contracts?.find((item: any) => item.id === message?.offer?.id)?.status === "ACCEPTED" ? "Accepted" : tMessages("offer.accept")}
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
              contractId: message.offer?.id || "",
              contractName: message.offer?.title || "",
              startDate: format(new Date(), "dd MMMM, yyyy"),
              deadline: message.offer?.deadline ? format(new Date(message.offer.deadline), "dd MMMM, yyyy") : "",
              amount: message.offer?.amount || 0,
              milestones: message?.milestones
            }}
          />
        </div>
        <div>
          {contracts?.find((item: any) => item.id === message?.offer?.id)?.status === "ACCEPTED" && contracts?.map((item) => (
            item.id === message.offer?.id && item.milestones && item.milestones.length > 0 && (
              <div className="flex gap-2 items-start w-full">
                <UserAvatar
                  imageUrl={sender.avatar || "/assets/images/avatar.png"}
                  name={sender.name}
                  className="w-10 h-10 rounded-full p-1"
                />
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="text-sub-600 font-normal text-xs">{sender.name}</span>
                    <span className="text-sub-600 font-normal text-xs">Activated the milestone</span>
                  </div>
                  <div className="bg-weak-50 lg:w-[396px] mt-1.5 rounded-[12px] p-4 flex flex-col items-start gap-2">
                    <span className="text-strong-950 font-normal text-sm">
                      {item.milestones[0].title}
                    </span>
                    <span className="text-strong-950 font-normal text-sm">
                      Amount: {" "}
                      {item.milestones[0].amountCurrency} {item.milestones[0].amount}
                    </span>
                    <Link href={`/order-details/${item.id}`} prefetch className="text-primary-base cursor-pointer text-sm font-medium">
                      View contract
                    </Link>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

      </div>
    );
  }

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
              <h4 className="font-normal text-strong-950 text-sm mb-1">{message.milestones?.[0]?.title}</h4>
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
            milestoneAmount: message.milestones?.[0]?.amount
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex",
        isOwn ? "justify-end" : "justify-start",
      )}
    >
      {!isOwn && (
        <div className={cn(
          "w-10 h-10 rounded-full p-1 overflow-hidden mr-2 flex-shrink-0 mt-1",
        )}>
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
        <div className={cn(
          "flex items-center justify-between mb-1 flex-shrink-0",
        )}>
          <span className="text-xs font-normal text-sub-600">
            {isOwn ? tMessages("regular.me") : sender.name}
          </span>
          <div className="flex items-center gap-2">
            {isOwn && (message as Message & { status?: "sending" | "sent" | "failed" }).status === "failed" && (
              <div className="flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-full">
                <Icons.close className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span className="text-[10px] text-red-600 font-medium">{tMessages("errors.sendFailed")}</span>
                <button
                  onClick={() => onRetry?.(message.id)}
                  className="flex items-center justify-center hover:bg-red-100 rounded-full p-0.5 transition-colors"
                >
                  <Icons.send_message className="w-3 h-3 text-red-500" />
                </button>
              </div>
            )}
            <span className="text-xs font-normal pl-1.5 text-sub-600">{formatTime(message.timestamp)}</span>
          </div>
        </div>
        <div className="whitespace-pre-wrap break-words overflow-hidden overflow-wrap-break-word hyphens-auto text-sub-600 font-normal text-xs max-h-[300px] overflow-y-auto custom-scroll">
          {message.content && String(message.content).trim() !== "0" && renderTextWithLinks(String(message.content))}
        </div>

        {message.additionalInfo && String(message.additionalInfo).trim() !== "0" && (
          <div className="text-xs text-sub-600 mt-1 whitespace-pre-wrap break-words overflow-hidden overflow-wrap-break-word hyphens-auto">
            {renderTextWithLinks(message.additionalInfo)}
          </div>
        )}

        {Array.isArray(message.attachments) && message.attachments.length > 0 && (
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

        {typeof message.fileCount === 'number' && message.fileCount > 0 && (
          <div className="mt-2 text-xs text-sub-600">
            <span>{tMessages("regular.files", { count: message.fileCount })}</span>
          </div>
        )}
      </div>
      {isOwn && (
        <div className={cn(
          "w-10 h-10 rounded-full p-1 overflow-hidden ml-2 flex-shrink-0 mt-1",
        )}>
          <img
            src={sender.avatar || "/assets/svgs/avatar.svg"}
            alt={sender.name}
            className="w-full h-full object-cover"
            width={32}
            height={32}
          />
        </div>
      )}
    </div>
  );
};

export default MessageItem; 