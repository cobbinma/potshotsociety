# Quick Start - Next Steps for Pot Shot Society

Congratulations! Your recipe website codebase is complete. Here's what you need to do to get it live:

## ✅ What's Been Done

All the code has been written and tested:
- ✅ Next.js 14 application with TypeScript
- ✅ Sanity CMS integration
- ✅ Beautiful recipe cards and detail pages
- ✅ Search and filter functionality
- ✅ Print-friendly layouts
- ✅ Mobile responsive design
- ✅ SEO optimization
- ✅ All components and pages
- ✅ Documentation for you and your wife

## 🚀 Next Steps (15-20 minutes)

### Step 1: Create a Sanity Project (5 minutes)

1. Go to **https://sanity.io**
2. Sign up for a free account (use Google/GitHub for quick signup)
3. Go to **https://sanity.io/manage**
4. Click **"Create project"**
5. **Project name**: `potshotsociety`
6. **Dataset**: `production`
7. **Copy your Project ID** (looks like `abc123xy`)

### Step 2: Update Environment Variables (2 minutes)

1. Open the file `.env.local` in this project
2. Replace `placeholder123` with your actual Sanity Project ID:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy  # Your actual ID
   ```
3. Save the file

### Step 3: Initialize Sanity (3 minutes)

Run this command in your terminal:

```bash
bunx sanity init
```

When prompted:
- **Select project**: Choose the project you just created
- **Dataset**: production
- **Output path**: Press Enter (keep as `sanity`)
- **Template**: Clean project (press Enter)

### Step 4: Test Locally (5 minutes)

Start the development server:

```bash
bun dev
```

Open your browser:
- **Homepage**: http://localhost:3000
- **Admin panel**: http://localhost:3000/studio

### Step 5: Add a Test Recipe (5 minutes)

1. Go to http://localhost:3000/studio
2. Log in with your Sanity account
3. Click **"Create"** → **"Recipe"**
4. Fill out a simple test recipe:
   - Title: "Test Recipe"
   - Generate slug
   - Upload any photo
   - Add 2-3 ingredients
   - Add 2-3 instructions
   - Select a category
5. Click **"Publish"**
6. Go back to http://localhost:3000 and see your recipe appear!

### Step 6: Deploy to Vercel (10 minutes)

Follow the `DEPLOYMENT.md` guide in this project for detailed deployment instructions.

Quick version:
1. Push code to GitHub
2. Sign up at https://vercel.com
3. Import your GitHub repository
4. Add environment variables in Vercel
5. Deploy!

## 📚 Important Files to Share

Share these files with your wife:
1. **USER_GUIDE.md** - How to add recipes (non-technical)
2. **DEPLOYMENT.md** - Full deployment guide (for you)
3. **README.md** - Technical overview

## 🎨 What Your Wife Will See

Once deployed, your wife can:
1. Go to `yoursitename.vercel.app/studio`
2. Log in with her Sanity account
3. Click "Create" → "Recipe"
4. Fill out a beautiful, user-friendly form
5. Click "Publish"
6. Recipe appears on the site in ~1 minute
7. Share URL with friends instantly!

## 💰 Costs

- **Sanity**: FREE (3 users, 10GB bandwidth, 5GB storage)
- **Vercel**: FREE (unlimited for personal projects)
- **Total**: **$0/month**

## 🎯 Key Features Implemented

- **Homepage**: Grid of recipe cards with search and category filters
- **Recipe Pages**: Beautiful detail pages with ingredients, instructions, metadata
- **Admin Panel**: Easy-to-use Sanity Studio for managing recipes
- **Mobile Responsive**: Works on all devices
- **Print Friendly**: Clean print layout for recipes
- **SEO Optimized**: OpenGraph tags for social sharing
- **Fast Performance**: Next.js ISR + Sanity CDN

## 📝 Recipe Categories Available

- Breakfast & Brunch
- Appetizers & Snacks
- Main Dishes
- Side Dishes
- Soups & Salads
- Desserts
- Breads & Baking
- Drinks & Beverages
- Sauces & Condiments
- Quick & Easy
- Vegetarian
- Kid-Friendly

## 🐛 Troubleshooting

### Build Errors
If you see errors when running `bun dev`:
- Make sure you've replaced `placeholder123` with your real Project ID
- Run `bun install` again
- Check that `.env.local` exists and has the correct values

### Can't Access Studio
- Make sure you're logged into Sanity
- Check that your Project ID is correct
- Try clearing browser cache

### Recipes Not Showing
- Make sure recipes are **published** (not drafts)
- Wait 1-2 minutes for ISR revalidation
- Check browser console for errors

## 📞 Support

If you need help:
1. Read the `README.md` for technical details
2. Check `DEPLOYMENT.md` for deployment steps
3. Visit https://www.sanity.io/docs for Sanity help
4. Visit https://nextjs.org/docs for Next.js help

## 🎉 You're Almost There!

Just follow Steps 1-6 above, and you'll have a live recipe-sharing website in under 30 minutes!

Your wife will love how easy it is to add and share recipes with friends and family.

Good luck, and happy cooking! 🍳
