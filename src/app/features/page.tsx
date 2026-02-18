"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Play, Download, Settings, BarChart } from 'lucide-react';

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header onLoginClick={() => { }} />

            <section className="py-24">
                <div className="container px-4 mx-auto">
                    <h1 className="text-h1 font-bold text-center mb-16 text-body">Powerful Features for Rural Learning</h1>

                    <div className="flex flex-col items-center gap-24">
                        {[
                            { title: 'Audio-First Live Classes', desc: 'Instantly swap between video and ultra-low-bandwidth audio modes.', icon: Play, image: 'https://images.unsplash.com/photo-1598128558393-70ff21430be0?auto=format&fit=crop&q=80&w=1200' },
                            { title: 'Offline Recording Vault', desc: 'Download entire semesters to your SD card. Playback without internet.', icon: Download, image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200' },
                            { title: 'Dynamic UI Scaling', desc: 'Admin-controlled typography for accessibility on all screen sizes.', icon: Settings, image: 'https://images.unsplash.com/photo-1551218808-94e220e03498?auto=format&fit=crop&q=80&w=1200' },
                        ].map((f, i) => (
                            <div key={i} className="flex flex-col items-center text-center max-w-4xl space-y-8">
                                <div className="space-y-6">
                                    <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                        <f.icon size={32} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{f.title}</h2>
                                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">{f.desc}</p>
                                </div>
                                <div className="w-full">
                                    <img
                                        src={f.image}
                                        alt={f.title}
                                        className="rounded-[40px] shadow-2xl w-full aspect-video object-cover border-8 border-white dark:border-gray-800"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
