import { type SchemaTypeDefinition } from 'sanity'
import { recipe } from './schemas/recipe'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe],
}
