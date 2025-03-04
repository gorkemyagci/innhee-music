import Image from "next/image";

const Features = () => {
    return (
        <div className="w-full max-w-[1440px] mx-auto flex flex-col py-10 md:py-16 lg:py-20 items-center justify-center gap-8 md:gap-12 lg:gap-16 px-4 lg:px-8">
            <div className="flex flex-col items-center gap-3 md:gap-4">
                <h2 className="text-neutral-800 text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] font-medium">
                    Elevate Your Music Experience
                </h2>
                <p className="text-neutral-500 font-medium text-base lg:text-lg leading-6 max-w-3xl text-center px-4">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full">
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4 md:gap-5 lg:gap-6 items-start">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <h6 className="text-black font-medium text-xl md:text-2xl">Translucent</h6>
                        <span className="text-[#666D80] text-sm font-medium">Experience clarity in sound with smooth transitions and a clean interface</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image 
                            src="/assets/images/features/translucent.png" 
                            alt="Translucent" 
                            width={297} 
                            height={227} 
                            className="w-full h-auto max-w-[297px] pointer-events-none rounded-xl object-cover" 
                            quality={100} 
                        />
                    </div>
                </div>
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4 md:gap-5 lg:gap-6 items-start">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <h6 className="text-black font-medium text-xl md:text-2xl">Frosted</h6>
                        <span className="text-[#666D80] text-sm font-medium">Feel the vibe with ambient connections, offering a personalized and immersive listening experience.</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image 
                            src="/assets/images/features/frosted.png" 
                            alt="Frosted" 
                            width={395} 
                            height={259} 
                            className="w-full h-auto max-w-[395px] pointer-events-none object-cover" 
                            quality={100} 
                        />
                    </div>
                </div>
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4 md:gap-5 lg:gap-6 items-start md:col-span-2 lg:col-span-1">
                    <div className="flex flex-col items-start gap-2 md:gap-3">
                        <h6 className="text-black font-medium text-xl md:text-2xl">Glass</h6>
                        <span className="text-[#666D80] text-sm font-medium">Dive into crystal-clear soundscapes, where every beat and melody is brought to life.</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image 
                            src="/assets/images/features/glass.png" 
                            alt="Glass" 
                            width={395} 
                            height={259} 
                            className="w-full h-auto max-w-[395px] pointer-events-none object-cover" 
                            quality={100} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;