"use client";

import React, { useState } from 'react';
import { LogIn, Copy, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { Logo } from '@/components/common/Logo';

export const Footer = ({ onQuickLogin }: { onQuickLogin?: (role: string) => void }) => {
    const [copiedRole, setCopiedRole] = useState<string | null>(null);

    const demoCreds = {
        Teacher: { email: 'teacher@rrteam.in', pass: 'Teacher@123' },
        Student: { email: 'student@rrteam.in', pass: 'Student@123' },
        Admin: { email: 'admin@rrteam.in', pass: 'Admin@123' },
    };

    const copyToClipboard = (role: string, email: string, pass: string) => {
        navigator.clipboard.writeText(`${email} / ${pass}`);
        setCopiedRole(role);
        toast.success(`${role} credentials copied!`);
        setTimeout(() => setCopiedRole(null), 2000);
    };

    return (
        <footer className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4 items-center mb-12">
                    <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <a href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                            <Logo />
                        </a>
                        <p className="mt-4 text-gray-500 max-w-sm">Empowering students and teachers in rural areas with low-bandwidth first education tools.</p>
                    </div>
                    <div className="w-full lg:w-2/3 px-4">
                        <div className="flex flex-wrap -mx-2 justify-end">
                            {(Object.entries(demoCreds)).map(([role, creds]) => (
                                <div key={role} className="group relative px-2 mb-4 sm:mb-0">
                                    <div
                                        onClick={() => onQuickLogin?.(role.toLowerCase())}
                                        className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition duration-200 cursor-pointer"
                                    >
                                        <LogIn size={16} className="mr-2 text-blue-600" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Login as {role}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(role, creds.email, creds.pass);
                                            }}
                                            className="ml-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                            title="Copy credentials"
                                        >
                                            {copiedRole === role ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                                        </button>
                                    </div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                                        Demo credentials auto-filled — demo only.
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-4 items-center">
                    <div className="w-full md:w-1/2 px-4">
                        <p className="text-sm text-gray-500">&copy; 2026 RuralReach. All rights reserved.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-4 text-right">
                        <a className="inline-block mr-6 text-sm text-gray-500 hover:text-blue-600 transition" href="/privacy">Privacy Policy</a>
                        <a className="inline-block text-sm text-gray-500 hover:text-blue-600 transition" href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
