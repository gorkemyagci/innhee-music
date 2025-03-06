"use client";

import { Loader2 } from "lucide-react";

interface SendCodeButtonProps {
    onClick: () => void;
    loading: boolean;
}

const SendCodeButton = ({ onClick, loading }: SendCodeButtonProps) => {
    return (
        <span 
            className={`text-sub-600 min-w-[102px] justify-center hover:text-main-900 flex items-center gap-2 p-2.5 shrink-0 text-sm cursor-pointer font-medium ${loading ? 'opacity-50' : ''}`} 
            onClick={onClick}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Code'}
        </span>
    );
};

export default SendCodeButton;