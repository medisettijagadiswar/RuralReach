"use client";

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const CRSelection = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'users'), where('role', 'in', ['student', 'cr']));
        const unsub = onSnapshot(q, (snapshot) => {
            setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsub();
    }, []);

    const toggleCR = async (uid: string, currentRole: string) => {
        setLoading(true);
        try {
            const newRole = currentRole === 'cr' ? 'student' : 'cr';
            await updateDoc(doc(db, 'users', uid), { role: newRole });
            toast.success(`User updated to ${newRole.toUpperCase()}!`);
        } catch (error) {
            toast.error("Role update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 flex items-center">
                <Star size={22} className="mr-3 text-yellow-500 fill-yellow-500" />
                Assign Class Representatives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map(s => (
                    <div key={s.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${s.role === 'cr' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-500'}`}>
                                <Shield size={16} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{s.name}</p>
                                <p className="text-[10px] text-gray-400 capitalize bg-gray-100 dark:bg-gray-800 px-1 rounded inline-block">{s.role}</p>
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            onClick={() => toggleCR(s.id, s.role)}
                            className={`text-xs font-bold px-4 py-2 rounded-xl transition ${s.role === 'cr' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'}`}
                        >
                            {s.role === 'cr' ? 'Remove CR' : 'Promote to CR'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
