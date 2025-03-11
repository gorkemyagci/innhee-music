const Awards = () => {
    return (
        <div className="p-4 flex flex-col items-start gap-3">
            <span className="text-main-900 font-medium text-xs">Awards</span>
            <div className="flex flex-wrap w-full gap-2">
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Grammy
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Billboard Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    American Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    BRIT
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    MTV Music
                </div>
                <div className="border border-soft-200 h-6 py-1 px-2 rounded-md flex items-center justify-center text-sub-600 font-medium text-xs">
                    Eurovision Awards
                </div>
            </div>
        </div>
    )
}

export default Awards;