import { defineType, defineField } from 'sanity'

export const project = defineType({
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),

        // tekst
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
        }),

        // cover image
        defineField({
            name: 'cover',
            type: 'image',
            title: 'Cover Image',
        }),

        // 1. Expertise
        defineField({
            name: 'expertise',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Expertise',
        }),
        // 2. Tags
        defineField({
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Tags',
        }),

        // 3. body (blokken)
        defineField({
            name: 'body',
            type: 'blockContent',
            title: 'Body',
        }),
    ],
})