"use client";

import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, Search, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

export const CRSelection = () => {
    const { userData } = useAuth();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            if (!userData?.section) return;
            try {
                const q = query(
                    collection(db, 'users'),
                    where('role', 'in', ['student', 'cr']),
                    where('section', '==', userData.section)
                );
                const snapshot = await getDocs(q);
                setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, [userData]);

    const handlePromote = async (studentId: string, currentRole: string) => {
        setLoading(true);
        try {
            const newRole = currentRole === 'cr' ? 'student' : 'cr';
            await updateDoc(doc(db, 'users', studentId), {
                role: newRole
            });
            toast.success(`Role updated successfully!`);
            setStudents(prev => prev.map(s => s.id === studentId ? { ...s, role: newRole } : s));
        } catch (error) {
            toast.error('Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter(s =>
        (s.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (s.email?.toLowerCase() || '').includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold mb-6 flex items-center">
                <Users size={18} className="mr-2 text-blue-600" />
                Select Class Representative
            </h3>

            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    placeholder="Search students in your section..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {filteredStudents.length === 0 ? (
                    <p className="text-center text-gray-400 py-4 text-sm">No students found.</p>
                ) : (
                    filteredStudents.map((s) => (
                        <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${s.role === 'cr' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}>
                                    {s.name ? s.name[0] : '?'}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{s.name}</p>
                                    <p className="text-xs text-gray-500">{s.role === 'cr' ? 'Current CR' : 'Student'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handlePromote(s.id, s.role)}
                                disabled={loading}
                                className={`p-2 rounded-xl transition ${s.role === 'cr' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
                                title={s.role === 'cr' ? 'Demote to Student' : 'Promote to CR'}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
