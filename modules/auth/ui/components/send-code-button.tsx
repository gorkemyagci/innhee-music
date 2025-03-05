interface SendCodeButtonProps {
    onClick: () => void;
}

const SendCodeButton = ({ onClick }: SendCodeButtonProps) => {
    return (
        <span className="text-sub-600 hover:text-main-900 flex items-center gap-2 p-2.5 shrink-0 text-sm cursor-pointer font-medium" onClick={onClick}>
            Send Code
        </span>
    )
}

export default SendCodeButton;