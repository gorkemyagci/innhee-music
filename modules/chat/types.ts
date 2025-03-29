export interface User {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  online?: boolean;
  role?: string;
  lastMessage?: string;
  timestamp?: Date;
}

export interface Attachment {
  id: string;
  name: string;
  filename: string;
  path: string;
  url: string;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  deliveryDays: number;
  status?: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  skillLevels?: any[];
  milestones?: Milestone[];
  deadline?: string;
}

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  amountCurrency: string;
  deadline: string;
  status: "PENDING" | "COMPLETED";
  completed: boolean;
  paid: boolean;
  contractId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'offer' | 'milestone';
  attachments?: Attachment[];
  additionalInfo?: string;
  offer?: Offer;
  milestones?: Milestone[];
  fileCount?: number;
  chatRoomId?: string;
  createdAt?: string;
} 