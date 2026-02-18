"use client";

import React, { useState, useEffect } from 'react';
import { Signal, AlertTriangle, CheckCircle } from 'lucide-react';

export const BandwidthSimulator = () => {
    const [networkType, setNetworkType] = useState('unknown');
    const [simulatedMode, setSimulatedMode] = useState<'standard' | 'low'>('standard');

    useEffect(() => {
        // @ts-ignore
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            setNetworkType(conn.effectiveType);
            if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
                setSimulatedMode('low');
            }
        }
    }, []);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold mb-4 flex items-center">
                <Signal size={18} className="mr-2 text-blue-600" />
                Bandwidth Preview
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Detected Network:</span>
                    <span className="font-bold uppercase text-blue-600">{networkType}</span>
                </div>

                <div className={`p-4 rounded-xl flex items-start space-x-3 ${simulatedMode === 'low' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>
                    {simulatedMode === 'low' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
                    <div>
                        <p className="font-bold text-sm">
                            {simulatedMode === 'low' ? 'Low Bandwidth Optimization Active' : 'Optimal Connectivity'}
                        </p>
                        <p className="text-xs opacity-80">
                            {simulatedMode === 'low'
                                ? 'Video is disabled by default. Audio-only mode recommended.'
                                : 'All features available at high quality.'}
                        </p>
                    </div>
                </div>

                <div className="pt-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Manual Override</label>
                    <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                        <button
                            onClick={() => setSimulatedMode('standard')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${simulatedMode === 'standard' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setSimulatedMode('low')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${simulatedMode === 'low' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}
                        >
                            Low-BW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
