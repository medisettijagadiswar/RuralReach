"use client";

import React, { useState } from 'react';
import { Users, UserPlus, Upload, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { db, auth } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const UserManagement = () => {
    const [view, setView] = useState<'individual' | 'bulk'>('individual');
    const [loading, setLoading] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'student' | 'teacher' | 'hod' | 'cr'>('student');
    const [section, setSection] = useState('');

    const handleIndividualAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const tempUid = `user-${Math.random().toString(36).substr(2, 9)}`;
            await setDoc(doc(db, 'users', tempUid), {
                name,
                email,
                role,
                section,
                status: 'pending',
                createdAt: new Date().toISOString(),
            });
            toast.success(`${role} profile created!`);
            setEmail(''); setName(''); setSection('');
        } catch (error) {
            toast.error('Failed to add user');
        } finally {
            setLoading(false);
        }
    };

    const handleBulkAdd = async () => {
        setLoading(true);
        try {
            // Simulate bulk processing
            const dummyUsers = Array.from({ length: 5 }, (_, i) => ({
                name: `Bulk Student ${i + 1}`,
                email: `student${i + 1}@rural.in`,
                role: 'student'
            }));

            for (const user of dummyUsers) {
                const tempUid = `bulk-${Math.random().toString(36).substr(2, 9)}`;
                await setDoc(doc(db, 'users', tempUid), {
                    ...user,
                    status: 'active',
                    createdAt: new Date().toISOString(),
                });
            }
            toast.success('Bulk import successful (Simulated for 5 students)');
        } catch (error) {
            toast.error('Bulk import failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold flex items-center">
                    <Users size={22} className="mr-3 text-blue-600" />
                    User Management
                </h3>
                <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
                    <button
                        onClick={() => setView('individual')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition ${view === 'individual' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                    >
                        Individual
                    </button>
                    <button
                        onClick={() => setView('bulk')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition ${view === 'bulk' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                    >
                        Bulk Import
                    </button>
                </div>
            </div>

            {view === 'individual' ? (
                <form onSubmit={handleIndividualAdd} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Full Name"
                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
                            value={role}
                            onChange={(e) => setRole(e.target.value as any)}
                        >
                            <option value="student" className="bg-white dark:bg-gray-800">Student</option>
                            <option value="teacher" className="bg-white dark:bg-gray-800">Teacher</option>
                            <option value="hod" className="bg-white dark:bg-gray-800">HOD</option>
                            <option value="cr" className="bg-white dark:bg-gray-800">Class Representative</option>
                        </select>
                        <select
                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                        >
                            <option value="">Assign Section (Optional)</option>
                            <option value="Computer Science - Year 1">Computer Science - Year 1</option>
                            <option value="Electronics - Year 2">Electronics - Year 2</option>
                            <option value="Physics - Year 1">Physics - Year 1</option>
                        </select>
                        <button
                            disabled={loading}
                            className="bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-xl py-4 flex items-center justify-center hover:bg-black dark:hover:bg-blue-700 transition"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <UserPlus size={18} className="mr-2" />}
                            Add User Profile
                        </button>
                    </div>
                </form>
            ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="font-bold mb-2">Upload CSV/Excel</p>
                    <p className="text-sm text-gray-500 mb-6">Import 50+ students in one go.</p>
                    <button
                        onClick={handleBulkAdd}
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center mx-auto"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <CheckCircle size={18} className="mr-2" />}
                        Run Sample Bulk Import
                    </button>
                </div>
            )}
        </div>
    );
};
