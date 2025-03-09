"use client"
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Price = () => {
    const [priceRange, setPriceRange] = useState([300, 700]);
    const minPrice = 0;
    const maxPrice = 1000;

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    // Format price display
    const formatPrice = (price: number) => {
        if (price === maxPrice) return `+$${price}`;
        return `$${price}`;
    };

    return (
        <div className="flex flex-col items-start gap-4">
            <span className="text-strong-950 font-medium text-sm">Price</span>
            
            <div className="w-full relative pt-8 pb-2">
                {/* Price Tooltips */}
                <div className="absolute -top-3 left-0 w-full">
                    <div 
                        className="absolute transform -translate-x-1/2"
                        style={{ 
                            left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%` 
                        }}
                    >
                        <div className="bg-strong-950 text-white px-3 py-1 rounded-md translate-x-1 text-xs font-normal relative">
                        {formatPrice(priceRange[0])}
                            <div className="absolute w-2 h-2 bg-strong-950 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                    </div>
                    
                    <div 
                        className="absolute transform -translate-x-1/2"
                        style={{ 
                            left: `${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%` 
                        }}
                    >
                        <div className="bg-strong-950 text-white px-3 py-1 -translate-x-1 rounded-md text-xs font-normal relative">
                        {formatPrice(priceRange[1])}
                            <div className="absolute w-2 h-2 bg-strong-950 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2"></div>
                        </div>
                    </div>
                </div>
                
                {/* Slider */}
                <div className="price-slider-container">
                    <Slider
                        defaultValue={priceRange}
                        min={minPrice}
                        max={maxPrice}
                        step={10}
                        onValueChange={handlePriceChange}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Custom Styling */}
            <style jsx global>{`
                /* Make the track thicker */
                .price-slider-container [data-orientation="horizontal"] {
                    height: 8px;
                }
                 
                /* Style the range (selected area) */
                .price-slider-container [data-orientation="horizontal"] > div {
                    background-color: #64748b;
                }
                
                /* Style the thumb (handle) */
                .price-slider-container [role="slider"] {
                    height: 24px;
                    width: 24px;
                    background: white;
                    border: 2px solid #e2e8f0;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    top: 50%;
                    transform: translateY(0%);
                }
                
                /* Add inner dot to thumb */
                .price-slider-container [role="slider"]::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    background-color: #525866;
                    border-radius: 50%;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Price;