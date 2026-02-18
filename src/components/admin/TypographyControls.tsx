"use client";

import React, { useState } from 'react';
import { useTypography } from '@/contexts/TypographyContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { Save, RefreshCcw } from 'lucide-react';

export const TypographyControls = () => {
    const settings = useTypography();
    const [localSettings, setLocalSettings] = useState(settings);

    const handleSave = async () => {
        try {
            await updateDoc(doc(db, 'settings', 'typography'), localSettings as any);
            toast.success('Typography settings updated globally!');
        } catch (error) {
            toast.error('Failed to update settings');
        }
    };

    return (
        <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Global Typography Control</h3>
                <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                    <Save size={18} className="mr-2" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Global Scale Multiplier ({localSettings.scale}x)
                        </label>
                        <input
                            type="range" min="0.8" max="1.5" step="0.05"
                            value={localSettings.scale}
                            onChange={(e) => setLocalSettings({ ...localSettings, scale: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">H1 Size (rem)</label>
                        <input
                            type="text"
                            value={localSettings.h1}
                            onChange={(e) => setLocalSettings({ ...localSettings, h1: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300">
                    <span className="text-xs font-bold uppercase text-gray-400 block mb-4">Live Preview</span>
                    <h1 className="text-h1 font-bold mb-4">Headline Level 1</h1>
                    <h2 className="text-h2 font-bold mb-4">Headline Level 2</h2>
                    <p className="text-body text-gray-600 dark:text-gray-400">
                        This is how your body text will look across the platform. Real-time updates active.
                    </p>
                </div>
            </div>
        </div>
    );
};
