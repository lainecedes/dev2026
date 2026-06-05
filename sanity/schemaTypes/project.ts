import { defineType, defineField, defineArrayMember } from 'sanity'

export const project = defineType({
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            description: 'The project name as it appears in the giant hero headline.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            description: 'URL path under /archive/. Generated from the title — click “Generate” after editing the title.',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'idx',
            type: 'string',
            title: 'Index',
            description: 'Two-digit case number, e.g. “01”, “02”. Used in the breadcrumb and key-visual corner.',
        }),

        defineField({
            name: 'year',
            type: 'string',
            title: 'Year',
            description: 'Short year label shown next to the case number, e.g. “’25”.',
        }),

        defineField({
            name: 'tag',
            type: 'string',
            title: 'Tag',
            description: 'Single italic line shown directly under the hero title, e.g. “Brand identity”.',
        }),

        defineField({
            name: 'kind',
            type: 'string',
            title: 'Kind',
            description: 'Category label used in the KEY VISUAL pill and the prev/next cards, e.g. “Identity”, “Web”.',
        }),

        defineField({
            name: 'client',
            type: 'string',
            title: 'Client',
            description: 'Who the work was for. Shown in the meta rail.',
        }),

        defineField({
            name: 'role',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Role',
            description: 'Your role(s) on the project. Add multiple chips, e.g. “Design”, “Development”.',
        }),

        defineField({
            name: 'stack',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Stack',
            description: 'Tools or tech used, e.g. “Next.js”, “Sanity”, “GSAP”. Joined with “·” in the meta rail.',
        }),

        defineField({
            name: 'duration',
            type: 'string',
            title: 'Duration',
            description: 'How long the engagement ran, e.g. “6 weeks”, “Q3 2025”.',
        }),

        defineField({
            name: 'live',
            type: 'string',
            title: 'Live',
            description: 'Live URL or label shown in the meta rail, e.g. “halfstep.fm”. Use “—” if not public.',
        }),

        defineField({
            name: 'col',
            type: 'string',
            title: 'Colour',
            description: 'Hex colour for the key-visual background and prev/next card, e.g. “#1A1820”.',
        }),

        defineField({
            name: 'overview',
            type: 'text',
            title: 'Overview tagline',
            description: 'A one- or two-sentence hook shown large under the “§ Overview” heading.',
            rows: 4,
        }),

        defineField({
            name: 'sections',
            type: 'array',
            title: 'Sections',
            description: 'Numbered case-study blocks (heading + paragraph). Order here is the order on the page.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'section',
                    fields: [
                        defineField({
                            name: 'heading',
                            type: 'string',
                            title: 'Heading',
                            description: 'Short section title, e.g. “The brief”, “What we built”.',
                        }),
                        defineField({
                            name: 'body',
                            type: 'text',
                            title: 'Body',
                            description: 'Paragraph copy for this section. Plain text only.',
                            rows: 5,
                        }),
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            description: 'Optional. Renders below this section’s body. Add alt text under “Edit details”.',
                            options: { hotspot: true },
                            fields: [
                                defineField({
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alt text',
                                    description: 'Describe the image for screen readers.',
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'heading', subtitle: 'body', media: 'image' },
                    },
                }),
            ],
        }),

        defineField({
            name: 'credits',
            type: 'array',
            title: 'Credits',
            description: 'Key/value rows shown under “§ Credits”, e.g. Label “Photography” → Value “Jane Doe”.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'credit',
                    fields: [
                        defineField({
                            name: 'k',
                            type: 'string',
                            title: 'Label',
                            description: 'Role or contribution, e.g. “Photography”, “Sound design”.',
                        }),
                        defineField({
                            name: 'v',
                            type: 'string',
                            title: 'Value',
                            description: 'Person or studio credited, e.g. “Jane Doe”.',
                        }),
                    ],
                    preview: {
                        select: { title: 'k', subtitle: 'v' },
                    },
                }),
            ],
        }),

        // legacy / supplementary fields kept for the index + studio
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Short blurb used by the homepage projects index. Not shown on the case-study page.',
        }),
        defineField({
            name: 'cover',
            type: 'image',
            title: 'Cover Image',
            description: 'Cover used by the homepage projects grid. The case-study hero uses the “Colour” field instead.',
        }),
        defineField({
            name: 'expertise',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Expertise',
            description: 'Legacy taxonomy. Prefer “Stack” for new projects.',
        }),
        defineField({
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Tags',
            description: 'Legacy taxonomy used by the homepage tile chips. Prefer “Kind” + “Tag” for the case-study page.',
        }),
        defineField({
            name: 'body',
            type: 'blockContent',
            title: 'Body',
            description: 'Legacy rich-text body. Prefer “Sections” for new projects.',
        }),
    ],
})
