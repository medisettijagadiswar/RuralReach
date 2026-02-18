import { db, auth } from "@/lib/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const seedDemoData = async (onProgress?: (msg: string) => void) => {
    const demoUsers = [
        { name: "Demo Teacher", email: "teacher@rrteam.in", pass: "Teacher@123", role: "teacher" },
        { name: "Demo Student", email: "student@rrteam.in", pass: "Student@123", role: "student" },
        { name: "Demo Admin", email: "admin@rrteam.in", pass: "Admin@123", role: "admin" },
        { name: "Demo HOD 1", email: "hod1@rrteam.in", pass: "Hod@123", role: "hod" },
        { name: "Demo HOD 2", email: "hod2@rrteam.in", pass: "Hod@123", role: "hod" },
    ];

    try {
        onProgress?.("Initializing typography settings...");
        await setDoc(doc(db, "settings", "typography"), {
            h1: "2.25rem", h2: "1.875rem", body: "1rem", scale: 1,
        });

        for (const u of demoUsers) {
            onProgress?.(`Processing ${u.role}: ${u.email}...`);
            try {
                // Try to create the user
                const cred = await createUserWithEmailAndPassword(auth, u.email, u.pass);
                await setDoc(doc(db, "users", cred.user.uid), {
                    uid: cred.user.uid,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    createdAt: new Date().toISOString()
                });
                console.log(`Created ${u.role}`);
            } catch (authErr: any) {
                if (authErr.code === 'auth/email-already-in-use') {
                    onProgress?.(`${u.role} already exists. Updating profile...`);
                    // If user exists, we can't easily get their UID without signing in or using Admin SDK
                    // For demo purposes, we'll try to sign in to get the UID for Firestore sync
                    try {
                        const cred = await signInWithEmailAndPassword(auth, u.email, u.pass);
                        await setDoc(doc(db, "users", cred.user.uid), {
                            uid: cred.user.uid,
                            name: u.name,
                            email: u.email,
                            role: u.role,
                            updatedAt: new Date().toISOString()
                        }, { merge: true });
                    } catch (signInErr) {
                        console.error(`Could not update existing ${u.role}`, signInErr);
                    }
                } else {
                    console.error(`Error creating ${u.role}:`, authErr);
                    throw authErr;
                }
            }
        }

        onProgress?.("Seeding colleges and testimonials...");
        await setDoc(doc(db, "colleges", "college-1"), { name: "Rural Excellence College", location: "Bihar" });
        await addDoc(collection(db, "testimonials"), {
            name: "Rajesh Kumar", role: "Student", quote: "RuralReach is amazing!", approved: true
        });

        await signOut(auth);
        onProgress?.("Done!");
        return true;
    } catch (error: any) {
        console.error("Seeding failed:", error);
        onProgress?.(`Error: ${error.message}`);
        return false;
    }
};
