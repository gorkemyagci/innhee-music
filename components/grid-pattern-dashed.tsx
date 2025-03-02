"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";

export function GridPatternDashed() {
    return (
        <div className="absolute -z-10 flex size-full top-0 items-center justify-center overflow-hidden rounded-lg bg-background p-20">
            <GridPattern
                width={40}
                height={40}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(100%_500px_at_top,white,transparent)]",
                )}
            />
        </div>
    );
}
