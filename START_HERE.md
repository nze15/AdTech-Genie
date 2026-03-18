# START HERE - AdTech Genie Mobile AI Agent

## Welcome!

You now have a **production-ready mobile AI code generation agent**. This document gets you started in 5 minutes.

## What Is This?

A web app where users can:
1. **Chat** with an AI about code: "Build me a navbar"
2. **See live preview** of generated HTML/CSS/JavaScript instantly
3. **Copy/Download** the code immediately
4. **Share** their creations with others

## 30-Second Quickstart

### Step 1: Get Groq API Key (2 min)
1. Go to https://console.groq.com
2. Sign up (free)
3. Create API key (copy the key)

### Step 2: Setup Local Environment (2 min)
```bash
# Copy example env
cp .env.example .env.local

# Add your Groq key
# Edit .env.local and paste: GROQ_API_KEY=gsk_your_key_here
```

### Step 3: Run It (1 min)
```bash
bun install
bun run dev
# Open http://localhost:3000/chat
```

### Step 4: Try It
1. Type: "Build a responsive navbar"
2. See generated code in 2-3 seconds
3. See live preview
4. Copy or download the code

**Done!** 🎉

## What Works Right Now

- Chat interface with message history
- AI code generation (HTML, CSS, JavaScript)
- Live preview with zoom/pan
- Copy to clipboard
- Download as HTML file
- Mobile responsive design
- Works on iPhone, Android, desktop, tablet

## What Needs Setup (Optional)

- **Supabase** - To save chat history (optional)
- **Vercel Deploy** - To go live online (recommended)

## Next: Choose Your Path

### Path 1: Explore Locally (5 min)
- Try different prompts
- Test mobile view
- Explore the UI

### Path 2: Setup Supabase (10 min)
See: `SETUP_AI_AGENT.md` (database is optional)

### Path 3: Deploy to Vercel (5 min)
See: `DEPLOYMENT.md` (live in minutes)

## File Guide

### Most Important
- **SETUP_AI_AGENT.md** - Full setup instructions
- **MOBILE_AI_AGENT_GUIDE.md** - Complete user guide
- **COMMANDS_AND_LINKS.md** - All commands and links

### For Developers
- **CHAT_FEATURE.md** - Technical architecture
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **src/app/chat/page.tsx** - Main chat interface
- **src/lib/groq.ts** - AI integration

### For Deployment
- **DEPLOYMENT.md** - Production setup
- **.env.example** - Environment variables

## Common First Questions

### Q: Do I need Supabase?
**A:** No. Supabase is optional. Chat works without it (just won't save).

### Q: How much does this cost?
**A:** 
- Groq: Free tier (50 requests/day)
- Supabase: Free tier (up to 500MB)
- Vercel: Free tier (enough for small projects)

### Q: Is it mobile-friendly?
**A:** Yes! Fully responsive. Works great on phones.

### Q: What prompts work best?
**A:** 
- "Build a navbar"
- "Create a hero section"
- "Make a card component"
- "Design a footer"
- Get creative!

### Q: How fast is it?
**A:** 2-3 seconds for most components

### Q: Can I deploy it?
**A:** Yes! See DEPLOYMENT.md

### Q: Can I customize it?
**A:** Yes! It's open source. Modify as needed.

## Troubleshooting

### "API Key not found"
→ Restart dev server after adding to .env.local

### "Preview blank"
→ Check browser console (F12), try simpler prompt

### "Slow generation"
→ Free tier has limits, wait 30 sec or try later

### "It broke"
→ See SETUP_AI_AGENT.md troubleshooting section

## Quick Commands

```bash
# Start development
bun run dev

# Check setup
node scripts/validate-setup.js

# Format code
bun run lint:fix

# Build for production
bun run build
```

## Next Steps

1. **Get API Key** - https://console.groq.com
2. **Setup .env.local** - `cp .env.example .env.local` + add key
3. **Run Locally** - `bun install && bun run dev`
4. **Visit Chat** - http://localhost:3000/chat
5. **Try a Prompt** - "Build a navbar"

## Documentation Map

```
START_HERE.md                    ← You are here
    ↓
SETUP_AI_AGENT.md               ← Setup instructions (5 min)
    ↓
MOBILE_AI_AGENT_GUIDE.md       ← Full user guide
    ↓
CHAT_FEATURE.md                 ← Technical details
    ↓
DEPLOYMENT.md                   ← Deploy to production
```

## Feature Overview

### Chat Interface
- Text input for prompts
- Message history
- Suggested prompts
- Error messages
- Loading indicators

### Code Preview
- Live HTML/CSS/JS rendering
- Zoom (0.5x to 2x)
- Pan (click and drag)
- Reset button
- Copy code button
- Download HTML button

### Mobile Features
- Full-screen chat
- Modal preview
- Touch gestures
- Responsive layout
- Mobile-optimized

## Technology Used

- **AI**: Groq (fast inference)
- **Frontend**: React, Next.js
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Database**: Supabase (optional)
- **Hosting**: Vercel (recommended)

## Success Criteria

You've set up correctly when:
1. ✓ `bun run dev` starts without errors
2. ✓ Browser opens to http://localhost:3000
3. ✓ Click "Start Coding with AI"
4. ✓ Type "Build a button"
5. ✓ Code generates in 2-3 seconds
6. ✓ See preview on screen

## What's Included

- ✓ Chat interface (mobile-first)
- ✓ AI code generation (Groq)
- ✓ Live preview
- ✓ Export options
- ✓ Database schema (optional)
- ✓ Complete documentation
- ✓ Deployment config
- ✓ Validation script

## What's Not Included (Future)

- Voice input (coming soon)
- Image recognition (coming soon)
- Real-time collaboration (coming soon)
- Component marketplace (coming soon)
- Mobile app (coming soon)

## Get Help

**Having issues?**

1. Check SETUP_AI_AGENT.md troubleshooting
2. Run `node scripts/validate-setup.js`
3. Check browser console (F12)
4. See COMMANDS_AND_LINKS.md

**Want to learn more?**

1. Read MOBILE_AI_AGENT_GUIDE.md
2. Read CHAT_FEATURE.md
3. Explore src/app/chat/page.tsx
4. Check inline code comments

## Ready?

Let's go:

```bash
# 1. Get key from https://console.groq.com
# 2. Add to .env.local
# 3. Run:
bun install
bun run dev

# 4. Open http://localhost:3000/chat
# 5. Type: "Build a navbar"
# 6. Profit!
```

---

**Questions?** See SETUP_AI_AGENT.md

**Ready to deploy?** See DEPLOYMENT.md

**Want technical details?** See CHAT_FEATURE.md

**Need all commands?** See COMMANDS_AND_LINKS.md

---

**Made with ❤️ by AdTech Genie Team**

Happy coding!
