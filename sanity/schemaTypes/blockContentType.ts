import { defineType, defineArrayMember } from "sanity";

export const blockContentType = defineType({
    name: "blockContent",
    title: "Block Content",
    type: "array",
    of: [
        defineArrayMember({
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
                { title: "H1", value: "h1" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "Quote", value: "blockquote" },
            ],
            lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                    { title: "Underline", value: "underline" },
                    { title: "Code", value: "code" },
                ],
                annotations: [
                    {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                            { name: "href", type: "url", title: "URL" },
                            { name: "blank", type: "boolean", title: "Open in new tab?" },
                        ],
                    },
                ],
            },
        }),

        { type: "image", options: { hotspot: true } },

        // Full-width image with caption
        defineArrayMember({
            type: "object",
            name: "fullImage",
            title: "Full-width Image",
            fields: [
                {
                    name: "image",
                    type: "image",
                    title: "Image",
                    options: { hotspot: true },
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: "caption",
                    type: "string",
                    title: "Caption",
                },
            ],
            preview: {
                select: { title: "caption", media: "image" },
                prepare({ title, media }) {
                    return { title: title || "Full-width Image", media }
                },
            },
        }),

        // Two images side by side
        defineArrayMember({
            type: "object",
            name: "imageDuo",
            title: "Two Images",
            fields: [
                { name: "image1", type: "image", title: "Image 1", options: { hotspot: true } },
                { name: "image2", type: "image", title: "Image 2", options: { hotspot: true } },
            ],
            preview: {
                select: { media: "image1" },
                prepare({ media }) { return { title: "Two Images", media } },
            },
        }),

        // Three images
        defineArrayMember({
            type: "object",
            name: "imageTrio",
            title: "Three Images",
            fields: [
                { name: "image1", type: "image", title: "Image 1", options: { hotspot: true } },
                { name: "image2", type: "image", title: "Image 2", options: { hotspot: true } },
                { name: "image3", type: "image", title: "Image 3", options: { hotspot: true } },
            ],
            preview: {
                select: { media: "image1" },
                prepare({ media }) { return { title: "Three Images", media } },
            },
        }),

        // Two-column: text left, image right
        defineArrayMember({
            type: "object",
            name: "twoColumn",
            title: "Two Column",
            fields: [
                {
                    name: "text",
                    type: "text",
                    title: "Text",
                    rows: 5,
                },
                {
                    name: "image",
                    type: "image",
                    title: "Image",
                    options: { hotspot: true },
                },
            ],
            preview: {
                select: { title: "text", media: "image" },
                prepare({ title, media }) {
                    return { title: title ? title.slice(0, 40) + "…" : "Two Column", media }
                },
            },
        }),
    ],
});