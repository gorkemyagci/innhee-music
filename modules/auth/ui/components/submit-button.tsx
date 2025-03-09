"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
    text: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

const SubmitButton = ({ text, onClick, loading, disabled, className }: SubmitButtonProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <Button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={cn("w-full h-10 disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]", className)}>
            <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
            { loading?<Loader2 className = "w-4 h-4 text-white animate-spin" /> : text}
        </Button>
    )
}

export default SubmitButton;