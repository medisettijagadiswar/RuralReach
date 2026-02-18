"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-white dark:bg-gray-900">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap items-center -mx-4">
                    <div className="w-full px-4 mb-16 lg:w-1/2 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="mb-6 text-h1 font-bold leading-tight text-gray-900 dark:text-white">
                                Empowering Rural Education Through <span className="text-blue-600">Connectivity</span>
                            </h1>
                            <p className="mb-8 text-body text-gray-600 dark:text-gray-400">
                                Low-bandwidth friendly live classes, offline downloads, and real-time interaction for students and teachers in remote areas.
                            </p>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full px-2 mb-4 sm:w-auto sm:mb-0">
                                    <a className="inline-block w-full px-8 py-4 text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200" href="/login">
                                        Get Started
                                    </a>
                                </div>
                                <div className="w-full px-2 sm:w-auto">
                                    <a className="inline-block w-full px-8 py-4 text-center text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition duration-200" href="#features">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-full px-4 lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative max-w-lg mx-auto lg:mr-0"
                        >
                            <img className="relative z-10 rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Rural Education" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                            <div className="absolute top-0 -right-4 w-40 h-40 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
