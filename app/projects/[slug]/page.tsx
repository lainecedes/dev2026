import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image"; // image helper van sanity, prevent image issues

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    // unwrap the promise
    const { slug } = await params;

    // fetch project
    const { data: project } = await sanityFetch({
        query: PROJECT_QUERY,
        params: { slug },
    });

    // debug log (optional)
    console.log("slug:", slug);
    console.log("project:", project);

    if (!project) notFound();

    return (
        <section className="container mx-auto p-12 grid gap-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-balance">{project.title}</h1>

            {/* Excerpt */}
            {project.excerpt && <p className="text-gray-500">{project.excerpt}</p>}


            {project.cover && (
                <div className="relative w-full h-[500px] mt-4 rounded-md overflow-hidden">
                    <Image
                        src={urlFor(project.cover).width(1200).url()}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </div>
            )}


            {/* Tags */}
            {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                        >
              {tag}
            </span>
                    ))}
                </div>
            )}

            {/* Expertise */}
            {project.expertise?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.expertise.map((exp: string) => (
                        <span
                            key={exp}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm"
                        >
              {exp}
            </span>
                    ))}
                </div>
            )}

            {/* Body (Portable Text) */}
            {project.body && (
                <article className="prose mt-6">
                    <PortableText value={project.body} />
                </article>
            )}

            {/* Date */}
            {project.date && (
                <p className="mt-6 text-sm text-gray-400">
                    Published on {new Date(project.date).toLocaleDateString()}
                </p>
            )}

            <Link href="/projects" className="mt-6 inline-block text-blue-500 hover:underline">
                &larr; Return to index
            </Link>
        </section>
    );
}