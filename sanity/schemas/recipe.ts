import { defineType, defineField } from 'sanity'

export const recipe = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    // Basic Information
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A brief overview of the recipe (1-2 sentences)',
    }),

    // Images
    defineField({
      name: 'mainImage',
      title: 'Main Recipe Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      description: 'Extra photos (process shots, final dish, etc.)',
    }),
    defineField({
      name: 'instagramVideoUrl',
      title: 'Instagram Video URL',
      type: 'url',
      description: '📹 Link to the Instagram Reel or video for this recipe (e.g., https://www.instagram.com/reel/xxxxx/)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Optional field
          if (url.includes('instagram.com') || url.includes('instagr.am')) {
            return true
          }
          return '⚠️ Must be an Instagram URL (instagram.com or instagr.am)'
        }),
    }),

    // Timing & Yield
    defineField({
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'servings',
      title: 'Number of Servings',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),

    // Recipe Content
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Ingredient',
              type: 'string',
              description: 'e.g., "2 cups all-purpose flour"',
            },
          ],
          preview: {
            select: {
              title: 'item',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'step',
            },
            prepare({ title }) {
              return {
                title: title?.substring(0, 60) + (title?.length > 60 ? '...' : ''),
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // Organization
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Breakfast & Brunch', value: 'breakfast' },
          { title: 'Appetizers & Snacks', value: 'appetizers' },
          { title: 'Main Dishes', value: 'mains' },
          { title: 'Side Dishes', value: 'sides' },
          { title: 'Soups & Salads', value: 'soups-salads' },
          { title: 'Desserts', value: 'desserts' },
          { title: 'Breads & Baking', value: 'breads' },
          { title: 'Drinks & Beverages', value: 'drinks' },
          { title: 'Sauces & Condiments', value: 'sauces' },
          { title: 'Quick & Easy', value: 'quick-easy' },
          { title: 'Vegetarian', value: 'vegetarian' },
          { title: 'Kid-Friendly', value: 'kid-friendly' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),

    // Optional Fields
    defineField({
      name: 'notes',
      title: 'Recipe Notes & Tips',
      type: 'text',
      rows: 4,
      description: 'Storage tips, variations, substitutions, etc.',
    }),
    defineField({
      name: 'source',
      title: 'Recipe Source',
      type: 'string',
      description: 'e.g., "Grandma\'s cookbook" or "Adapted from..."',
    }),

    // Metadata
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      categories: 'categories',
    },
    prepare(selection) {
      const { title, media, categories } = selection
      return {
        title,
        media,
        subtitle: categories ? categories.join(', ') : 'No categories',
      }
    },
  },
})
