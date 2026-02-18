"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface TypographySettings {
    h1: string;
    h2: string;
    body: string;
    scale: number;
}

const defaultSettings: TypographySettings = {
    h1: '2.25rem',
    h2: '1.875rem',
    body: '1rem',
    scale: 1,
};

const TypographyContext = createContext<TypographySettings>(defaultSettings);

export const TypographyProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<TypographySettings>(defaultSettings);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'settings', 'typography'), (doc) => {
            if (doc.exists()) {
                const data = doc.data() as TypographySettings;
                setSettings(data);
                applyTypography(data);
            } else {
                applyTypography(defaultSettings);
            }
        });

        return () => unsub();
    }, []);

    const applyTypography = (s: TypographySettings) => {
        const root = document.documentElement;
        root.style.setProperty('--font-scale', s.scale.toString());
        root.style.setProperty('--h1-size', s.h1);
        root.style.setProperty('--h2-size', s.h2);
        root.style.setProperty('--body-size', s.body);
    };

    return (
        <TypographyContext.Provider value={settings}>
            {children}
        </TypographyContext.Provider>
    );
};

export const useTypography = () => useContext(TypographyContext);
