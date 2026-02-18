# RuralReach Web Application

RuralReach is a production-grade, mobile-first education platform designed for low-bandwidth environments.

## Features
- **Low-Bandwidth First**: Default audio-only live sessions and data-saver modes.
- **Dynamic Typography**: Real-time global typography control for admins via Firestore.
- **Interactive Dashboards**: Role-protected views for Students, Teachers, and Admins.
- **Offline Ready**: Download manager with IndexedDB persistence for offline learning.
- **Live Class**: Integrated Jitsi Meet with real-time Firestore chat.
- **PWA**: Mobile installable and offline-capable.

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Framer Motion.
- **Backend**: Firebase (Auth, Firestore, Storage).
- **Interactive**: Jitsi Meet External API, Embla Carousel.

## Setup Instructions
1. **Clone the repo** and run `npm install`.
2. **Firebase Setup**:
   - Create a Firebase project.
   - Enable Email/Password Auth.
   - Setup Firestore and Storage.
   - Create `.env.local` with your Firebase credentials (see `src/lib/firebase.ts` for keys).
3. **Run Development Server**: `npm run dev`.
4. **Seed Demo Data**: In the browser console, import and run `seedDemoData` from `@/lib/seed`.

## Demo Credentials
- **Teacher**: teacher@rrteam.in / Teacher@123
- **Student**: student@rrteam.in / Student@123
- **Admin**: admin@rrteam.in / Admin@123

## Dynamic Typography
Change H1, H2, and Body sizes in the Admin Dashboard to see changes reflect globally in real-time across all connected clients.
