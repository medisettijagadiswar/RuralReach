"use client";

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/layout/Header';
import { BandwidthSimulator } from '@/components/teacher/BandwidthSimulator';
import { ClassScheduler } from '@/components/teacher/ClassScheduler';
import { CRSelection } from '@/components/teacher/CRSelection';
import { PlusCircle, Play, Upload, BarChart3, Users } from 'lucide-react';

const TeacherDashboard = () => {
    return (
        <ProtectedRoute allowedRoles={['teacher']}>
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header onLoginClick={() => { }} />
                <div className="container px-4 py-8 mx-auto">
                    <header className="flex flex-wrap items-center justify-between mb-12">
                        <div>
                            <h1 className="text-h1 font-bold text-gray-900 dark:text-white mb-2">Teacher Panel</h1>
                            <p className="text-body text-gray-500">Manage your classes and content.</p>
                        </div>
                        <button className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                            <PlusCircle size={20} className="mr-2" />
                            Schedule New Class
                        </button>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <ClassScheduler />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { label: 'Active Students', value: '42', icon: Users, color: 'text-blue-600' },
                                    { label: 'Classes Taught', value: '18', icon: BarChart3, color: 'text-green-600' },
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

                        </div>

                        <div className="space-y-8 text-body">
                            <CRSelection />
                            <BandwidthSimulator />
                            <div className="p-8 bg-gray-900 text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition duration-500"></div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Upload Materials</h3>
                                <div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-blue-500/50 transition duration-300">
                                    <Upload size={32} className="mx-auto mb-4 text-gray-500" />
                                    <p className="text-sm text-gray-400">Drag & drop recordings or slides</p>
                                    <button className="mt-4 text-sm font-bold text-blue-400 hover:text-blue-300">Browse Files</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
};

export default TeacherDashboard;
