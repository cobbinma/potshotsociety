# AI Agents for Pot Shot Society

This document describes the AI agents and automation capabilities built into the Pot Shot Society recipe website.

## Overview

Pot Shot Society is designed with a modern, headless CMS architecture that enables powerful automation and AI agent integration possibilities.

## Current Architecture

### Content Management Layer (Sanity CMS)
- **Headless CMS**: Sanity provides a fully API-driven content layer
- **Real-time Updates**: Webhooks available for content changes
- **Structured Data**: Recipe schema with typed fields
- **Image Pipeline**: Automatic image optimization via Sanity CDN

### Frontend Layer (Next.js)
- **React Server Components**: Efficient data fetching
- **Incremental Static Regeneration**: Auto-updates content every 60 seconds
- **API Routes**: Available for custom endpoints
- **Edge-ready**: Can deploy to edge networks

## Potential AI Agent Integrations

### 1. Recipe Import Agent

**Purpose**: Automatically convert recipes from various sources into structured format

**Capabilities**:
- Parse recipe URLs (from popular sites like AllRecipes, NYT Cooking, etc.)
- Extract recipe data using web scraping or APIs
- Convert ingredient lists to standardized format
- Generate appropriate categories automatically
- Download and optimize recipe images

**Implementation Path**:
```typescript
// api/agents/import-recipe/route.ts
// Accept URL, scrape content, parse with AI, create in Sanity
```

**Potential Tools**:
- OpenAI GPT-4 for parsing unstructured recipes
- Recipe scraper libraries (recipe-scrapers)
- Sanity client for content creation

### 2. Recipe Enhancement Agent

**Purpose**: Improve existing recipes with AI-generated content

**Capabilities**:
- Generate recipe descriptions if missing
- Suggest complementary categories
- Create recipe variations (e.g., vegetarian version)
- Calculate nutritional information
- Generate cooking tips and substitutions
- Suggest wine pairings

**Implementation Path**:
```typescript
// Sanity webhook → Cloud function → AI processing → Update recipe
```

### 3. Recipe Search Agent

**Purpose**: Intelligent recipe discovery beyond keyword search

**Capabilities**:
- Natural language queries ("I have chicken and tomatoes, what can I make?")
- Dietary restriction filtering (automatically detect allergens)
- Ingredient-based search
- Cooking time and difficulty matching
- Seasonal recipe recommendations

**Implementation Path**:
- Integrate vector database (Pinecone, Weaviate)
- Generate embeddings for recipe content
- AI-powered semantic search

### 4. Recipe Organization Agent

**Purpose**: Automatically organize and tag recipes

**Capabilities**:
- Auto-categorization based on ingredients/methods
- Detect cuisine types automatically
- Tag seasonal recipes
- Identify dietary attributes (vegan, gluten-free, etc.)
- Suggest related recipes

**Implementation Path**:
- Batch process existing recipes
- Run on new recipe creation via webhook
- Use classification models (GPT-4, Claude)

### 5. Image Enhancement Agent

**Purpose**: Improve recipe photography automatically

**Capabilities**:
- Auto-crop and optimize recipe photos
- Remove backgrounds
- Enhance colors and brightness
- Generate multiple aspect ratios
- Create social media preview images

**Implementation Path**:
- Sanity asset webhook → Image processing API
- Use services like Cloudinary AI, Remove.bg
- DALL-E for generating missing recipe images

### 6. Meal Planning Agent

**Purpose**: Create personalized meal plans

**Capabilities**:
- Weekly meal plan generation
- Shopping list creation from multiple recipes
- Dietary preference consideration
- Budget optimization
- Seasonal ingredient preferences

**Implementation Path**:
```typescript
// New API route: /api/meal-planner
// Input: preferences, timeframe
// Output: curated recipe list + shopping list
```

### 7. Recipe Conversion Agent

**Purpose**: Convert recipe measurements and formats

**Capabilities**:
- Metric ↔ Imperial conversion
- Serving size adjustment
- Temperature conversion (F ↔ C)
- Volume to weight conversions
- Recipe scaling with intelligent rounding

**Implementation Path**:
- Client-side agent (JavaScript)
- Real-time conversion without page reload
- Preserve original recipe in Sanity

### 8. Social Sharing Agent

**Purpose**: Optimize recipes for social media

**Capabilities**:
- Generate share-worthy recipe cards (images with text overlay)
- Create short-form recipe videos (TikTok/Reels style)
- Write engaging social media captions
- Auto-post to social platforms (with approval)
- A/B test different sharing formats

**Implementation Path**:
- Background job triggered on publish
- Image generation with Canvas API or Puppeteer
- Integration with Buffer, Hootsuite, or native APIs

### 9. Recipe Feedback Agent

**Purpose**: Learn from user interactions and improve recommendations

**Capabilities**:
- Track recipe views, prints, shares
- Identify trending recipes
- Suggest recipe improvements based on user behavior
- Personalized recipe recommendations
- Email digest of popular recipes

**Implementation Path**:
- Analytics integration (Vercel Analytics, Plausible)
- Edge middleware for tracking
- ML model for recommendations

### 10. Recipe Chat Agent

**Purpose**: Interactive recipe assistance

**Capabilities**:
- Answer questions about recipes ("Can I substitute butter with oil?")
- Provide cooking technique guidance
- Troubleshoot issues ("My dough isn't rising")
- Suggest ingredient substitutions
- Real-time cooking assistance

**Implementation Path**:
```typescript
// Chat widget on recipe pages
// Powered by OpenAI Assistant API
// Context: current recipe + cooking knowledge base
```

## Implementation Priorities

### Phase 1: Quick Wins (1-2 days each)
1. **Recipe Conversion Agent** - Client-side, high value
2. **Recipe Enhancement Agent** - Improve existing content
3. **Auto-categorization** - Batch process recipes

### Phase 2: User Value (1 week each)
4. **Recipe Search Agent** - Better discovery
5. **Meal Planning Agent** - High engagement feature
6. **Recipe Chat Agent** - Interactive help

### Phase 3: Growth Features (2-3 weeks)
7. **Recipe Import Agent** - Rapid content growth
8. **Social Sharing Agent** - Audience expansion
9. **Image Enhancement Agent** - Professional appearance

## Technical Architecture for Agents

### Recommended Stack

```
┌─────────────────────────────────────────┐
│           Sanity CMS (Content)          │
│  - Recipe data                          │
│  - Webhooks on content changes          │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│       Next.js API Routes (Agents)       │
│  - /api/agents/enhance                  │
│  - /api/agents/import                   │
│  - /api/agents/chat                     │
└─────────────┬───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         AI Services Layer               │
│  - OpenAI (GPT-4)                       │
│  - Anthropic (Claude)                   │
│  - Vector DB (embeddings)               │
│  - Image processing APIs                │
└─────────────────────────────────────────┘
```

### Environment Variables Needed

```bash
# AI Services
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Vector Database (optional)
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...

# Image Processing (optional)
CLOUDINARY_URL=...
REMOVE_BG_API_KEY=...

# Sanity (already configured)
NEXT_PUBLIC_SANITY_PROJECT_ID=...
SANITY_API_TOKEN=... # For write access (agents)
```

## Example Agent Implementation

### Simple Recipe Enhancement Agent

```typescript
// app/api/agents/enhance/route.ts
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { client } from '@/sanity/lib/client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { recipeId } = await req.json()
  
  // Fetch recipe from Sanity
  const recipe = await client.fetch(
    `*[_type == "recipe" && _id == $recipeId][0]`,
    { recipeId }
  )
  
  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
  }
  
  // Generate enhanced description
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a professional food writer. Generate an engaging, mouth-watering recipe description in 2-3 sentences.',
      },
      {
        role: 'user',
        content: `Recipe: ${recipe.title}\nIngredients: ${recipe.ingredients.map(i => i.item).join(', ')}`,
      },
    ],
  })
  
  const enhancedDescription = completion.choices[0].message.content
  
  // Update recipe in Sanity
  await client
    .patch(recipeId)
    .set({ description: enhancedDescription })
    .commit()
  
  return NextResponse.json({
    success: true,
    description: enhancedDescription,
  })
}
```

### Usage

```typescript
// Call from admin panel or automated job
fetch('/api/agents/enhance', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ recipeId: 'recipe-123' })
})
```

## Agent Workflow Patterns

### Pattern 1: Real-time Enhancement
```
User publishes recipe → Webhook → Agent enhances → Updates recipe
```

### Pattern 2: Batch Processing
```
Scheduled job → Fetch all recipes → Process each → Update in parallel
```

### Pattern 3: On-demand Assistance
```
User requests → Agent processes → Real-time response → No persistence
```

## Cost Considerations

### Free Tier Options
- **OpenAI**: Pay-per-use (GPT-4: ~$0.03/1K tokens)
- **Anthropic Claude**: Pay-per-use (similar pricing)
- **Vector Databases**: Many have free tiers (Pinecone: 1 free index)

### Estimated Monthly Costs (Low-Medium Usage)
- **Recipe Enhancement**: ~$10-20/month (assuming 100-200 recipes)
- **Chat Agent**: ~$20-50/month (depending on interactions)
- **Search Agent**: ~$5-10/month (embeddings + queries)

**Total**: $35-80/month for full AI agent suite

### Optimization Strategies
- Cache AI responses for common queries
- Use smaller models for simple tasks (GPT-3.5 instead of GPT-4)
- Batch process recipes during off-peak hours
- Set rate limits on interactive features

## Security & Best Practices

1. **API Key Management**
   - Store keys in environment variables
   - Never commit keys to Git
   - Use different keys for dev/prod

2. **Rate Limiting**
   - Implement rate limits on agent endpoints
   - Prevent abuse of AI services
   - Use Vercel Edge Config for limits

3. **Content Validation**
   - Validate AI-generated content before publishing
   - Implement content filters for inappropriate content
   - Allow human review for sensitive operations

4. **Error Handling**
   - Graceful degradation if AI services are down
   - Retry logic with exponential backoff
   - Comprehensive logging for debugging

## Future Vision

### Fully Autonomous Recipe Platform

Imagine a future where:
- **Content Curation**: AI automatically discovers and imports trending recipes
- **Quality Control**: AI evaluates recipe quality and suggests improvements
- **Personalization**: Each user sees a personalized recipe feed
- **Smart Notifications**: "You have chicken expiring soon - here are 3 recipes"
- **Voice Cooking**: "Hey Pot Shot, walk me through this recipe step-by-step"
- **Community Intelligence**: AI learns from thousands of users cooking the same recipe

### Human + AI Collaboration

Your wife uploads a recipe → AI suggests:
- Better category tags
- Enhanced description
- Related recipes to link
- Optimal posting time (based on audience)
- Social media caption variants

She reviews, approves, and publishes with one click.

## Getting Started with Agents

### Step 1: Choose Your First Agent
Start with **Recipe Conversion Agent** (easiest, high value)

### Step 2: Set Up AI Service
```bash
# Add to .env.local
OPENAI_API_KEY=your-key-here
```

### Step 3: Create Agent Route
```bash
mkdir -p app/api/agents/convert
touch app/api/agents/convert/route.ts
```

### Step 4: Test Agent
```bash
curl -X POST http://localhost:3000/api/agents/convert \
  -H "Content-Type: application/json" \
  -d '{"recipeId": "test-123", "targetUnit": "metric"}'
```

### Step 5: Integrate in UI
Add a "Convert to Metric" button on recipe pages

## Conclusion

Pot Shot Society has a solid foundation for AI agent integration. The headless CMS architecture, API-driven approach, and modern frontend make it easy to add intelligent automation without disrupting the user experience.

Start with simple agents that provide immediate value (recipe conversion, enhancement) and gradually build toward more sophisticated features (meal planning, chat assistance).

The key is to keep your wife's workflow simple while leveraging AI behind the scenes to make the platform smarter, faster, and more valuable to users.

---

**Questions or ideas for agents?** Add them to this document and implement incrementally!
