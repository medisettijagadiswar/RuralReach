"use client";

import React from 'react';

export const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                viewBox="0 0 100 100"
                className="w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Sun/Radiance */}
                <circle cx="50" cy="40" r="15" fill="url(#sun-gradient)" />
                <path
                    d="M50 15V20M50 60V65M75 40H80M20 40H25M67.7 22.3L64.1 25.9M35.9 54.1L32.3 57.7M67.7 57.7L64.1 54.1M35.9 22.3L32.3 25.9"
                    stroke="#FF8C00"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Path/Open Book */}
                <path
                    d="M10 85C30 75 45 85 50 85C55 85 70 75 90 85V45C70 35 55 45 50 45C45 45 30 35 10 45V85Z"
                    fill="#2563EB"
                />
                <path
                    d="M50 45V85"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M10 45C30 35 45 45 50 45M50 45C55 45 70 35 90 45"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                />

                <defs>
                    <linearGradient id="sun-gradient" x1="50" y1="25" x2="50" y2="55" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFB800" />
                        <stop offset="1" stopColor="#FF8C00" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 tracking-tight">
                RuralReach
            </span>
        </div>
    );
};
