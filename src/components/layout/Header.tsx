"use client";

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, User } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export const Header = ({ onLoginClick }: { onLoginClick: () => void }) => {
    const { user, role } = useAuth();
    const [audioOnly, setAudioOnly] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('audioOnly') === 'true';
        setAudioOnly(saved);
    }, []);

    const toggleAudio = () => {
        const newVal = !audioOnly;
        setAudioOnly(newVal);
        localStorage.setItem('audioOnly', newVal.toString());
        window.dispatchEvent(new CustomEvent('audioOnlyChange', { detail: newVal }));
    };

    return (
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="container px-4 mx-auto flex items-center justify-between h-20">
                <a href="/" className="hover:opacity-80 transition-opacity">
                    <Logo />
                </a>

                <div className="hidden lg:flex items-center space-x-8">
                    <a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium" href="/features">Features</a>
                    <a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium" href="/about">About</a>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

                    <button
                        onClick={toggleAudio}
                        className={`flex items-center px-3 py-1.5 rounded-full transition ${audioOnly ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}
                        title={audioOnly ? 'Audio Only Mode ON' : 'Standard Mode'}
                    >
                        {audioOnly ? <VolumeX size={18} className="mr-2" /> : <Volume2 size={18} className="mr-2" />}
                        <span className="text-sm font-bold uppercase tracking-wider">{audioOnly ? 'Data Saver' : 'Standard'}</span>
                    </button>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <a href={`/${role}`} className="flex items-center text-blue-600 font-bold px-4 py-2 bg-blue-50 rounded-lg">
                                <User size={18} className="mr-2" />
                                Dashboard
                            </a>
                            <button onClick={() => signOut(auth)} className="text-gray-500 hover:text-red-600 transition">Logout</button>
                        </div>
                    ) : (
                        <button onClick={onLoginClick} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
                            Login
                        </button>
                    )}
                </div>

                <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 space-y-4">
                    <a className="block py-2 text-gray-600 dark:text-gray-300 font-medium" href="#features">Features</a>
                    <button
                        onClick={toggleAudio}
                        className="flex items-center w-full py-2 text-blue-600 font-medium"
                    >
                        {audioOnly ? <VolumeX size={18} className="mr-2" /> : <Volume2 size={18} className="mr-2" />}
                        {audioOnly ? 'Disable Data Saver' : 'Enable Data Saver'}
                    </button>
                    {!user && (
                        <button onClick={onLoginClick} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg">
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};
