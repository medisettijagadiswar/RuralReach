"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({
    children,
    allowedRoles
}: {
    children: React.ReactNode;
    allowedRoles: ('student' | 'teacher' | 'admin' | 'hod' | 'cr')[];
}) => {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/");
            } else if (role && !allowedRoles.includes(role)) {
                router.push("/unauthorized");
            }
        }
    }, [user, role, loading, router]);

    if (loading || !user || (role && !allowedRoles.includes(role))) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return <>{children}</>;
};
