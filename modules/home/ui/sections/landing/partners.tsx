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
        <div className="w-full max-w-7xl flex flex-col items-center justify-between gap-16 py-20">
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-neutral-800 text-center text-[3.5rem] leading-[4rem] font-medium">
                    Powers the online experiences you love.
                </h2>
                <p className="text-neutral-500 font-medium text-lg leading-6 max-w-3xl text-center">
                    Unlock seamless music streaming with innovative features. Discover new sounds, connect with artists, and enjoy immersive audio like never before.
                </p>
            </div>
            <div className="w-full flex h-28 items-center gap-40 overflow-hidden relative">
                <Marquee className="flex h-full border-black/10 overflow-hidden items-center whitespace-nowrap">
                    {[...partnerImages, ...partnerImages, ...partnerImages, ...partnerImages].map((image, index) => (
                        <Image
                            key={`slider1-${index}`}
                            src={`/assets/images/partners/${image}`}
                            alt={`Partner ${index + 1}`}
                            width={100}
                            height={100}
                            className="pointer-events-none mx-20 scale-150 object-contain w-auto h-auto"
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
