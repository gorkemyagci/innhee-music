import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
    text: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            className="w-full h-10 group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all
            bg-gradient-to-b from-[#20232D]/90 to-[#20232D]
            border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]"
        >
            <div className="absolute top-0 left-0 w-full h-0 group-hover:h-4 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] to-[#FFF]/0" />
            {text}
        </Button>
    )
}

export default SubmitButton;