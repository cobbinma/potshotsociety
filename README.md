# 🍲 Pot Shot Society

A modern recipe-sharing website for food lovers who can't code. Built with Next.js, TypeScript, and Sanity CMS - because great recipes deserve a great home.

## ✨ Features

- 📝 **No-Code CMS** - Sanity Studio makes adding recipes as easy as writing an email
- 🔍 **Smart Search** - Find recipes instantly with real-time search and filters
- 📱 **Mobile-First** - Gorgeous on phones, tablets, and desktops
- 🖨️ **Print-Ready** - Clean layouts perfect for printing
- 📹 **Instagram Videos** - Embed recipe videos directly from Instagram
- ⚡ **Lightning Fast** - Next.js magic for instant page loads
- 🎯 **SEO Optimized** - Google-ready with recipe schema markup
- 💰 **100% Free** - Vercel + Sanity free tiers = zero hosting costs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Free [Sanity](https://sanity.io) account
- Free [Vercel](https://vercel.com) account (for deployment)

### Setup in 5 Minutes

1. **Clone & Install**
   ```bash
   git clone <your-repo>
   cd potshotsociety
   bun install
   ```

2. **Create Sanity Project**
   - Visit [sanity.io/manage](https://sanity.io/manage)
   - Create new project → Copy your Project ID

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Add your Sanity Project ID to `.env.local`

4. **Run It!**
   ```bash
   bun dev
   ```
   - Site: [localhost:3000](http://localhost:3000)
   - Admin: [localhost:3000/studio](http://localhost:3000/studio)

## 👨‍🍳 Adding Recipes (No Coding Required!)

1. Open `yoursite.com/studio` and log in
2. Click **Create → Recipe**
3. Fill in the details:
   - Upload mouth-watering photos 📸
   - Add ingredients and instructions
   - Select categories (Desserts, Quick & Easy, etc.)
   - Optional: Add Instagram video URL for video tutorials
4. Hit **Publish** - your recipe goes live in ~1 minute!

**Pro tip:** Use the Instagram video feature to show off your cooking skills! Just paste your Instagram Reel URL.

## 📦 Tech Stack

- Next.js 14 • TypeScript • Tailwind CSS 4 • Sanity CMS • Vercel • Lucide Icons

## 🗂️ Recipe Categories

Breakfast & Brunch • Appetizers & Snacks • Main Dishes • Side Dishes • Soups & Salads • Desserts • Breads & Baking • Drinks & Beverages • Sauces & Condiments • Quick & Easy • Vegetarian • Kid-Friendly

## 🚢 Deploy to Vercel

1. Push to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import repo and add environment variables
4. Deploy! 🎉

Auto-deploys on every push to main.

## 💡 Free Tier Limits

**Sanity:** 3 users, 5GB storage, 10GB bandwidth  
**Vercel:** Unlimited bandwidth for personal projects

Perfect for sharing recipes with family and friends!

## 🐛 Troubleshooting

- **No recipes showing?** Make sure they're published (not drafts) in Sanity Studio
- **Images not loading?** Check `cdn.sanity.io` is in `next.config.ts` remotePatterns
- **Connection issues?** Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`

## 📚 Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

Made with ❤️ for home cooks everywhere
