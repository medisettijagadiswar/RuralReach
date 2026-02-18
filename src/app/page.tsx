"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/layout/Footer';
import { LoginModal } from '@/components/auth/LoginModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [prefill, setPrefill] = useState<{ email: string; pass: string } | undefined>(undefined);

  const demoCreds = {
    teacher: { email: 'teacher@rrteam.in', pass: 'Teacher@123' },
    student: { email: 'student@rrteam.in', pass: 'Student@123' },
    admin: { email: 'admin@rrteam.in', pass: 'Admin@123' },
  };

  const handleQuickLogin = (role: string) => {
    const creds = demoCreds[role as keyof typeof demoCreds];
    setPrefill(creds);
    setIsLoginOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Header onLoginClick={() => { setPrefill(undefined); setIsLoginOpen(true); }} />
      <Hero />
      <Features />
      <Testimonials />
      <Footer onQuickLogin={handleQuickLogin} />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        prefill={prefill}
      />

      <ToastContainer position="bottom-right" theme="colored" />

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <button
          onClick={() => setIsLoginOpen(true)}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center space-x-2"
        >
          <span>Join Now</span>
        </button>
      </div>
    </main>
  );
}
