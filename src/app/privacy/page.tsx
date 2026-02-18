"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <Header onLoginClick={() => { }} />
            <div className="container px-4 py-20 mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-2xl">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
                        <p>RuralReach collects minimal data to facilitate learning: Name, Email, and educational progress. We also collect basic interaction data to optimize app performance in low-bandwidth areas.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Data</h2>
                        <p>We use your data strictly for academic purposes: connecting you to live classes, managing downloads, and providing faculty support. We do not sell or trade your personal information.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Security</h2>
                        <p>Your data is secured using high-level encryption via Firebase services. Local data is stored on your device's IndexedDB for offline access and is never shared across apps.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your data at any time through your dashboard or by contacting the system administrator.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
