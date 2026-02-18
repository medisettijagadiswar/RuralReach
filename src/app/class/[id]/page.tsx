"use client";

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/layout/Header';
import { JitsiMeet } from '@/components/live/JitsiMeet';
import { Chat } from '@/components/live/Chat';
import { useAuth } from '@/contexts/AuthContext';
import { useParams } from 'next/navigation';

const LiveClassPage = () => {
    const { user } = useAuth();
    const params = useParams();
    const classId = params.id as string;
    const [audioOnly, setAudioOnly] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('audioOnly') === 'true';
        setAudioOnly(saved);

        const handleAudioChange = (e: any) => setAudioOnly(e.detail);
        window.addEventListener('audioOnlyChange', handleAudioChange);
        return () => window.removeEventListener('audioOnlyChange', handleAudioChange);
    }, []);

    if (!user) return null;

    return (
        <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
            <main className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                <Header onLoginClick={() => { }} />
                <div className="flex-1 flex overflow-hidden p-4 lg:p-6 gap-4 lg:gap-6 flex-col lg:flex-row">
                    <div className="flex-[3] relative">
                        <JitsiMeet
                            roomName={classId}
                            userName={user.displayName || 'Learner'}
                            audioOnly={audioOnly}
                        />
                    </div>
                    <div className="flex-1 min-w-[320px]">
                        <Chat
                            classId={classId}
                            userName={user.displayName || 'Learner'}
                            userId={user.uid}
                        />
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
};

export default LiveClassPage;
