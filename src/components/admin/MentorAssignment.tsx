"use client";

import React, { useState, useEffect } from 'react';
import { GraduationCap, ArrowRight, UserCheck, Search, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const MentorAssignment = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const sq = query(collection(db, 'users'), where('role', '==', 'student'));
            const tq = query(collection(db, 'users'), where('role', '==', 'teacher'));

            const [ss, ts] = await Promise.all([getDocs(sq), getDocs(tq)]);
            setStudents(ss.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setTeachers(ts.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchData();
    }, []);

    const handleAssign = async () => {
        if (!selectedStudent || !selectedTeacher) return;
        setLoading(true);
        try {
            await updateDoc(doc(db, 'users', selectedStudent), {
                mentorId: selectedTeacher,
                mentorName: teachers.find(t => t.id === selectedTeacher)?.name
            });
            toast.success('Mentor assigned successfully!');
            setSelectedStudent(null);
            setSelectedTeacher(null);
        } catch (error) {
            toast.error('Assignment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 flex items-center">
                <GraduationCap size={22} className="mr-3 text-purple-600" />
                Mentor Assignment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-3">Select Student</label>
                    <select
                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none"
                        value={selectedStudent || ''}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Choose Student...</option>
                        {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.section || 'No Section'})</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-500 mb-3">Select Mentor (Teacher)</label>
                    <select
                        className="w-full p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none"
                        value={selectedTeacher || ''}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        <option value="">Choose Teacher...</option>
                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>
            </div>

            <button
                onClick={handleAssign}
                disabled={loading || !selectedStudent || !selectedTeacher}
                className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition flex items-center justify-center disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <UserCheck size={20} className="mr-2" />}
                Confirm Assignment
            </button>
        </div>
    );
};
