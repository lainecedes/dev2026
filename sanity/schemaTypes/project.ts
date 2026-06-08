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
            description: 'Live site URL shown as an external link, e.g. “halfstep.fm” or “https://halfstep.fm”. Leave empty if not public.',
        }),

        defineField({
            name: 'col',
            type: 'string',
            title: 'Colour',
            description: 'Hex colour for the key-visual background and prev/next card, e.g. “#1A1820”.',
        }),

        defineField({
            name: 'keyVisual',
            type: 'image',
            title: 'Key Visual',
            description: 'Main project visual shown above the marquee. Transparent PNGs keep the striped background visible.',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alt text',
                    description: 'Describe the key visual for screen readers.',
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),

        defineField({
            name: 'keyVisualBackground',
            type: 'string',
            title: 'Key Visual Background',
            description: 'Optional hex colour behind the key visual and stripes. Falls back to the project Colour.',
        }),

        defineField({
            name: 'overview',
            type: 'text',
            title: 'Introduction',
            description: 'Introductory copy shown before the detailed project sections. Use blank lines to create paragraph breaks.',
            rows: 6,
        }),

        defineField({
            name: 'disclaimer',
            type: 'text',
            title: 'Disclaimer',
            description: 'Optional important note shown between the introduction and project sections. Use blank lines to create paragraph breaks.',
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
                            description: 'Paragraph copy for this section. Use blank lines to create paragraph breaks.',
                            rows: 5,
                        }),
                        defineField({
                            name: 'media',
                            type: 'array',
                            title: 'Media',
                            description: 'Optional. Add up to two images or videos.',
                            validation: (Rule) => Rule.max(2),
                            of: [
                                defineArrayMember({
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        defineField({
                                            name: 'alt',
                                            type: 'string',
                                            title: 'Alt text',
                                            description: 'Describe the image. This is also shown below the image.',
                                            validation: (Rule) => Rule.required(),
                                        }),
                                    ],
                                }),
                                defineArrayMember({
                                    type: 'file',
                                    title: 'Video',
                                    options: {
                                        accept: 'video/mp4,video/webm',
                                    },
                                    fields: [
                                        defineField({
                                            name: 'caption',
                                            type: 'string',
                                            title: 'Caption',
                                            description: 'Optional caption shown below the video.',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        defineField({
                            name: 'images',
                            type: 'array',
                            title: 'Legacy images',
                            description: 'Existing images from before sections supported video. Add new media using the Media field.',
                            readOnly: true,
                            hidden: ({ parent }) => !parent?.images?.length,
                            of: [
                                defineArrayMember({
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        defineField({
                                            name: 'alt',
                                            type: 'string',
                                            title: 'Alt text',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'heading', subtitle: 'body', media: 'media.0' },
                    },
                }),
            ],
        }),

        defineField({
            name: 'conclusion',
            type: 'text',
            title: 'Conclusion',
            description: 'Optional closing reflection shown after the project sections. Use blank lines to create paragraph breaks.',
            rows: 6,
        }),

        // legacy / supplementary fields kept for the index + studio
        defineField({
            name: 'cover',
            type: 'image',
            title: 'Cover Image',
            description: 'Cover used by the homepage projects grid. The case-study hero uses the “Colour” field instead.',
        }),
        defineField({
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Tags',
            description: 'Legacy taxonomy used by the homepage tile chips. Prefer “Kind” + “Tag” for the case-study page.',
        }),
    ],
})
