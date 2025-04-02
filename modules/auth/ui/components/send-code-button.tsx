"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface SendCodeButtonProps {
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    countdown?: number;
}

const SendCodeButton = ({ onClick, loading, disabled, countdown = 0 }: SendCodeButtonProps) => {
    const t = useTranslations("auth.signIn.form");

    return (
        <Button
            type="button"
            variant="ghost"
            className="h-full px-3 hover:bg-transparent min-w-[120px] justify-center"
            onClick={onClick}
            disabled={loading || disabled}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : countdown > 0 ? (
                <span className="tabular-nums">{countdown}s</span>
            ) : (
                t("code.send")
            )}
        </Button>
    );
};

export default SendCodeButton;