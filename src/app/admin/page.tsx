"use client";

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TypographyControls } from '@/components/admin/TypographyControls';
import { UserManagement } from '@/components/admin/UserManagement';
import { SectionManagement } from '@/components/admin/SectionManagement';
import { TimetableManager } from '@/components/admin/TimetableManager';
import { ClassMonitor } from '@/components/admin/ClassMonitor';
import { Users, GraduationCap, School, Layers } from 'lucide-react';
import { Header } from '@/components/layout/Header';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Students', value: '1,240', icon: GraduationCap, color: 'text-blue-600' },
        { label: 'Total Teachers', value: '45', icon: Users, color: 'text-green-600' },
        { label: 'Colleges', value: '12', icon: School, color: 'text-purple-600' },
        { label: 'Recordings', value: '320', icon: Layers, color: 'text-orange-600' },
    ];

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header onLoginClick={() => { }} />
                <div className="container px-4 py-8 mx-auto">
                    <header className="mb-12">
                        <h1 className="text-h1 font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                        <p className="text-body text-gray-500">Global system overview and configurations.</p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className={`p-3 rounded-xl inline-block mb-4 bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">{stat.label}</h4>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <SectionManagement />
                        <TimetableManager />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2">
                            <UserManagement />
                        </div>
                        <ClassMonitor />
                    </div>

                    <TypographyControls />
                </div>
            </main>
        </ProtectedRoute>
    );
};

export default AdminDashboard;
