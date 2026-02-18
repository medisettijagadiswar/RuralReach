"use client";

import React from 'react';
import { WifiOff, Radio, Download, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'Low Bandwidth Mode',
        description: 'Automatically adjusts to 2G/3G speeds by prioritizing audio and optimizing assets.',
        icon: WifiOff,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
    },
    {
        title: 'Audio-First Live Classes',
        description: 'Real-time interactive sessions that consume minimal data, perfect for remote learning.',
        icon: Radio,
        color: 'text-green-600',
        bg: 'bg-green-100',
    },
    {
        title: 'Offline Downloads',
        description: 'Schedule and download recordings for offline viewing. Resume any time.',
        icon: Download,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
    },
    {
        title: 'Real-time Interaction',
        description: 'Low-latency chat and assessments even on slow networks.',
        icon: MessageSquare,
        color: 'text-red-600',
        bg: 'bg-red-100',
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-h2 font-bold text-gray-900 dark:text-white">Built for Connectivity Gadgets</h2>
                    <p className="text-body text-gray-600 dark:text-gray-400">Everything you need for a seamless educational experience in low-bandwidth areas.</p>
                </div>
                <div className="flex flex-wrap -mx-4">
                    {features.map((feature, index) => (
                        <div key={index} className="w-full px-4 mb-8 md:w-1/2 lg:w-1/4">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="h-full p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition duration-200"
                            >
                                <div className={`inline-flex items-center justify-center mb-6 w-12 h-12 rounded-lg ${feature.bg} ${feature.color}`}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
