"use client";

import React, { useState } from 'react';
import { seedDemoData } from '@/lib/seed';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SeedPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSeed = async () => {
        setStatus('loading');
        setMessage('Starting...');
        const success = await seedDemoData((msg) => setMessage(msg));
        if (success) {
            setStatus('success');
            setMessage('Auth accounts created and Firestore seeded successfully!');
        } else {
            setStatus('error');
            // Message is already set by the progress callback in case of failure
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
                <h1 className="text-2xl font-bold mb-6">Initialize RuralReach</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    This will create the demo accounts (Teacher, Student, Admin) in Firebase Auth and set up the initial Firestore data.
                </p>

                {status === 'idle' && (
                    <button
                        onClick={handleSeed}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
                    >
                        Start Seeding Data
                    </button>
                )}

                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                        <p className="font-medium uppercase text-xs tracking-widest text-gray-500 mb-2">Please Wait</p>
                        <p className="font-bold text-blue-600">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle2 className="text-green-500 mb-4" size={48} />
                        <p className="font-bold text-green-600 mb-4">{message}</p>
                        <a href="/" className="text-blue-600 font-bold hover:underline">Go to Home & Login</a>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <AlertCircle className="text-red-500 mb-4" size={48} />
                        <p className="font-bold text-red-600 mb-4">{message}</p>
                        <button onClick={() => setStatus('idle')} className="text-blue-600 font-bold">Try Again</button>
                    </div>
                )}
            </div>
        </div>
    );
}
