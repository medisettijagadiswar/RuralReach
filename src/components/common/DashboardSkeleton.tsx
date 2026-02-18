"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const DashboardSkeleton = () => {
    return (
        <div className="animate-pulse space-y-8">
            <header className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl w-full"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl w-full"></div>
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl w-full"></div>
                </div>
            </div>
        </div>
    );
};
