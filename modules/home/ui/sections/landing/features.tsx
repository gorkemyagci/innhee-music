import Image from "next/image";

const Features = () => {
    return (
        <div className="w-full flex flex-col py-20 items-center justify-center gap-16">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-neutral-800 text-center text-[3.5rem] leading-[4rem] font-medium">
                    Elevate Your Music Experience
                </h2>
                <p className="text-neutral-500 font-medium text-lg leading-6 max-w-3xl text-center">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="grid grid-cols-3 gap-6 w-full px-20">
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-6 items-start">
                    <div className="flex flex-col items-start gap-3">
                        <h6 className="text-black font-medium text-2xl">Translucent</h6>
                        <span className="text-[#666D80] text-sm font-medium">Experience clarity in sound with smooth transitions and a clean interface</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image src="/assets/images/features/translucent.png" alt="Translucent" width={297} height={227} className="w-[297px] h-[227px] pointer-events-none rounded-xl" quality={100} />
                    </div>
                </div>
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-6 items-start">
                    <div className="flex flex-col items-start gap-3">
                        <h6 className="text-black font-medium text-2xl">Frosted</h6>
                        <span className="text-[#666D80] text-sm font-medium">Feel the vibe with ambient connections, offering a personalized and immersive listening experience.</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image src="/assets/images/features/frosted.png" alt="Frosted" width={395} height={259} className="w-[395px] h-[259px] pointer-events-none" quality={100} />
                    </div>
                </div>
                <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-6 items-start">
                    <div className="flex flex-col items-start gap-3">
                        <h6 className="text-black font-medium text-2xl">Glass</h6>
                        <span className="text-[#666D80] text-sm font-medium">Dive into crystal-clear soundscapes, where every beat and melody is brought to life.</span>
                    </div>
                    <div className="w-full flex items-center justify-center py-2.5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl">
                        <Image src="/assets/images/features/glass.png" alt="Glass" width={395} height={259} className="w-[395px] h-[259px] pointer-events-none" quality={100} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;