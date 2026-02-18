"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Rajesh Kumar",
        role: "Rural Student",
        quote: "RuralReach changed my life. I can now attend classes even with my slow internet connection.",
        avatar: "https://i.pravatar.cc/150?u=rajesh"
    },
    {
        name: "Priya Sharma",
        role: "Village Teacher",
        quote: "Managing classes and recordings has never been easier. The audio-first feature is a lifesaver.",
        avatar: "https://i.pravatar.cc/150?u=priya"
    },
    {
        name: "Sunil Verma",
        role: "College Admin",
        quote: "The ability to control typography and monitor student progress in real-time is amazing.",
        avatar: "https://i.pravatar.cc/150?u=sunil"
    }
];

export const Testimonials = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="container px-4 mx-auto">
                <h2 className="mb-16 text-h2 font-bold text-center text-gray-900 dark:text-white">Voices from our Community</h2>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {testimonials.map((t, i) => (
                            <div key={i} className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 h-full bg-gray-50 dark:bg-gray-800 rounded-2xl"
                                >
                                    <p className="mb-8 text-gray-600 dark:text-gray-400 italic">"{t.quote}"</p>
                                    <div className="flex items-center">
                                        <img className="w-12 h-12 rounded-full mr-4" src={t.avatar} alt={t.name} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                            <p className="text-sm text-gray-500">{t.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
