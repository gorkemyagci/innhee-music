export interface ContractDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: {
    contractId: string;
    contractName: string;
    startDate: string;
    deadline: string;
    amount: number;
    offerAmount?: number;
    milestoneAmount?: number;
    status?: "PENDING" | "ACCEPTED" | "REJECTED";
  };
} 