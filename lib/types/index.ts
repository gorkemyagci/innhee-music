import { User } from "@/modules/chat/types";
import { Dispatch } from "react";
import { SetStateAction } from "react";

export type RecordType = Record<string, any>;

export type ProjectItemType = {
  id: string;
  subject: string;
  detail: string;
  salary: number;
  salaryCurrency: string;
  privacy: string;
  usage: string;
  budgetsActive: boolean;
  proposals: number;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  employerId: string;
  attachments: any[];
  skillLevels: SkillLevel[];
  candidateSources: CandidateSource[];
  employer: Employer;
};

export type SkillLevel = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CandidateSource = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Employer = {
  id: string;
  email: string | null;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  nickname: string | null;
  password: string | null;
  userType: string;
  createdAt: string;
  updatedAt: string;
};

export interface DecodedToken {
  id: string;
  nickname?: string;
  email?: string;
  phone?: string | null;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  userType?: string;
  createdAt?: string;
  updatedAt?: string;
  roles?: Array<{
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }>;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export type UserType = {
  id: string;
  email: string | null;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  nickname: string | null;
  password: string | null;
  userType: string;
  createdAt: string;
  updatedAt: string;
  roles?: Array<{
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export interface ChatRoom {
  id: string;
  createdAt: string;
  updatedAt: string;
  users: {
    id: string;
    chatRoomId: string;
    userId: string;
    isOnline: boolean;
    joinedAt: string;
    lastSeen: string;
    user: {
      id: string;
      nickname: string;
      email: string;
      avatar?: string;
    };
  }[];
  messages: any[];
  contracts: any[];
}

export interface ChatMainProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  selectedUser: User | undefined;
  currentUser: User;
  onBack?: () => void;
  onSendMessage?: (content: string, attachments?: File[]) => void;
  onSendOffer?: (offer: Offer) => void;
}

export interface UploadingFile {
  progress: number;
  name: string;
  size: number;
  preview?: string;
}


export interface ContractDetailsProps {
  contracts: {
    id: string;
    name: string;
    startDate: string;
    deadline: string;
    amount: number;
  }[];
  selectedUser: any;
  files?: {
      name: string;
      size: string;
      date: string;
  }[];
  people?: {
      userId: string;
      isOnline: boolean;
      user: {
          id: string;
          nickname: string;
          avatar?: string;
          userType: string;
      };
  }[];
}

export interface ExtendedChatMainProps extends Omit<ChatMainProps, 'setMessages'> {
  setMessages: Dispatch<SetStateAction<Message[]>>;
  selectedUser: User;
  isLoading?: boolean;
}

export interface UploadedAttachment {
  id: string;
  filename: string;
  path: string;
  size: number;
}

export interface Milestone {
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
  milestones?: Milestone[];
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

export interface Attachment {
  id: string;
  name: string;
  path: string;
  url: string;
  size: number;
  filename: string;
}
