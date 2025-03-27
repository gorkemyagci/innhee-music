export interface SkillLevel {
    id: string;
    name: string;
}

export interface ProjectItemType {
    id: string;
    title: string;
    description: string;
    budget: string;
    deadline: string;
    proposals: number;
    isApplied?: boolean;
    employer: {
        id: string;
        nickname: string | null;
    };
    salaryCurrency?: string;
    salary?: number;
    subject?: string;
    detail?: string;
    skillLevels?: SkillLevel[];
    attachments?: Array<{
        filename: string;
        url: string;
    }>;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
    type: "text" | "offer" | "system" | "milestone";
    attachments?: Array<{
        id: string;
        name: string;
        filename: string;
        path: string;
        url: string;
        size?: number;
    }>;
}

export interface UploadingFile {
    progress: number;
    name: string;
    size: number;
}

export interface UploadedAttachment {
    id: string;
    filename: string;
    path: string;
    size?: number;
}

export interface ExtendedChatMainProps {
    messages: Message[];
    setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
    selectedUser: {
        id: string;
        name: string;
        nickname?: string;
        avatar: string;
        online?: boolean;
    };
    currentUser: {
        id: string;
        name: string;
        nickname?: string;
        avatar: string;
    };
    onBack?: () => void;
    isLoading?: boolean;
}

export interface ChatRoom {
    id: string;
    updatedAt: string;
    users: Array<{
        userId: string;
        isOnline: boolean;
        user: {
            id: string;
            nickname: string | null;
            avatar: string | null;
        };
    }>;
    messages: Array<{
        createdAt: string;
    }>;
}

export interface ContractDetailsProps {
    selectedUser: {
        id: string;
        name: string;
        nickname?: string;
        avatar: string;
        online?: boolean;
    };
    contracts: Array<{
        id: string;
        name?: string;
        startDate: string;
        deadline: string;
        amount: number;
    }>;
    files?: Array<{
        name: string;
        size: string;
        date: string;
    }>;
    people?: Array<{
        user: {
            avatar: string | null;
            nickname: string | null;
            userType: string;
        };
    }>;
} 