import { Geist_Mono, DM_Sans, Zalando_Sans_Expanded } from "next/font/google"

// DM Sans
export const dmSans = DM_Sans({
    variable: '--font-body',
    subsets: ['latin'],
})

// Geist Mono
export const geistMono = Geist_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
})

// Zalando Sans Expanded
export const zalandoSansExpanded = Zalando_Sans_Expanded({
    variable: '--font-display',
    subsets: ['latin'],
})

