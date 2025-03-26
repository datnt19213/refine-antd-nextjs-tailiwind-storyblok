"use client";
import { useEffect } from 'react';

import formbricks from '@formbricks/js';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            formbricks
                .init({
                    environmentId: "cm886h70s0009o7016x1zkzei",
                    appUrl: process.env.NEXT_PUBLIC_FORMBRICKS_URL,
                })
                .then(() => console.log("✅ Formbricks initialized"))
                .catch((err) => console.error("❌ Formbricks init failed", err));
        }
    }, []); // Chạy 1 lần khi component mount

    return <>{children}</>;
};

export default Layout;
