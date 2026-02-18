"use client";

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/layout/Header';
import { Users, BookOpen, BarChart3, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardSkeleton } from '@/components/common/DashboardSkeleton';

const HODDashboard = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header onLoginClick={() => { }} />
                <div className="container px-4 py-8 mx-auto">
                    <DashboardSkeleton />
                </div>
            </main>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['hod']}>
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header onLoginClick={() => { }} />
                <div className="container px-4 py-8 mx-auto">
                    <header className="mb-12">
                        <h1 className="text-h1 font-bold text-gray-900 dark:text-white mb-2">HOD Dashboard</h1>
                        <p className="text-body text-gray-600 dark:text-gray-400 font-medium">Department Oversight & Academic Management</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'Total Students', value: '450', icon: Users, color: 'text-blue-600' },
                            { label: 'Faculties', value: '12', icon: BookOpen, color: 'text-green-600' },
                            { label: 'Active Classes', value: '8', icon: BarChart3, color: 'text-purple-600' },
                            { label: 'Pending Issues', value: '3', icon: AlertTriangle, color: 'text-orange-600' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
                                <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <section className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-6">Faculty Performance Overview</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">F{i}</div>
                                                <div>
                                                    <p className="font-bold">Prof. Name {i}</p>
                                                    <p className="text-xs text-gray-500">Last Class: 2 hours ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm font-bold text-green-600">
                                                98% Attendance
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="space-y-8">
                            <section className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h3 className="font-bold mb-4">Department Alerts</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-orange-50 text-orange-700 rounded-xl text-sm border border-orange-100">
                                        <p className="font-bold">Class Canceled</p>
                                        <p className="opacity-80">Prof. Sharma canceled Algebra (10:30 AM).</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm border border-blue-100">
                                        <p className="font-bold">New Material</p>
                                        <p className="opacity-80">Physics department uploaded 12 new PDFs.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
};

export default HODDashboard;
