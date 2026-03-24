import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        project,
        blockContentType,
    ],
}