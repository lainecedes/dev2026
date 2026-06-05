import type { MainProps } from "@/app/components/shared/types";

export default function Main({ children }: MainProps) {
    return (
        <main className="w-screen bg-bg">
            { children }
        </main>
    )
}
