import { User, Message } from "@/modules/chat/types";

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

export const currentUserData: User = {
  id: "current-user",
  name: "James Brown",
  avatar: "/assets/images/profile.png",
  role: "CEO",
  online: true,
};

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
        filename: "la.png",
        path: "/assets/images/chat-image.png",
        url: "/assets/images/chat-image.png",
        size: 54,
      },
      {
        id: "att2",
        name: "lb.png",
        filename: "lb.png",
        path: "/assets/images/chat-image.png",
        url: "/assets/images/chat-image.png",
        size: 62,
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
    milestones: [
      {
        id: "milestone1",
        title: "Milestone 3: \"8\"",
        amount: 70,
        amountCurrency: "USD",
        deadline: "2024-12-31T23:59:59Z",
        status: "PENDING",
      completed: false,
        paid: false,
        contractId: "contract1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
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
    {
      name: "Design.pdf",
      size: "1.2mb",
      date: "2 days ago",
    },
    {
      name: "Requirements.docx",
      size: "0.8mb",
      date: "1 day ago",
    }
  ],
  people: [
    {
      userId: "1",
      isOnline: true,
      user: {
        id: "1",
        nickname: "Juyan Che",
        avatar: "/assets/images/Avatar-6.png",
        userType: "Owner"
      }
    },
    {
      userId: "2",
      isOnline: false,
      user: {
        id: "2",
        nickname: "Tanvir Ahammed",
        avatar: "/assets/images/avatar-3.png",
        userType: "Worker"
      }
    }
  ]
}; 