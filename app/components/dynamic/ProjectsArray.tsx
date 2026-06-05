import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/app/components/shared/types";

// De projecten stijlen met tailwind en flex/grid hier:
export default function ProjectsArray( { projects } : { projects: Project[] })
{
    console.log("Projects fetched:", projects);
    return (
        <ul className="flex flex-col md:grid md:grid-cols-2 gap-6 font-body">
            {projects.map((project) => (
                <li key={project._id} className="overflow-hidden">
                    <Link href={`/archive/${project.slug}`} className="flex flex-col gap-2">
                        {project.cover && (
                            <div className="relative w-full aspect-[3/2] overflow-hidden">
                                <Image
                                    src={urlFor(project.cover).width(1200).url()}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    priority
                                />
                            </div>
                        )}
                        <h3 className="">{project.title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
