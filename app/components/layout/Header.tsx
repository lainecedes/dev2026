import Navigation from "../../components/navigation/Navigation"

export default function Header() {
    return (
        <header className="flex items-center align-center justify-center w-full h-8 fixed top-0 left-0 z-50">
            <Navigation />
        </header>
    )
}