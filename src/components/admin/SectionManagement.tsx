"use client";

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Users, Shield, Trash2, Loader2, UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';

export const SectionManagement = () => {
    const [sections, setSections] = useState<any[]>([]);
    const [hods, setHods] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [selectedHod, setSelectedHod] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // Fetch sections
        const qSections = query(collection(db, 'sections'));
        const unsubSections = onSnapshot(qSections, (snapshot) => {
            setSections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Fetch potential HODs/Teachers
        const qHods = query(collection(db, 'users'), where('role', 'in', ['hod', 'teacher']));
        const unsubHods = onSnapshot(qHods, (snapshot) => {
            setHods(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubSections();
            unsubHods();
        };
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !selectedHod) return toast.warning("Please fill all fields");

        setLoading(true);
        try {
            await addDoc(collection(db, 'sections'), {
                name,
                hod: selectedHod,
                studentCount: 0,
                createdAt: new Date().toISOString()
            });
            toast.success("Section created successfully!");
            setName('');
            setSelectedHod('');
            setIsAdding(false);
        } catch (error) {
            toast.error("Failed to create section");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this section?")) return;
        try {
            await deleteDoc(doc(db, 'sections', id));
            toast.info("Section deleted");
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center">
                    <Layers size={22} className="mr-3 text-purple-600" />
                    Sections & Hierarchy
                </h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold rounded-xl hover:bg-purple-100 transition"
                >
                    {isAdding ? <Plus size={18} className="rotate-45" /> : <Plus size={18} />}
                    <span className="ml-2">{isAdding ? 'Cancel' : 'New Section'}</span>
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleCreate} className="mb-10 p-6 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Section Name (e.g. Science - A)"
                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-purple-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <select
                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none"
                            value={selectedHod}
                            onChange={(e) => setSelectedHod(e.target.value)}
                            required
                        >
                            <option value="">Assign HOD/Mentor</option>
                            {hods.map(h => (
                                <option key={h.id} value={h.name}>{h.name} ({h.role.toUpperCase()})</option>
                            ))}
                        </select>
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-purple-600 text-white font-bold rounded-xl py-4 hover:bg-purple-700 transition flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <UserPlus size={18} className="mr-2" />}
                        Create Section
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {sections.length === 0 && !isAdding && (
                    <p className="text-center text-gray-500 py-10">No sections found. Create one to get started.</p>
                )}
                {sections.map(s => (
                    <div key={s.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                        <div>
                            <h4 className="font-bold text-lg">{s.name}</h4>
                            <div className="flex items-center space-x-4 mt-2">
                                <span className="flex items-center text-xs text-gray-500">
                                    <Shield size={12} className="mr-1" /> {s.hod}
                                </span>
                                <span className="flex items-center text-xs text-gray-500">
                                    <Users size={12} className="mr-1" /> {s.studentCount || 0} Students
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="text-sm font-bold text-blue-600 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-400 hover:text-red-600 transition">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
