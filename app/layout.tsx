import type { Metadata } from "next";

import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

import Header from "@/app/components/layout/Header";
import Main from "@/app/components/layout/Main";
import Footer from "@/app/components/layout/Footer";
import Cursor from "@/app/components/ui/Cursor";
import React from "react";

import { dmSans, geistMono, zalandoSansExpanded } from "@/app/fonts/fonts"

export const metadata: Metadata = {
    title: "Portfolio '26 - Lainey",
    description: "A creative developer that doesn't fit the grid.",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${dmSans.variable} ${geistMono.variable} ${zalandoSansExpanded.variable} font-body antialiased`}>

        <Cursor />

        <Header />

        <Main>
            {children}
        </Main>

        <Footer />

        <SanityLive />

        </body>
        </html>
    )
}
