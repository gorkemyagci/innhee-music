const BorderBackground = () => {
    return (
        <>
            <div className="absolute inset-0 bg-[#FAFAFA] -z-10">
                <div className="size-full relative">
                    <div
                        className="absolute left-4 sm:left-8 md:left-20 h-full border-l border-transparent"
                        style={{
                            borderImage: "repeating-linear-gradient(to bottom, #D4D4D4 0 10px, transparent 10px 20px) 1",
                        }}
                    />
                    <div
                        className="absolute hidden md:block left-1/2 -translate-x-[18rem] h-full border-l border-transparent"
                        style={{
                            borderImage: "repeating-linear-gradient(to bottom, #D4D4D4 0 10px, transparent 10px 20px) 1",
                        }}
                    />
                    <div
                        className="absolute left-1/2 -translate-x-1/2 h-full border-l border-transparent"
                        style={{
                            borderImage: "repeating-linear-gradient(to bottom, #D4D4D4 0 10px, transparent 10px 20px) 1",
                        }}
                    />
                    <div
                        className="absolute hidden md:block left-1/2 translate-x-[18rem] h-full border-l border-transparent"
                        style={{
                            borderImage: "repeating-linear-gradient(to bottom, #D4D4D4 0 10px, transparent 10px 20px) 1",
                        }}
                    />
                    <div
                        className="absolute right-4 sm:right-8 md:right-20 h-full border-l border-transparent"
                        style={{
                            borderImage: "repeating-linear-gradient(to bottom, #D4D4D4 0 10px, transparent 10px 20px) 1",
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default BorderBackground;