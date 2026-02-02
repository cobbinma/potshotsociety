# Quick Deployment Steps

## Overview
This guide gets Pot Shot Society from local development to live on the internet in ~30 minutes.

## Prerequisites
- GitHub account (free)
- Vercel account (free, sign up with GitHub)
- Sanity account (free)

---

## Step 1: Create Sanity Project (5 minutes)

1. Go to https://sanity.io/manage
2. Click **"Create project"**
3. Name: `potshotsociety`
4. Dataset: `production` (default)
5. Copy your **Project ID** (looks like: `abc123xy`)

---

## Step 2: Update Local Environment (2 minutes)

1. Open `.env.local` in your code editor
2. Replace `placeholder123` with your actual Sanity Project ID:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy  # Your real ID here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. Save the file

---

## Step 3: Test Locally (5 minutes)

```bash
# Start development server
bun dev
```

1. Visit http://localhost:3000/studio
2. Sign in with your Sanity account
3. Click **"Create" → "Recipe"**
4. Add a test recipe:
   - Title: "Test Recipe"
   - Add at least one ingredient
   - Add at least one instruction step
   - Click **"Publish"**
5. Visit http://localhost:3000 and verify the recipe appears

**If the recipe shows up, you're ready to deploy!**

---

## Step 4: Push to GitHub (3 minutes)

### Option A: Create via GitHub Website
1. Go to https://github.com/new
2. Name: `potshotsociety`
3. Make it **Public** (required for free Vercel hosting)
4. **DO NOT** initialize with README
5. Copy the commands shown (they'll look like):

```bash
git remote add origin https://github.com/YOUR-USERNAME/potshotsociety.git
git branch -M main
git push -u origin main
```

### Option B: Create via GitHub CLI
```bash
gh repo create potshotsociety --public --source=. --remote=origin --push
```

---

## Step 5: Deploy to Vercel (10 minutes)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `potshotsociety` repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `bun run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables (click **"Environment Variables"**):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET = production
   NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
   NEXT_PUBLIC_SITE_URL = https://your-project-name.vercel.app
   ```
   
   **Note**: For `NEXT_PUBLIC_SITE_URL`, use the URL Vercel shows you (or come back and add it after first deploy)

6. Click **"Deploy"**
7. Wait 2-3 minutes for the build to complete

---

## Step 6: Update Site URL (2 minutes)

After first deployment:

1. Copy your live URL (e.g., `https://potshotsociety.vercel.app`)
2. In Vercel dashboard, go to:
   - **Settings** → **Environment Variables**
   - Edit `NEXT_PUBLIC_SITE_URL`
   - Set it to your actual URL
3. Go to **Deployments** → Click **"Redeploy"** (top right) → **"Redeploy"**

---

## Step 7: Configure Sanity CORS (3 minutes)

Allow your Vercel site to access Sanity:

1. Go to https://sanity.io/manage
2. Select your `potshotsociety` project
3. Go to **Settings** → **API** → **CORS Origins**
4. Click **"Add CORS origin"**
5. Add your Vercel URL: `https://your-site.vercel.app`
6. Check **"Allow credentials"**
7. Click **"Save"**
8. Add another origin for localhost (for local development):
   - `http://localhost:3000`
   - Allow credentials: ✓

---

## Step 8: Add Your Wife as Editor (3 minutes)

1. Go to https://sanity.io/manage
2. Select your `potshotsociety` project
3. Go to **Members** → **Invite members**
4. Enter her email address
5. Role: **Editor**
6. Click **"Send invitation"**
7. She'll receive an email to create her Sanity account

---

## Step 9: Test Production Site (2 minutes)

1. Visit your live site: `https://your-site.vercel.app`
2. Verify the test recipe appears
3. Visit: `https://your-site.vercel.app/studio`
4. Log in (you or your wife)
5. Create another recipe
6. Visit the homepage again in ~60 seconds (ISR revalidation)
7. New recipe should appear

---

## Success! 🎉

Your recipe website is now live! Share the URL with friends and family.

---

## Post-Deployment: What Your Wife Needs to Know

**To add recipes:**
1. Go to `https://your-site.vercel.app/studio`
2. Log in with her Sanity account
3. Click **"Create" → "Recipe"**
4. Fill out the form
5. Click **"Publish"**
6. Recipe appears on site within ~1 minute

**She doesn't need to know:**
- Git, GitHub, or Vercel
- How to code
- How to deploy
- Any terminal commands

**All she does is:**
- Log into the studio
- Add recipes through the visual editor
- Click publish

---

## Optional: Custom Domain (5 minutes)

Want `potshotsociety.com` instead of `potshotsociety.vercel.app`?

1. Buy domain from any registrar (Namecheap, Google Domains, etc.)
2. In Vercel dashboard:
   - Go to **Settings** → **Domains**
   - Add your domain
   - Follow the DNS configuration instructions
3. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables
4. Redeploy

**Cost**: ~$10-15/year for domain (everything else stays free)

---

## Troubleshooting

### Build fails on Vercel
- Check environment variables are set correctly
- Make sure Sanity Project ID matches

### Recipes don't appear
- Wait 60 seconds (ISR revalidation time)
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check recipe is published (not draft) in Sanity Studio

### Can't access Sanity Studio
- Add Vercel URL to Sanity CORS settings
- Check you're logged into the correct Sanity account

### "Dataset not found" error
- Verify Project ID in environment variables
- Make sure dataset is named `production`

---

## Automatic Deployments

Every time you push code to GitHub, Vercel automatically:
1. Pulls the latest code
2. Runs the build
3. Deploys the new version
4. Updates the live site

**Your wife never has to deploy anything** - her recipe changes are instant via Sanity.

---

## Need Help?

- **Vercel Issues**: https://vercel.com/docs
- **Sanity Issues**: https://www.sanity.io/help
- **GitHub Issues**: https://docs.github.com

## Summary Checklist

- [ ] Created Sanity project
- [ ] Updated `.env.local` with real Project ID
- [ ] Tested locally (recipe appears)
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Added environment variables to Vercel
- [ ] Updated `NEXT_PUBLIC_SITE_URL`
- [ ] Configured Sanity CORS
- [ ] Invited wife as Editor
- [ ] Tested production site
- [ ] Shared USER_GUIDE.md with wife

**Total time**: ~30 minutes

**Monthly cost**: $0

**Recipes you can add**: Unlimited

---

Now go forth and share delicious recipes! 🍳
