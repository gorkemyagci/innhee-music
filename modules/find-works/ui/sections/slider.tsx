"use client"

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { slides } from "@/lib/mockData";

const Slider = () => {
    const [api, setApi] = useState<any>(null);
    const [current, setCurrent] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // Check if component is mounted
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Set loading to false once mounted
    useEffect(() => {
        if (isMounted) {
            setIsLoading(false);
        }
    }, [isMounted]);

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [api]);

    useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };
        api.on("select", onSelect);
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);
    
    const scrollTo = (index: number) => {
        if (api) {
            api.scrollTo(index);
        }
    };

    // Don't render anything until component is mounted and loading is complete
    if (isLoading || !isMounted) {
        return null;
    }

    return (
        <div className="relative w-full xl:w-[676px] h-[248px] rounded-2xl">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full h-full"
            >
                <CarouselContent className="h-full rounded-2xl">
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id} className="h-full">
                            <div className="relative xl:max-w-[676px] h-[248px] rounded-2xl overflow-hidden">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-contain translate-x-[35%] scale-200 z-20"
                                />
                                <img 
                                 src="/assets/images/slider-vector.png"
                                 className="absolute bottom-0 right-0 z-10 opacity-10" 
                                />
                                <div className="absolute inset-0 bg-[#253337] z-0 flex flex-col justify-center p-8">
                                    <h2 className="text-[32px] font-medium text-white mb-2">{slide.title}</h2>
                                    <p className="text-[#CDD0D5] text-sm font-medium max-w-[350px] line-clamp-2">{slide.description}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute bottom-14 left-8 flex gap-1 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            current === index ? "bg-white w-4" : "bg-white/30 w-2"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;