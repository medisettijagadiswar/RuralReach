"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Play, Pause, Trash2, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, onSnapshot, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const ClassScheduler = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [section, setSection] = useState('Computer Science - Year 1');

    useEffect(() => {
        const q = query(collection(db, 'classes'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(data);
        });
        return () => unsub();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'classes'), {
                title,
                section,
                status: 'active',
                createdAt: new Date().toISOString(),
                startTime: new Date().toLocaleTimeString(),
            });
            toast.success("Class scheduled successfully!");
            setTitle('');
        } catch (error) {
            toast.error("Failed to schedule class");
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
            await updateDoc(doc(db, 'classes', id), { status: newStatus });
            toast.info(`Class ${newStatus === 'active' ? 'Resumed' : 'Suspended'}`);
        } catch (error) {
            toast.error("Status update failed");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 flex items-center">
                <Calendar size={22} className="mr-3 text-orange-600" />
                Schedule Live Class
            </h3>

            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <input
                    placeholder="Class Title (e.g. Intro to Algebra)"
                    className="md:col-span-1 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <select
                    className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option className="bg-white dark:bg-gray-800">Computer Science - Year 1</option>
                    <option className="bg-white dark:bg-gray-800">Electronics - Year 2</option>
                    <option className="bg-white dark:bg-gray-800">Physics - Year 1</option>
                </select>
                <button
                    disabled={loading}
                    className="bg-orange-600 text-white font-bold rounded-xl py-4 hover:bg-orange-700 transition flex items-center justify-center"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Plus size={18} className="mr-2" />}
                    Create Class
                </button>
            </form>

            <div className="space-y-4">
                <p className="font-bold text-sm text-gray-400 uppercase tracking-widest">Ongoing & Scheduled</p>
                {classes.map(c => (
                    <div key={c.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${c.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            <div>
                                <h4 className="font-bold">{c.title}</h4>
                                <p className="text-xs text-gray-500">{c.section} • {c.startTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => toggleStatus(c.id, c.status)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center ${c.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                            >
                                {c.status === 'active' ? <Pause size={14} className="mr-2" /> : <Play size={14} className="mr-2" />}
                                {c.status === 'active' ? 'Suspend' : 'Resume'}
                            </button>
                            <button onClick={() => deleteDoc(doc(db, 'classes', c.id))} className="p-2 text-gray-400 hover:text-red-600 transition">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
