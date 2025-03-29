"use client";

import { useTranslations } from "next-intl";

const PaymentInfo = ({ data }: { data: any }) => {
    const t = useTranslations("orderDetails.paymentInfo");
    const currency = data?.amountCurrency === "USD" ? "$" : data?.amountCurrency === "EUR" ? "€" : data?.amountCurrency === "GBP" ? "£" : data?.amountCurrency === "CNY" ? "¥" : data?.amountCurrency;
    return (
        <div className="bg-weak-50 p-6 rounded-[12px] flex items-center justify-between flex-1">
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">{t("totalAmount")}</span>
                <span className="text-strong-950 font-medium text-lg">
                    {currency}
                    {data.amount}
                </span>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">{t("settled")}</span>
                <span className="text-strong-950 font-medium text-lg">
                    {currency}
                    0.00
                </span>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">{t("inEscrow")}</span>
                <span className="text-strong-950 font-medium text-lg">
                    {currency}
                    0.00
                </span>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">{t("refunded")}</span>
                <span className="text-strong-950 font-medium text-lg">
                    {currency}
                    0.00
                </span>
            </div>
        </div>
    )
}

export default PaymentInfo;