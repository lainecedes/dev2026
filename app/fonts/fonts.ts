import localFont from "next/font/local"
import { Geist_Mono, Host_Grotesk } from "next/font/google"

// Chaney Extended
export const chaneyExtended = localFont({
    src: [{ path: './chaney/chaney-extended-webfont.woff2', weight: '400', style: 'normal' }],
    variable: '--font-chaney-extended',
})

// Chaney Ultra Extended
export const chaneyUltraExtended = localFont({
    src: [{ path: './chaney/chaney-ultraextended-webfont.woff2', weight: '400', style: 'normal' }],
    variable: '--font-chaney-ultra-extended',
})

// Space Grotesk
export const hostGrotesk = Host_Grotesk({
    variable: '--font-host-grotesk',
    subsets: ['latin'],
})

// Geist Mono
export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})
