const RebateCondition = () => {
    return (
        <div className="w-full bg-weak-50 p-4 md:p-5 lg:p-6 flex flex-col items-start gap-4 md:gap-5 rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:justify-between gap-2 md:gap-0">
                <p className="text-strong-950 font-medium text-lg md:text-xl lg:text-2xl">Condition for Achieving Rebate</p>
                <span className="text-strong-950 font-medium text-xs md:text-sm">Rebate Percentage</span>
            </div>
            <div className="flex flex-col w-full items-start gap-3 md:gap-4">
                <div className="bg-white min-h-[4rem] py-3 px-4 flex flex-col md:flex-row items-start md:items-center w-full justify-between rounded-xl gap-2 md:gap-4">
                    <p className="text-strong-950 font-medium text-xs md:text-sm">1-5 successful referrals, OR total transaction amount of referred users reaches $1,000</p>
                    <span className="text-strong-950 font-medium text-sm md:text-base shrink-0">30%</span>
                </div>
                <div className="bg-white min-h-[4rem] py-3 px-4 flex flex-col md:flex-row items-start md:items-center w-full justify-between rounded-xl gap-2 md:gap-4">
                    <p className="text-strong-950 font-medium text-xs md:text-sm">6-10 successful referrals, OR total transaction amount of referred users reaches $5,000</p>
                    <span className="text-strong-950 font-medium text-sm md:text-base shrink-0">35%</span>
                </div>
                <div className="bg-white min-h-[4rem] py-3 px-4 flex flex-col md:flex-row items-start md:items-center w-full justify-between rounded-xl gap-2 md:gap-4">
                    <p className="text-strong-950 font-medium text-xs md:text-sm">10+ successful referrals, OR total transaction amount of referred users reaches $10,000</p>
                    <span className="text-strong-950 font-medium text-sm md:text-base shrink-0">40%</span>
                </div>
            </div>
        </div>
    )
}

export default RebateCondition;