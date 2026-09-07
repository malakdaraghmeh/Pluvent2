/* eslint-disable @next/next/no-img-element */
import imagePlaceholder from '@images/default.png';
import React from 'react';

export default function Hero({ image, title }) {
    return (
        <div className="relative w-full min-h-screen lg:h-[560px] overflow-hidden">
            <img
                src={image || imagePlaceholder.src}
                alt="hero"
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms] hover:scale-100"
                onError={e => {
                    e.currentTarget.src = imagePlaceholder.src;
                }}
            />
            {/* Rich layered overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/5 to-black/5" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000]/5 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-20 pb-12 lg:pb-16">
                <div className="max-w-3xl">
                    {title && (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-white text-3xl lg:text-5xl font-bold leading-tight mb-3 drop-shadow-lg">
                                {title}
                            </h1>
                            <div className="w-16 h-1 bg-[#EF8021] rounded-full" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
