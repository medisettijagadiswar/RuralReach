"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const LoginModal = ({
    isOpen,
    onClose,
    prefill
}: {
    isOpen: boolean;
    onClose: () => void;
    prefill?: { email: string; pass: string }
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (prefill) {
            setEmail(prefill.email);
            setPassword(prefill.pass);
        }
    }, [prefill]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));

            if (userDoc.exists()) {
                const userRole = userDoc.data().role;
                toast.success(`Logged in as ${userRole}!`);
                onClose();

                // Role-based redirection
                switch (userRole) {
                    case 'admin': router.push('/admin'); break;
                    case 'teacher': router.push('/teacher'); break;
                    case 'hod': router.push('/hod'); break;
                    case 'student':
                    case 'cr':
                        router.push('/student');
                        break;
                    default:
                        router.push('/');
                }
            } else {
                toast.success('Logged in successfully!');
                onClose();
            }
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            placeholder="teacher@rrteam.in"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            id="login-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
                                </button>
                            </form>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 text-center border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500">Need help? Contact support@ruralreach.in</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
