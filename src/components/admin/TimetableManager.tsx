"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, Plus, Trash2, Loader2, Save, X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const TimetableManager = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const slots = ['09:00', '10:30', '12:00', '14:00'];

    const [timetable, setTimetable] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [day, setDay] = useState('Mon');
    const [time, setTime] = useState('09:00');
    const [subject, setSubject] = useState('');
    const [section, setSection] = useState('Computer Science - Year 1');

    useEffect(() => {
        const q = query(collection(db, 'timetable'));
        const unsub = onSnapshot(q, (snapshot) => {
            setTimetable(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsub();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'timetable'), {
                day,
                time,
                subject,
                section,
                createdAt: new Date().toISOString()
            });
            toast.success("Timetable updated!");
            setSubject('');
            setIsAdding(false);
        } catch (error) {
            toast.error("Failed to save slot");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'timetable', id));
            toast.info("Slot removed");
        } catch (error) {
            toast.error("Remove failed");
        }
    };

    const getSlotContent = (d: string, s: string) => {
        return timetable.filter(t => t.day === d && t.time === s);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center">
                    <Calendar size={22} className="mr-3 text-green-600" />
                    Timetable Scheduler
                </h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold rounded-xl hover:bg-green-100 transition"
                >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    <span className="ml-2">{isAdding ? 'Cancel' : 'Add Slot'}</span>
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSave} className="mb-8 p-6 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-800 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <select
                            className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                        >
                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select
                            className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        >
                            {slots.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <input
                            placeholder="Subject"
                            className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <input
                            placeholder="Section"
                            className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-bold rounded-xl py-3 hover:bg-green-700 transition flex items-center justify-center text-sm"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                        Save Schedule Slot
                    </button>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-gray-100 dark:border-gray-700 font-bold text-gray-400 uppercase text-xs">Time</th>
                            {days.map(d => (
                                <th key={d} className="p-4 border-b border-gray-100 dark:border-gray-700 font-bold text-gray-400 uppercase text-xs">{d}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map(s => (
                            <tr key={s}>
                                <td className="p-4 border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-500">{s}</td>
                                {days.map(d => {
                                    const slotsAtTime = getSlotContent(d, s);
                                    return (
                                        <td key={d + s} className="p-2 border-b border-gray-100 dark:border-gray-700 min-w-32">
                                            {slotsAtTime.length > 0 ? (
                                                <div className="space-y-2">
                                                    {slotsAtTime.map(slot => (
                                                        <div key={slot.id} className="group relative p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 text-center">
                                                            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">{slot.subject}</p>
                                                            <p className="text-[8px] text-gray-400 truncate">{slot.section}</p>
                                                            <button
                                                                onClick={() => handleDelete(slot.id)}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg scale-75"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="h-10 border-2 border-dashed border-gray-50 dark:border-gray-800 rounded-lg"></div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
