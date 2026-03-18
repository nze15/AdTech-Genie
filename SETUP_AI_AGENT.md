# AdTech Genie: Mobile AI Agent Setup Guide

## Quick Start (5 minutes)

### 1. Get API Keys

**Groq API Key** (for AI code generation):
- Go to https://console.groq.com
- Sign up/login
- Create an API key
- Copy the key

**Supabase** (for data persistence):
- Go to https://supabase.com
- Create a new project
- Get `Project URL` and `Anon Key` from Settings → API
- (Optional: Get `Service Role Key` for server-side operations)

### 2. Set Environment Variables

Create `.env.local` file in project root:

```bash
# Groq AI
GROQ_API_KEY=gsk_your_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Setup Database (Optional but Recommended)

If using Supabase:

1. Open Supabase SQL Editor
2. Create new query
3. Copy content from `scripts/supabase-setup.sql`
4. Run the query

This creates tables for:
- Conversations (chat history)
- Messages (individual messages)
- Generated components (saved code)

### 4. Run Locally

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Open http://localhost:3000
# Click "Start Coding with AI"
```

### 5. Try It Out

Start with simple prompts:
- "Build a responsive navbar"
- "Create a hero section"
- "Make a card component"
- "Design a footer"

## Features Overview

### Chat Interface
- **Full-screen on mobile** - Chat takes up entire screen on phones
- **Split view on desktop** - Chat on left, live preview on right
- **Suggested prompts** - Quick-start templates

### Live Preview
- **Real-time rendering** - See HTML/CSS/JS instantly
- **Pinch to zoom** - Mobile gesture support
- **Drag to pan** - Reposition viewport
- **Copy/Download** - Export code as HTML file

### Code Generation
- **AI-powered** - Uses Groq's fast inference
- **Multiple formats** - HTML, CSS, JavaScript
- **Responsive design** - Mobile-first by default
- **Production-ready** - Clean, optimized code

## Troubleshooting

### "API key not found"
- Check `.env.local` has `GROQ_API_KEY`
- Verify key is correct (should start with `gsk_`)
- Restart dev server after adding env vars

### "Supabase connection error"
- Check `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify URLs match your Supabase project
- Try running without Supabase first (data won't persist)

### "Code generation takes too long"
- Groq uses free tier rate limits
- Wait 30 seconds between requests
- Use shorter, more specific prompts

### "Preview not updating"
- Check browser console for errors
- Refresh page
- Try a different prompt

## Advanced Setup

### Database-Backed Conversations
To enable saving conversations:

1. Setup Supabase (see above)
2. Run database migration
3. In future: chat will auto-save to Supabase

### One-Tap Vercel Deploy (Coming Soon)
To deploy generated code directly:

1. Get Vercel token from Settings
2. Add `VERCEL_TOKEN` to `.env.local`
3. Click "Deploy" button in preview
4. Share generated URL

### Custom AI Prompts
Edit `src/lib/groq.ts` `systemPrompt` to customize:
- Code style (Tailwind vs CSS)
- Component types preferred
- Response format

### Mobile PWA (Coming Soon)
Make app installable on home screen:

1. Enable PWA in deployment settings
2. Add to home screen on mobile
3. Works offline with cached models

## Performance Tips

1. **Shorter prompts** - "navbar" generates faster than "build me a beautiful navbar with animations"
2. **Specific requests** - "card with image and button" > "component"
3. **Batch requests** - Generate multiple components, then combine manually

## Next Steps

1. **Deploy to production** - `vercel deploy`
2. **Add authentication** - Protect conversations
3. **Share components** - Gallery/marketplace feature
4. **Voice input** - "Build me a navbar" via microphone
5. **Image generation** - AI generates preview images

## Resources

- **Groq Docs**: https://console.groq.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Support

Issues? Check:
1. All env vars set correctly
2. API keys are valid
3. Browser console for error details
4. Restart dev server after changes

Happy coding!
