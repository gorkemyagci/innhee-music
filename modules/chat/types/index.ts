export interface Milestone {
  id: string;
  title: string;
  amount: number;
  amountCurrency: string;
  deadline: string;
  status: "PENDING" | "COMPLETED" | "REJECTED";
  completed: boolean;
  paid: boolean;
  contractId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  amountCurrency: string;
  deliveryDays: number;
  deadline: string;
  chatRoomId: string;
  createdAt: string;
  milestones?: Array<{
    id: string;
    title: string;
    amount: number;
    amountCurrency: string;
    deadline: string;
    description: string;
    status: "PENDING" | "COMPLETED" | "REJECTED";
    completed: boolean;
    paid: boolean;
    contractId: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface Attachment {
  id: string;
  name: string;
  filename: string;
  path: string;
  url: string;
  size: number;
}

export interface Message {
  id: string;
  content: string;
  type: "text" | "system" | "offer" | "milestone";
  senderId: string;
  receiverId: string;
  timestamp: Date;
  additionalInfo?: string;
  attachments?: Attachment[];
  fileCount?: number;
  offer?: Offer;
  milestone?: Milestone;
} 