"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header onLoginClick={() => { }} />

            {/* Mission Section */}
            <section className="py-24 bg-white dark:bg-gray-800">
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h1 className="text-h1 font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                            Empowering Every Village
                        </h1>
                        <p className="max-w-3xl mx-auto text-xl text-gray-500 leading-relaxed">
                            RuralReach was built to solve a specific problem: students in remote areas are often left behind by modern "high-speed" edtech. We provide the bridge.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, title: 'Inclusivity', desc: 'Designed for 2G/3G networks, ensuring every student has a voice.', color: 'bg-red-50 text-red-600' },
                            { icon: Globe, title: 'Global Standards', desc: 'Bringing world-class curriculum to local contexts and languages.', color: 'bg-blue-50 text-blue-600' },
                            { icon: ShieldCheck, title: 'True Ownership', desc: 'Download material once, own it forever on your local device.', color: 'bg-green-50 text-green-600' },
                        ].map((f, i) => (
                            <div key={i} className="p-8 rounded-[32px] border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                                <p className="text-gray-500">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl font-bold">The RuralReach Story</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                It started in a small village school where the internet was just a rumor. We saw students walking miles to get a signal just to download a single PDF.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-600 shrink-0" />
                                    <p className="text-gray-600 dark:text-gray-400">Developed a custom audio codec that uses 90% less data than Zoom.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-600 shrink-0" />
                                    <p className="text-gray-600 dark:text-gray-400">Built an offline recording vault that fits on the cheapest SD cards.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-600 shrink-0" />
                                    <p className="text-gray-600 dark:text-gray-400">Created RuralReach to be a platform, not just an app.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1509062522246-37359ec3113d?auto=format&fit=crop&q=80&w=1000"
                                className="relative z-10 rounded-[40px] shadow-2xl border-8 border-white dark:border-gray-800"
                                alt="Rural Education"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-24 bg-white dark:bg-gray-800">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-16">Our Impact So Far</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Students Reached', value: '45,000+' },
                            { label: 'Villages Connected', value: '1,200+' },
                            { label: 'Data Saved', value: '850 TB' },
                            { label: 'Active Teachers', value: '2,500+' },
                        ].map((s, i) => (
                            <div key={i} className="space-y-2">
                                <p className="text-5xl font-black text-blue-600">{s.value}</p>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
