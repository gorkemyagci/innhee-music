"use client"
import currencyFormatter from "currency-formatter";

const useCurrencyFormatter = () => {
    const currency = "USD";

    const formatCurrency = (price: number | string, show?: boolean): string => {
        const shouldShow = show ?? true;

        if (!shouldShow) {
            return currencyFormatter.findCurrency(currency)?.symbol || currency;
        }

        if (isNaN(Number(price))) {
            return "0.00";
        }

        return currencyFormatter.format(Number(price), { code: currency });
    };

    return { formatCurrency, currency };
};

export default useCurrencyFormatter;