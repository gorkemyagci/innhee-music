"use client";

import { Message, User } from "../../types";
import { format } from "date-fns";
import { Check, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  sender: User;
}

const MessageItem = ({ message, isOwn, sender }: MessageItemProps) => {
  const [showContractDetails, setShowContractDetails] = useState(false);

  // Animation variants
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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const handleViewContract = () => {
    setShowContractDetails(true);
  };

  // Function to detect URLs in text and convert them to clickable links
  const renderTextWithLinks = (text: string) => {
    // URL regex pattern
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // If no URLs in text, return the text as is
    if (!text.match(urlRegex)) {
      return text;
    }

    // Create an array to hold the result
    const result = [];

    // Keep track of the last index we've processed
    let lastIndex = 0;

    // Find all matches
    let match;
    let counter = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      // Get the matched URL
      const url = match[0];

      // Get the index where the URL starts
      const urlIndex = match.index;

      // Add the text before the URL
      if (urlIndex > lastIndex) {
        result.push(
          <span key={`text-${counter}`}>
            {text.substring(lastIndex, urlIndex)}
          </span>
        );
      }

      // Add the URL as a link
      result.push(
        <a
          key={`link-${counter}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sub-600 text-xs font-normal"
        >
          {url}
        </a>
      );

      // Update the last index to after this URL
      lastIndex = urlIndex + url.length;
      counter++;
    }

    // Add any remaining text after the last URL
    if (lastIndex < text.length) {
      result.push(
        <span key={`text-last`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return result;
  };

  // Render system messages
  if (message.type === "system") {
    return (
      <div className="flex flex-col w-full items-end my-4">
        {message.content.includes("Accepted an offer") ? (
          <div className="flex flex-col items-start w-1/2 gap-3">
            <span className="text-xs text-sub-600 font-normal">Accepted an offer</span>
            <button
              className="text-primary-base w-full text-xs h-[52px] flex items-center justify-start rounded-[12px] bg-weak-50 p-4 font-medium"
              onClick={handleViewContract}
            >
              View contract
            </button>
          </div>
        ) : (
          <div className="bg-soft-100 text-sub-600 text-xs px-3 py-1 rounded-full mb-2">
            {message.content}
          </div>
        )}
        <AnimatePresence>
          {showContractDetails && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowContractDetails(false)}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
            >
              <motion.div
                className="bg-white rounded-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
              >
                <h3 className="text-lg font-medium mb-4">Contract Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Contract ID</span>
                    <span className="text-sm font-medium">#126895</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Contract Name</span>
                    <span className="text-sm font-medium">Contract name here...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Start Date</span>
                    <span className="text-sm font-medium">10 March, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Deadline</span>
                    <span className="text-sm font-medium">15 March, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Total Amount</span>
                    <span className="text-sm font-medium">$240.00</span>
                  </div>
                </div>
                <button
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowContractDetails(false)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Render offer messages
  if (message.type === "offer") {
    return (
      <div
        className={cn(
          "flex",
          isOwn ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "max-w-[80%] rounded-lg p-4",
            isOwn ? "bg-blue-50 text-main-900" : "bg-white border border-soft-200"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-sub-600">Offer</span>
            <span className="text-xs text-sub-600">{formatTime(message.timestamp)}</span>
          </div>
          <h4 className="font-medium text-sm mb-1">{message.offer?.title}</h4>
          <p className="text-xs text-sub-600 mb-2">{message.offer?.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm">{message.offer?.currency}{message.offer?.amount}</span>
            <div className="text-xs text-sub-600 flex items-center">
              <span className="mr-1">{message.offer?.deliveryDays} Days Delivery</span>
            </div>
          </div>
          {!isOwn && message.content.includes("Accepted") ? (
            <div className="mt-3">
              <button
                className="text-blue-600 text-xs font-medium hover:underline"
                onClick={handleViewContract}
              >
                View contract
              </button>
            </div>
          ) : !isOwn && (
            <div className="mt-3 flex gap-2">
              <button className="bg-white border border-soft-200 text-sub-600 px-4 py-1 rounded text-xs font-medium">
                Decline
              </button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-xs font-medium">
                Accept
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showContractDetails && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowContractDetails(false)}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
            >
              <motion.div
                className="bg-white rounded-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
              >
                <h3 className="text-lg font-medium mb-4">Contract Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Contract ID</span>
                    <span className="text-sm font-medium">#126895</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Contract Name</span>
                    <span className="text-sm font-medium">Contract name here...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Start Date</span>
                    <span className="text-sm font-medium">10 March, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Deadline</span>
                    <span className="text-sm font-medium">15 March, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Total Amount</span>
                    <span className="text-sm font-medium">$240.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Offer Amount</span>
                    <span className="text-sm font-medium">{message.offer?.currency}{message.offer?.amount}</span>
                  </div>
                </div>
                <button
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowContractDetails(false)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div
          className={cn(
            "max-w-[80%] rounded-lg p-4",
            isOwn ? "bg-blue-50 text-main-900" : "bg-white border border-soft-200"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-sub-600">Milestone</span>
            <span className="text-xs text-sub-600">{formatTime(message.timestamp)}</span>
          </div>
          <h4 className="font-medium text-sm mb-2">{message.milestone?.title}</h4>
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm">{message.milestone?.currency}{message.milestone?.amount}</span>
          </div>
          <div className="mt-3">
            <button
              className="text-blue-600 text-xs font-medium hover:underline"
              onClick={handleViewContract}
            >
              View contract
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showContractDetails && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowContractDetails(false)}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
            >
              <motion.div
                className="bg-white rounded-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
              >
                <h3 className="text-lg font-medium mb-4">Contract Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Contract ID</span>
                    <span className="text-sm font-medium">#126895</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Contract Name</span>
                    <span className="text-sm font-medium">Contract name here...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Start Date</span>
                    <span className="text-sm font-medium">10 March, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Deadline</span>
                    <span className="text-sm font-medium">15 March, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Total Amount</span>
                    <span className="text-sm font-medium">$240.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-sub-600">Milestone Amount</span>
                    <span className="text-sm font-medium">{message.milestone?.currency}{message.milestone?.amount}</span>
                  </div>
                </div>
                <button
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => setShowContractDetails(false)}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Render regular text messages
  return (
    <div
      className={cn(
        "flex",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      {!isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%]",
          isOwn ? "text-main-900" : "bg-white border border-soft-200",
          "rounded-lg p-3 overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-sub-600">
            {isOwn ? "Me" : sender.name}
          </span>
          <span className="text-xs text-sub-600 ml-2">{formatTime(message.timestamp)}</span>
        </div>
        <div className="whitespace-pre-wrap break-words overflow-hidden overflow-wrap-break-word hyphens-auto text-sub-600 font-normal text-xs">
          {renderTextWithLinks(message.content)}
        </div>

        {message.additionalInfo && (
          <div className="text-xs text-sub-600 mt-1">
            {renderTextWithLinks(message.additionalInfo)}
          </div>
        )}

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex items-start gap-5">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="relative">
                <img
                  src={attachment.url}
                  alt={attachment.name}
                  className="w-[160px] h-[112px] rounded"
                />
                <div className="text-[11px] text-soft-400 font-medium mt-1 flex justify-between">
                  <span>{attachment.name}</span>
                  <span>{attachment.size}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {message.fileCount && (
          <div className="mt-2 text-xs text-sub-600">
            <span>{message.fileCount} files</span>
          </div>
        )}
      </div>
      {isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0 mt-1">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MessageItem; 