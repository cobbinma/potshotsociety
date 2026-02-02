# Pot Shot Society

A beautiful, modern recipe-sharing website built with Next.js 14, TypeScript, Tailwind CSS, and Sanity CMS. Share delicious recipes with friends and family with an easy-to-use interface that requires zero coding skills to manage.

## Features

- **User-Friendly CMS**: Sanity Studio provides a beautiful interface for adding and editing recipes
- **Search & Filter**: Real-time search and category filtering
- **Recipe Cards**: Beautiful grid layout with recipe previews
- **Detailed Recipe Pages**: Full recipe view with ingredients, instructions, prep/cook times
- **Print-Friendly**: Clean print layout for recipes
- **Mobile Responsive**: Works beautifully on all devices
- **SEO Optimized**: OpenGraph tags and recipe schema markup for Google rich results
- **Fast Performance**: Next.js ISR and Sanity CDN for optimal speed
- **100% Free Hosting**: Uses free tiers of Vercel and Sanity

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity.io
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Sanity account (free at https://sanity.io)
- A Vercel account for deployment (free at https://vercel.com)

### 1. Create a Sanity Project

1. Go to https://sanity.io/manage
2. Click "Create New Project"
3. Choose a name (e.g., "potshotsociety")
4. Select "production" dataset
5. Copy your **Project ID**

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Sanity Project ID:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Initialize Sanity

```bash
bunx sanity init
```

Follow the prompts and select your existing project.

### 5. Run the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 6. Access Sanity Studio

Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

## How to Add Recipes (For Non-Technical Users)

### Accessing the Admin Panel

1. Go to `yoursite.com/studio` (or `localhost:3000/studio` locally)
2. Log in with your Sanity credentials

### Adding a New Recipe

1. Click **"Create"** → **"Recipe"**
2. Fill out the form:
   - **Recipe Title**: Name of your dish (e.g., "Mom's Chocolate Chip Cookies")
   - **URL Slug**: Click "Generate" to auto-create from title
   - **Short Description**: Brief 1-2 sentence description
   - **Main Recipe Photo**: Drag & drop or click to upload
   - **Additional Photos**: Optional extra photos
   - **Prep Time**: Minutes to prepare (e.g., 15)
   - **Cook Time**: Minutes to cook (e.g., 12)
   - **Number of Servings**: How many servings (e.g., 24)
   - **Ingredients**: Click "+ Add ingredient" for each one
   - **Instructions**: Click "+ Add step" for each instruction
   - **Categories**: Select one or more categories
   - **Recipe Notes & Tips**: Optional storage tips, variations, etc.
   - **Recipe Source**: Optional (e.g., "Grandma's cookbook")
3. Click **"Publish"**
4. Your recipe will appear on the site within ~1 minute!

### Editing a Recipe

1. Go to the Studio
2. Click on the recipe you want to edit
3. Make your changes
4. Click **"Publish"** to save

### Sharing a Recipe

1. Visit your recipe on the site
2. Click the **"Share"** button to copy the URL
3. Share the URL with friends via text, email, or social media!

## Project Structure

```
potshotsociety/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage (recipe grid)
│   ├── layout.tsx           # Root layout
│   ├── RecipePageClient.tsx # Client-side homepage logic
│   ├── recipes/
│   │   └── [slug]/
│   │       └── page.tsx     # Individual recipe page
│   └── studio/              # Sanity Studio route
├── components/              # React components
│   ├── layout/              # Layout components
│   ├── recipe/              # Recipe-specific components
│   ├── search/              # Search and filter components
│   └── ui/                  # Reusable UI components
├── sanity/                  # Sanity CMS configuration
│   ├── schemas/             # Schema definitions
│   ├── lib/                 # Sanity client and utilities
│   ├── schema.ts            # Schema index
│   └── sanity.config.ts     # Sanity config
├── lib/                     # Utilities
│   ├── types.ts             # TypeScript types
│   ├── constants.ts         # Constants (categories, etc.)
│   └── utils.ts             # Helper functions
├── public/                  # Static assets
└── .env.local               # Environment variables
```

## Available Recipe Categories

1. Breakfast & Brunch
2. Appetizers & Snacks
3. Main Dishes
4. Side Dishes
5. Soups & Salads
6. Desserts
7. Breads & Baking
8. Drinks & Beverages
9. Sauces & Condiments
10. Quick & Easy
11. Vegetarian
12. Kid-Friendly

## Deployment to Vercel

### First-Time Deployment

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
5. Click **"Deploy"**
6. Your site will be live at `potshotsociety.vercel.app`

### Subsequent Deployments

Vercel automatically deploys when you push to your main branch!

## Free Tier Limits

### Sanity (Free Tier)
- **Users**: 3
- **API Requests**: Unlimited
- **Assets**: 5GB storage
- **Bandwidth**: 10GB/month (~10,000 page views)

### Vercel (Hobby Tier)
- **Bandwidth**: Unlimited for personal projects
- **Deployments**: Unlimited
- **Serverless Functions**: 100GB-hours

For a personal recipe site shared with friends/family, you'll comfortably stay within free tiers.

## Troubleshooting

### "Unable to connect to Sanity"
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env.local`
- Make sure you've run `bunx sanity init`

### "No recipes showing"
- Make sure you've added recipes in Sanity Studio
- Check that recipes are published (not drafts)
- Wait ~1 minute for ISR revalidation

### "Images not loading"
- Check that your images are uploaded in Sanity
- Verify `next.config.ts` includes `cdn.sanity.io` in `remotePatterns`

## Support

For issues or questions:
1. Check the Sanity documentation: https://www.sanity.io/docs
2. Check the Next.js documentation: https://nextjs.org/docs
3. Review the code comments for guidance

## License

This project is open source and available for personal use.
