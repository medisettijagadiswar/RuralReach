"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <Header onLoginClick={() => { }} />
            <div className="container px-4 py-20 mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-2xl">
                        <FileText size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By using RuralReach, you agree to comply with these terms. The platform is intended for educational use by students and faculty in rural areas.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. User Conduct</h2>
                        <p>Users must use the platform respectfully. Any misuse of live class features or chat will result in immediate suspension of the account by the administrator.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Intellectual Property</h2>
                        <p>All learning materials provided through RuralReach remain the property of their respective creators or institutions. Personal use for learning is allowed; commercial distribution is prohibited.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Limitation of Liability</h2>
                        <p>While we strive for 100% uptime, RuralReach is provided "as is". We are not liable for any disruptions caused by local internet connectivity issues.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
