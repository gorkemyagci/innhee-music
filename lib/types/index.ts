export type RecordType = Record<string, any>;

export interface ProjectItemProps {
    item: {
        id: number;
        clientName: string;
        clientAvatar: string;
        rating: number;
        reviewCount: number;
        jobType: string;
        workType: string;
        specialization: string;
        title: string;
        skills: string[];
        description: string;
        price: number;
        priceType: string;
        deadline: string;
        proposalsSent: number;
    };
}