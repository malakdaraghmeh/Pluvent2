'use client';

import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface CustomCarouselProps {
    lang?: string;
    children: React.ReactNode[];
    showArrows?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    className?: string;
    itemClassName?: string;
    delay?: number;
}

export default function CustomCarousel({
    lang = "ar",
    children,
    showArrows = true,
    autoplay = true,
    loop = true,
    className = "",
    itemClassName = "", // used to control basis e.g. "basis-1/3" or "md:basis-1/2 lg:basis-1/3"
    delay = 2500,
}: CustomCarouselProps) {
    const isRtl = lang === "ar";

    // We create the plugin outside so it doesn't get recreated every render
    const plugins = React.useMemo(() => {
        return autoplay ? [Autoplay({ delay, stopOnInteraction: true })] : [];
    }, [autoplay, delay]);

    return (
        <div className="w-full relative px-12" dir={isRtl ? "rtl" : "ltr"}>
            <Carousel
                opts={{
                    loop: loop,
                    direction: isRtl ? "rtl" : "ltr",
                    align: "start",
                }}
                plugins={plugins}
                className={`w-full ${className}`}
            >
                <CarouselContent>
                    {React.Children.map(children, (child, index) => (
                        <CarouselItem key={index} className={itemClassName}>
                            {child}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {showArrows && (
                    <>
                        <CarouselPrevious className="absolute -left-2 md:-left-8" />
                        <CarouselNext className="absolute -right-2 md:-right-8" />
                    </>
                )}
            </Carousel>
        </div>
    );
}
