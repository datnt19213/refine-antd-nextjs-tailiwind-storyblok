import './globals.css';

import { Suspense } from 'react';

import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
} from 'next/font/google';

import QueryProvider from '@/providers/query-provider';
import { ReduxProvider } from '@/providers/redux-provider';
import { DynamicRefineProvider } from '@/providers/refine-provider';
import formbricks from '@formbricks/js';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen`}
      >

        <QueryProvider>
          <ReduxProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <DynamicRefineProvider>{children}</DynamicRefineProvider>
            </Suspense>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
