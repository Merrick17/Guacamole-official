"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useState } from "react";
const TVChartContainer = dynamic(
    () => import("@/components/common/TradingView/TVChart"),
    {
        ssr: false,
    }
);

const Perceptual = () => {
    const [showCharts, setShowCharts] = useState(false);
    return (
        <>
            <main className="container mx-auto items-center flex flex-col gap-14 px-8 py-6 md:px-16 md:py-12 max-w-[1440px]">
                <div
                    className={cn(
                        "flex w-full z-20  flex-col gap-[10px] rounded-lg bg-foreground px-5 py-7 "
                    )}
                >
                    <div className="flex flex-1  items-center justify-center">
                        <TVChartContainer productSelect={"SOLUSD-PERP"} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Perceptual;
