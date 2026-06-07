import { getProjects } from "@/sanity/lib/fetch"
import Hero from "@/app/components/sections/Hero"
import Projects from "@/app/components/sections/Projects"
import WarpGrid from "@/app/components/dynamic/WarpGrid"
import Marquee from "@/app/components/dynamic/Marquee"
import AboutSection from "@/app/components/sections/AboutSection"
import { HomeGrid, SiteAccent } from "@/app/components/shared/types"

export default async function Index() {
    const projects = await getProjects()
    return (
        <>
            <div className="relative overflow-hidden">
                <WarpGrid density={HomeGrid.density} mobileDensity={HomeGrid.mobileDensity} distortion={HomeGrid.distortion} />
                <Hero />
                <div className="relative z-10 -mt-32 py-8 md:mt-0">
                    <div className="rotate-[-2deg] -mx-8">
                        <Marquee
                            reverse={false}
                            accent={SiteAccent}
                            items={[
                                "Creative development",
                                "Front-end & design",
                                "Based in AMS",
                            ]}
                        />
                    </div>
                    <div className="rotate-[1deg] -mx-8">
                        <Marquee
                            reverse
                            accent={SiteAccent}
                            className="bg-bg text-dark border-y border-dark/10"
                            items={[
                                "★ Est. 2021",
                                "Straight to the point",
                                "Will ask stupid questions",
                                "Available for work",
                                "The odd one out",
                                "© Lainey",
                            ]}
                        />
                    </div>
                </div>
            </div>
            <Projects projects={projects} />
            <AboutSection />
        </>
    )
}
