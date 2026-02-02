# Deployment Guide - Pot Shot Society

This guide will walk you through deploying your recipe website to make it live on the internet for free!

## Part 1: Create Your Sanity Project

1. **Go to Sanity.io**
   - Visit https://sanity.io
   - Click "Sign up" (use Google, GitHub, or email)

2. **Create a New Project**
   - Go to https://sanity.io/manage
   - Click "Create project"
   - **Project name**: `potshotsociety` (or any name you prefer)
   - **Dataset**: Choose "production"
   - Click "Create"

3. **Get Your Project ID**
   - After creating the project, you'll see your **Project ID** on the project page
   - It looks like: `abc123xy`
   - **Copy this ID** - you'll need it in the next steps!

## Part 2: Configure Your Local Environment

1. **Update Environment Variables**
   
   Open the `.env.local` file in your project and add your Project ID:
   
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy  # Replace with your actual Project ID
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

2. **Initialize Sanity (Interactive)**
   
   Run this command in your terminal:
   
   ```bash
   bunx sanity init
   ```
   
   When prompted:
   - **Select project**: Choose the project you just created
   - **Dataset**: production
   - **Project output path**: Leave as `sanity` (press Enter)
   - **Select project template**: Clean project with no predefined schemas (press Enter)

3. **Test Locally**
   
   Start the development server:
   
   ```bash
   bun dev
   ```
   
   - Open http://localhost:3000 - you should see the homepage
   - Open http://localhost:3000/studio - you should see the Sanity Studio

4. **Add a Test Recipe**
   
   - Go to http://localhost:3000/studio
   - Log in with your Sanity credentials
   - Create a test recipe to make sure everything works
   - Check that it appears on the homepage

## Part 3: Deploy to Vercel (Free Hosting)

### First Time Setup

1. **Push Code to GitHub**
   
   If you haven't already:
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Pot Shot Society"
   git branch -M main
   git remote add origin https://github.com/yourusername/potshotsociety.git
   git push -u origin main
   ```

2. **Sign Up for Vercel**
   
   - Go to https://vercel.com/signup
   - Sign up with GitHub (easiest option)

3. **Import Your Project**
   
   - Click "Add New..." → "Project"
   - Select your `potshotsociety` repository
   - Click "Import"

4. **Configure Environment Variables**
   
   Before deploying, add your environment variables:
   
   - In the "Configure Project" screen, expand "Environment Variables"
   - Add these three variables:
     
     **Variable 1:**
     - Name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - Value: `abc123xy` (your actual Project ID)
     
     **Variable 2:**
     - Name: `NEXT_PUBLIC_SANITY_DATASET`
     - Value: `production`
     
     **Variable 3:**
     - Name: `NEXT_PUBLIC_SANITY_API_VERSION`
     - Value: `2024-01-01`

5. **Deploy!**
   
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a URL like: `potshotsociety.vercel.app`

6. **Visit Your Live Site!**
   
   - Click the generated URL
   - Your site is now live on the internet!
   - Access the admin panel at: `potshotsociety.vercel.app/studio`

### Future Deployments

From now on, every time you push to GitHub, Vercel will automatically deploy your changes!

```bash
git add .
git commit -m "Update recipes"
git push
```

## Part 4: Setting Up Your Wife's Access

1. **Add Her to Sanity Project**
   
   - Go to https://sanity.io/manage
   - Select your project
   - Go to "Settings" → "Members"
   - Click "Invite members"
   - Enter her email address
   - Set role to "Editor" or "Administrator"
   - She'll receive an email to create her account

2. **Show Her the Admin Panel**
   
   - Send her the URL: `yoursitename.vercel.app/studio`
   - Walk her through creating a recipe using the `USER_GUIDE.md`
   - Make sure she can successfully publish a recipe

## Part 5: Custom Domain (Optional)

Want a custom domain like `potshotsociety.com`?

1. **Buy a Domain**
   - Purchase from Namecheap, GoDaddy, Google Domains, etc.
   - Cost: ~$12/year

2. **Add to Vercel**
   - In Vercel, go to your project
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Follow Vercel's instructions to update DNS settings

3. **Update Studio URL**
   - Your admin panel will now be at: `yourdomain.com/studio`

## Troubleshooting

### "Cannot connect to Sanity"
- Double-check your `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel
- Make sure it matches your Sanity project ID exactly
- Redeploy after updating environment variables

### "Recipes not showing up"
- Make sure recipes are **published** (not drafts) in Sanity Studio
- Wait 1-2 minutes for ISR revalidation
- Check the browser console for errors

### "Build failed on Vercel"
- Check the build logs in Vercel
- Common issues:
  - Missing environment variables
  - TypeScript errors (check locally first)
  - Missing dependencies

## Monitoring Usage (Staying Within Free Tier)

### Sanity Dashboard
- Go to https://sanity.io/manage
- Select your project
- Check "Usage" tab to see bandwidth and storage

### Vercel Dashboard
- Go to https://vercel.com/dashboard
- Select your project
- Check usage in "Analytics"

For a personal recipe site, you'll easily stay within free limits unless you go viral!

## Cost Summary

| Service | Free Tier Limits | Monthly Cost |
|---------|------------------|--------------|
| Vercel | Unlimited for hobby | $0 |
| Sanity | 3 users, 10GB bandwidth, 5GB assets | $0 |
| **Total** | | **$0/month** |

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

Congratulations! Your recipe-sharing website is now live and ready to share delicious recipes with the world!
