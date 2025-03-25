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
