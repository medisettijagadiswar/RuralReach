"use client";

import React, { useState, useEffect } from 'react';
import { get, set, del } from 'idb-keyval';
import { Download, Play, Trash2, Pause, RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';

interface DownloadItem {
    id: string;
    title: string;
    url: string;
    size: number;
    progress: number;
    status: 'downloading' | 'completed' | 'paused';
    blob?: Blob;
}

export const DownloadManager = () => {
    const [downloads, setDownloads] = useState<DownloadItem[]>([]);

    useEffect(() => {
        const loadDownloads = async () => {
            const saved = await get('downloads') || [];
            setDownloads(saved);
        };
        loadDownloads();
    }, []);

    const saveToIdb = async (items: DownloadItem[]) => {
        await set('downloads', items);
        setDownloads(items);
    };

    const startDownload = async (item: Omit<DownloadItem, 'progress' | 'status'>) => {
        const newDownload: DownloadItem = { ...item, progress: 0, status: 'downloading' };
        const updated = [...downloads, newDownload];
        await saveToIdb(updated);

        try {
            const response = await fetch(item.url);
            const reader = response.body?.getReader();
            const contentLength = +(response.headers.get('Content-Length') || 0);

            let receivedLength = 0;
            let chunks = [];

            while (true) {
                const result = await reader?.read();
                if (result?.done) break;

                chunks.push(result?.value);
                receivedLength += result?.value?.length || 0;

                const progress = Math.round((receivedLength / contentLength) * 100);
                setDownloads(prev => prev.map(d => d.id === item.id ? { ...d, progress } : d));
            }

            const blob = new Blob(chunks as any);
            const finishedDownload: DownloadItem = { ...newDownload, progress: 100, status: 'completed', blob };

            const finalItems = downloads.map(d => d.id === item.id ? finishedDownload : d);
            await saveToIdb(finalItems);
            toast.success(`${item.title} downloaded successfully!`);

        } catch (error) {
            toast.error('Download failed. Check your connection.');
            setDownloads(prev => prev.map(d => d.id === item.id ? { ...d, status: 'paused' } : d));
        }
    };

    const removeDownload = async (id: string) => {
        const updated = downloads.filter(d => d.id !== id);
        await saveToIdb(updated);
        toast.info('Recording removed.');
    };

    const playRecording = (item: DownloadItem) => {
        if (!item.blob) return;
        const url = URL.createObjectURL(item.blob);
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6 flex items-center">
                <Download size={20} className="mr-2 text-blue-600" />
                My Downloads
            </h3>

            {downloads.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No downloads found. Start by joining a class!</p>
            ) : (
                <div className="space-y-4">
                    {downloads.map(d => (
                        <div key={d.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-sm truncate max-w-[200px]">{d.title}</span>
                                <div className="flex space-x-2">
                                    {d.status === 'completed' ? (
                                        <button onClick={() => playRecording(d)} className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                                            <Play size={16} />
                                        </button>
                                    ) : (
                                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                            <Pause size={16} />
                                        </button>
                                    )}
                                    <button onClick={() => removeDownload(d.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${d.status === 'completed' ? 'bg-green-500' : 'bg-blue-600'}`}
                                    style={{ width: `${d.progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-gray-500 uppercase">{d.status}</span>
                                <span className="text-[10px] text-gray-500">{d.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
