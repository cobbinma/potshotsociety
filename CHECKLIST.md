# Deployment Checklist - Pot Shot Society

Use this checklist to ensure everything is set up correctly before going live.

## ✅ Pre-Deployment Checklist

### 1. Sanity Setup
- [ ] Created Sanity account at https://sanity.io
- [ ] Created new project named "potshotsociety"
- [ ] Selected "production" dataset
- [ ] Copied Project ID (looks like `abc123xy`)
- [ ] Updated `.env.local` with real Project ID
- [ ] Ran `bunx sanity init` successfully

### 2. Local Testing
- [ ] Ran `bun install` (all dependencies installed)
- [ ] Ran `bun dev` (server starts successfully)
- [ ] Opened http://localhost:3000 (homepage loads)
- [ ] Opened http://localhost:3000/studio (Sanity Studio loads)
- [ ] Logged into Studio successfully
- [ ] Created a test recipe
- [ ] Test recipe appears on homepage
- [ ] Clicked on test recipe (detail page loads)
- [ ] Tested search functionality
- [ ] Tested category filter
- [ ] Tested print button
- [ ] Tested share button
- [ ] Verified responsive design on mobile (Chrome DevTools)

### 3. Code Quality
- [ ] Ran `bun run build` (build succeeds)
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] All images load correctly
- [ ] Navigation works properly

### 4. Content Preparation
- [ ] Wife has Sanity account
- [ ] Wife added as project member (Editor role)
- [ ] Wife tested adding a recipe
- [ ] Wife comfortable with the interface
- [ ] Shared USER_GUIDE.md with wife

### 5. GitHub Setup
- [ ] Created GitHub repository
- [ ] Initialized git: `git init`
- [ ] Added files: `git add .`
- [ ] First commit: `git commit -m "Initial commit"`
- [ ] Added remote: `git remote add origin [URL]`
- [ ] Pushed to GitHub: `git push -u origin main`

### 6. Vercel Deployment
- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Added environment variable: `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Added environment variable: `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Added environment variable: `NEXT_PUBLIC_SANITY_API_VERSION`
- [ ] Clicked "Deploy"
- [ ] Deployment succeeded
- [ ] Copied live URL (e.g., `potshotsociety.vercel.app`)

### 7. Post-Deployment Verification
- [ ] Visited live site URL
- [ ] Homepage loads correctly
- [ ] Recipes display properly
- [ ] Search works
- [ ] Category filter works
- [ ] Recipe detail pages load
- [ ] Images display correctly
- [ ] Opened `[yoursite]/studio`
- [ ] Studio loads on live site
- [ ] Logged in successfully
- [ ] Added a recipe on live site
- [ ] Recipe appears on live site (wait ~1 minute)
- [ ] Tested sharing URL with another device
- [ ] Tested print functionality
- [ ] Verified mobile responsiveness

### 8. Access & Permissions
- [ ] Wife can access live Studio URL
- [ ] Wife can log in to Studio
- [ ] Wife can create recipes
- [ ] Wife can edit recipes
- [ ] Wife can publish recipes
- [ ] Wife has USER_GUIDE.md for reference

### 9. Monitoring Setup
- [ ] Bookmarked Sanity dashboard: https://sanity.io/manage
- [ ] Bookmarked Vercel dashboard: https://vercel.com/dashboard
- [ ] Checked Sanity usage (should be near 0% initially)
- [ ] Checked Vercel usage
- [ ] Set up email alerts in Sanity (optional)

### 10. Documentation
- [ ] README.md reviewed
- [ ] USER_GUIDE.md shared with wife
- [ ] DEPLOYMENT.md bookmarked for future reference
- [ ] QUICKSTART.md completed
- [ ] PROJECT_SUMMARY.md reviewed

## 🚨 Troubleshooting Quick Fixes

### Site not loading
```bash
# Check environment variables in Vercel dashboard
# Make sure NEXT_PUBLIC_SANITY_PROJECT_ID is correct
# Redeploy from Vercel dashboard
```

### Studio not accessible
```bash
# Verify URL is: yoursite.com/studio (not /admin)
# Check that you're logged into Sanity
# Try clearing browser cache
```

### Recipes not showing
```bash
# Verify recipes are published (not drafts) in Studio
# Wait 1-2 minutes for ISR revalidation
# Check browser console for errors
```

### Build failing on Vercel
```bash
# Check build logs in Vercel dashboard
# Verify all environment variables are set
# Make sure latest code is pushed to GitHub
```

## 🎉 Launch Checklist

- [ ] All above items completed
- [ ] Test recipe created and visible
- [ ] Wife successfully added a recipe
- [ ] Shared first recipe URL with friends/family
- [ ] Received positive feedback
- [ ] Site is live and working perfectly!

## 📞 Need Help?

If you encounter issues:
1. Check the specific section in README.md
2. Review DEPLOYMENT.md for detailed steps
3. Visit Sanity docs: https://www.sanity.io/docs
4. Visit Vercel docs: https://vercel.com/docs

## 🎯 Success!

When all items are checked, your recipe-sharing website is:
- ✅ Live on the internet
- ✅ Completely free to run
- ✅ Easy for your wife to manage
- ✅ Ready to share with the world

Congratulations! 🎊🍳
