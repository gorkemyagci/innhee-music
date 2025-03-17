import { User, Message } from "@/modules/chat/types";

// Mock user data
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Cleve Music",
    avatar: "/assets/images/Avatar-4.png",
    lastMessage: "Image la is the migration on zokkin and image lb is the migration of the last order",
    timestamp: new Date(2023, 1, 26, 10, 24),
    online: true,
  },
  {
    id: "user2",
    name: "Tanvir Ahammed",
    avatar: "/assets/images/Avatar-4.png",
    lastMessage: "I will migrate any website from one platform to another",
    timestamp: new Date(2023, 1, 27, 10, 32),
    online: false,
    role: "Worker",
  },
  {
    id: "user3",
    name: "Juyan Che",
    avatar: "/assets/images/Avatar-4.png",
    lastMessage: "Your offer includes 12 Days Delivery",
    timestamp: new Date(2023, 1, 27, 11, 15),
    online: true,
    role: "Owner",
  },
];

// Current user data
export const currentUserData: User = {
  id: "current-user",
  name: "James Brown",
  avatar: "/assets/images/profile.png",
  role: "CEO",
  online: true,
};

// Mock messages data
export const getMockMessages = (selectedChatId: string): Message[] => [
  {
    id: "msg1",
    senderId: "current-user",
    receiverId: selectedChatId,
    content: "https://zokkin.com/payout/admin.php",
    timestamp: new Date(2023, 1, 26, 10, 24),
    type: "text",
    additionalInfo: "root Password:root",
  },
  {
    id: "msg2",
    senderId: "current-user",
    receiverId: selectedChatId,
    content: "Image la is the migration on zokkin and image lb is the migration of the last order, which seems to be the same error.",
    timestamp: new Date(2023, 1, 26, 10, 25),
    type: "text",
    attachments: [
      {
        id: "att1",
        name: "la.png",
        url: "/assets/images/chat-image.png",
        size: "53.76 KB",
      },
      {
        id: "att2",
        name: "lb.png",
        url: "/assets/images/chat-image.png",
        size: "62.26 KB",
      },
    ],
  },
  {
    id: "msg3",
    senderId: "current-user",
    receiverId: selectedChatId,
    content: "Accepted an offer",
    timestamp: new Date(2023, 1, 26, 10, 25),
    type: "system",
  },
  {
    id: "msg4",
    senderId: selectedChatId,
    receiverId: "current-user",
    content: "I will migrate any website from oh...",
    timestamp: new Date(2023, 1, 27, 10, 32),
    type: "offer",
    offer: {
      id: "offer1",
      title: "I will migrate any website from oh...",
      amount: 100,
      currency: "USD",
      description: "upgrade the payout web app to php 8 pages...",
      deliveryDays: 12,
    },
  },
  {
    id: "msg5",
    senderId: selectedChatId,
    receiverId: "current-user",
    content: "Activated the milestone",
    timestamp: new Date(2023, 1, 27, 10, 32),
    type: "system",
  },
  {
    id: "msg6",
    senderId: selectedChatId,
    receiverId: "current-user",
    content: "Milestone 3: \"8\"",
    timestamp: new Date(2023, 1, 27, 10, 32),
    type: "milestone",
    milestone: {
      id: "milestone1",
      title: "Milestone 3: \"8\"",
      amount: 70,
      currency: "USD",
    },
  },
  {
    id: "msg7",
    senderId: selectedChatId,
    receiverId: "current-user",
    content: "Image la is the migration on zokkin and image lb is the migration of the last order, which seems to be the same error.",
    timestamp: new Date(2023, 1, 27, 11, 15),
    type: "text",
    fileCount: 2,
  },
];

// Mock contract details
export const contractDetailsData = {
  contractId: "126895",
  contractName: "Contract name here...",
  startDate: "10 March, 2025",
  deadline: "15 March, 2025",
  amount: 240,
  files: [
    {
      name: "Audio Script.mp3",
      size: "2.35mb",
      date: "3 days ago",
    },
  ],
  people: [
    {
      name: "Juyan Che",
      role: "Owner (you)",
      avatar: "/assets/images/Avatar-6.png",
    },
    {
      name: "Tanvir Ahammed",
      role: "Worker",
      avatar: "/assets/images/avatar-3.png",
    },
    {
        name: "Tanvir Ahammed",
        role: "Worker",
        avatar: "/assets/images/avatar-3.png",
        status: "offline"
      },
  ],
}; 