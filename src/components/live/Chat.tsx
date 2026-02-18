"use client";

import React, { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { Send, User } from 'lucide-react';

export const Chat = ({ classId, userName, userId }: { classId: string; userName: string; userId: string }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const q = query(
            collection(db, 'chats', classId, 'messages'),
            orderBy('createdAt', 'desc'),
            limit(50)
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs.reverse());
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        return () => unsub();
    }, [classId]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        const msg = {
            uid: userId,
            userName: userName,
            text: text,
            createdAt: serverTimestamp(),
        };

        setText('');
        await addDoc(collection(db, 'chats', classId, 'messages'), msg);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold">
                Live Chat
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.uid === userId ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] text-gray-500 mb-1">{msg.userName}</span>
                        <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${msg.uid === userId
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-100 dark:border-gray-700 flex space-x-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};
