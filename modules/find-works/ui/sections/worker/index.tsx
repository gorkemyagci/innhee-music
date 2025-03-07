"use client"
import React, { useState } from "react";
import Workers from "./workers";

const Worker = () => {
    const items = [
        "All", "Billboard", "Americamn", "BRIT", "MTV", "Awards"
    ]
    const [active, setActive] = useState(0);
    return (
        <React.Fragment>
            <div className="flex flex-col items-start gap-4 pr-1 w-full">
                <div className="flex items-center w-full justify-between">
                    <p className="text-main-900 font-medium">Worker</p>
                    <div className="flex items-center gap-6 py-0.5">
                        {items.map((item, index) => (
                            <div key={index} className="relative">
                                <span className="text-sub-600 font-medium text-xs">{item}</span>
                                {active === index && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-soft-400" />}
                            </div>
                        ))}
                    </div>
                    <span className="text-sub-600 font-medium text-xs border-b border-sub-600 cursor-pointer">More</span>
                </div>
                <div className="flex flex-col gap-0 w-full">
                    <Workers />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Worker;