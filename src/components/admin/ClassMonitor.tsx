"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Pause, Play, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const ClassMonitor = () => {
    const [classes, setClasses] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'classes'));
        const unsub = onSnapshot(q, (snapshot) => {
            setClasses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsub();
    }, []);

    const toggleStatus = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
            await updateDoc(doc(db, 'classes', id), { status: newStatus });
            toast.info(`Override: Class ${newStatus}`);
        } catch (error) {
            toast.error("Override failed");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 flex items-center">
                <Activity size={22} className="mr-3 text-red-600" />
                System-wide Class Monitor
            </h3>
            <div className="space-y-4">
                {classes.length === 0 && <p className="text-gray-400 text-center py-4 italic">No sessions currently active.</p>}
                {classes.map(c => (
                    <div key={c.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                        <div>
                            <p className="font-bold text-sm tracking-tight">{c.title}</p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{c.section} • Status: {c.status}</p>
                        </div>
                        <button
                            onClick={() => toggleStatus(c.id, c.status)}
                            className={`p-2 rounded-lg transition ${c.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                            title={c.status === 'active' ? 'Force Suspend' : 'Force Resume'}
                        >
                            {c.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                    </div>
                ))}
            </div>
            {classes.some(c => c.status === 'suspended') && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-xs flex items-center border border-red-100">
                    <AlertCircle size={14} className="mr-2" />
                    Some classes are suspended by Admins or Teachers.
                </div>
            )}
        </div>
    );
};
