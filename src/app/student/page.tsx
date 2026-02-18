"use client";

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/layout/Header';
import { DownloadManager } from '@/components/student/DownloadManager';
import { BookOpen, Video, Download, MessageSquare, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const StudentDashboard = () => {
    const [classes, setClasses] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'classes'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(data);
        });
        return () => unsub();
    }, []);

    return (
        <ProtectedRoute allowedRoles={['student', 'cr']}>
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header onLoginClick={() => { }} />
                <div className="container px-4 py-8 mx-auto">
                    <header className="mb-12">
                        <h1 className="text-h1 font-bold text-gray-900 dark:text-white mb-2">My Learning Space</h1>
                        <p className="text-body text-gray-500">Track your progress and join live sessions.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Active Classes</h3>
                                {classes.filter(c => c.status === 'active').length === 0 && (
                                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center text-gray-400">
                                        No active classes right now. Enjoy your break!
                                    </div>
                                )}
                                {classes.filter(c => c.status === 'active').map((cls) => (
                                    <div key={cls.id} className="p-8 bg-blue-600 rounded-2xl text-white shadow-xl flex flex-wrap items-center justify-between">
                                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                            <div className="p-3 bg-white/20 rounded-xl">
                                                <Video size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl">{cls.title}</h4>
                                                <p className="text-blue-100 text-sm">Started at {cls.startTime} • {cls.section}</p>
                                            </div>
                                        </div>
                                        <a href={`/class/${cls.id}`} className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition uppercase tracking-wider">
                                            Join Now
                                        </a>
                                    </div>
                                ))}
                                {classes.some(c => c.status === 'suspended') && (
                                    <div className="p-4 bg-orange-50 text-orange-700 rounded-xl text-xs font-bold border border-orange-100 flex items-center">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                        Some planned sessions are currently suspended.
                                    </div>
                                )}
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Recordings</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                            <h4 className="font-bold mb-2">Physics Lecture {i}</h4>
                                            <p className="text-sm text-gray-500 mb-4">Uploaded 2 days ago • 14MB</p>
                                            <button className="flex items-center text-blue-600 font-bold text-sm">
                                                <Download size={16} className="mr-2" />
                                                Download for Offline
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="space-y-8 text-body">
                            <DownloadManager />
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold mb-4 flex items-center">
                                    <MessageSquare size={18} className="mr-2 text-blue-600" />
                                    Ask a Doubt
                                </h3>
                                <textarea
                                    className="w-full p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 mb-4 h-32 outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your question here..."
                                ></textarea>
                                <button className="w-full py-3 bg-gray-900 dark:bg-blue-700 text-white font-bold rounded-xl transition">
                                    Submit Question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
};

export default StudentDashboard;
