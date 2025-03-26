"use client"
import React, { FC } from 'react';

import formbricks from '@formbricks/js';

if (typeof window !== 'undefined') {
    formbricks.init({
        environmentId: "cm886h70s0009o7016x1zkzei",
        appUrl: "https://formbricks-production-935b.up.railway.app/",
    });
}
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default Layout