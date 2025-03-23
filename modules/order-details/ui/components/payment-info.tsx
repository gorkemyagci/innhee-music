const PaymentInfo = () => {
    return (
        <div className="bg-weak-50 p-6 rounded-[12px] flex items-center justify-between flex-1">
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">Total Amount</span>
                <span className="text-strong-950 font-medium text-lg">$500.00</span>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">Settled</span>
                <span className="text-strong-950 font-medium text-lg">$500.00</span>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">In Escrow</span>
                <span className="text-strong-950 font-medium text-lg">$0.00</span>
            </div>
            <div className="flex flex-col items-start gap-2">
                <span className="text-sub-600 font-medium text-xs">Refunded</span>
                <span className="text-strong-950 font-medium text-lg">$0.00</span>
            </div>
        </div>
    )
}

export default PaymentInfo;