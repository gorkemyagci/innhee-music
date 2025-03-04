"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Partners = () => {
    const partnerImages = [
        "partner-1.png",
        "partner-2.png",
        "partner-3.png",
    ];

    return (
        <div className="w-full max-w-[1440px] flex flex-col items-center justify-between gap-8 md:gap-12 lg:gap-16 py-10 md:py-16 lg:py-20 px-4 lg:px-8">
            <div className="flex flex-col items-center gap-3 md:gap-4">
                <h2 className="text-neutral-800 text-center text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] leading-[2.5rem] md:leading-[3rem] lg:leading-[4rem] font-medium">
                    Powers the online experiences you love.
                </h2>
                <p className="text-neutral-500 font-medium text-base lg:text-lg leading-6 max-w-3xl text-center px-4">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="w-full flex h-20 lg:h-28 items-center gap-40 overflow-hidden relative">
                <Marquee className="flex h-full border-black/10 overflow-hidden items-center whitespace-nowrap">
                    {[...partnerImages, ...partnerImages, ...partnerImages, ...partnerImages].map((image, index) => (
                        <Image
                            key={`slider1-${index}`}
                            src={`/assets/images/partners/${image}`}
                            alt={`Partner ${index + 1}`}
                            width={100}
                            height={100}
                            className="pointer-events-none mx-8 md:mx-12 lg:mx-20 scale-100 md:scale-125 lg:scale-150 object-contain w-auto h-auto"
                            quality={100}
                        />
                    ))}
                </Marquee>
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-white via-gray-100 to-white rounded-full opacity-100"
                />
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white via-gray-100 to-white rounded-full opacity-100"
                />
            </div>
        </div>
    );
};

export default Partners;
