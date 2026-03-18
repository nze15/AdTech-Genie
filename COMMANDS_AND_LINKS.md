# AdTech Genie - Commands & Links

## Quick Commands

### Development
```bash
# Install dependencies
bun install

# Start development server (auto-reload)
bun run dev
# Open: http://localhost:3000

# Run production build
bun run build

# Start production server
bun run start

# Type checking
bun run typecheck

# Linting
bun run lint
bun run lint:fix

# Format code
bun run format

# Validate setup
node scripts/validate-setup.js
```

### Deployment
```bash
# Deploy to Vercel (requires Vercel CLI)
vercel deploy

# Deploy to production
vercel deploy --prod

# View deployments
vercel list

# Check environment
vercel env ls
```

### Database
```bash
# Run Supabase setup
# 1. Go to Supabase console
# 2. Open SQL editor
# 3. Create new query
# 4. Paste content from: scripts/supabase-setup.sql
# 5. Run
```

### Docker
```bash
# Build Docker image
docker build -t adtech-genie .

# Run container
docker run -p 3000:3000 \
  -e GROQ_API_KEY=gsk_your_key \
  adtech-genie

# Stop container
docker stop <container_id>
```

## Environment Setup

### Get Groq API Key
1. Visit: https://console.groq.com
2. Sign up (free)
3. Go to API Keys
4. Create new key
5. Copy (starts with `gsk_`)
6. Add to `.env.local`: `GROQ_API_KEY=gsk_...`

### Get Supabase Keys (Optional)
1. Visit: https://supabase.com
2. Create new project
3. Go to Settings → API
4. Copy `Project URL`
5. Copy `Anon Key`
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

### Setup Supabase Database
1. Open Supabase SQL editor
2. Create new query
3. Copy `scripts/supabase-setup.sql`
4. Run query
5. Tables created automatically

## File Structure Reference

### Key Application Files
```
src/app/chat/page.tsx               # Main chat interface
src/app/chat/components/            # Chat components
src/lib/groq.ts                     # AI integration
src/lib/store.ts                    # State management
src/app/api/chat/generate/route.ts  # Generation API
```

### Configuration
```
.env.example                        # Template (copy to .env.local)
next.config.ts                      # Next.js config
tsconfig.json                       # TypeScript config
package.json                        # Dependencies
```

### Documentation
```
SETUP_AI_AGENT.md                   # 5-min setup
CHAT_FEATURE.md                     # Feature details
MOBILE_AI_AGENT_GUIDE.md           # Complete guide
README_MOBILE_AI_AGENT.md          # Project README
IMPLEMENTATION_SUMMARY.md           # What was built
COMMANDS_AND_LINKS.md              # This file
```

## URLs & Services

### Development
- Local: http://localhost:3000
- Chat: http://localhost:3000/chat
- Landing: http://localhost:3000
- Templates: http://localhost:3000/templates
- Docs: http://localhost:3000/docs

### External Services
- Groq Console: https://console.groq.com
- Groq Docs: https://console.groq.com/docs
- Supabase: https://supabase.com
- Supabase Docs: https://supabase.com/docs
- Vercel: https://vercel.com
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev

### Deployed App (After Vercel Deploy)
- Production: https://your-app.vercel.app
- Chat: https://your-app.vercel.app/chat
- API: https://your-app.vercel.app/api/chat/generate

## Common Issues & Solutions

### "GROQ_API_KEY not found"
```bash
# 1. Create .env.local
cp .env.example .env.local

# 2. Add your key
GROQ_API_KEY=gsk_your_key_here

# 3. Restart dev server
# Stop current: Ctrl+C
# Start new: bun run dev
```

### "Preview shows blank"
```bash
# Check browser console (F12 → Console)
# Look for:
# - Network errors
# - JavaScript errors
# - CORS errors

# Try simpler prompt: "just a div"
# Check generated HTML is valid
```

### "Slow code generation"
```bash
# Free tier has rate limits
# Wait 30 seconds between requests
# Use more specific prompts

# Check Groq status: https://status.groq.com
```

### "Can't install dependencies"
```bash
# Use Bun (faster)
bun install

# Or use npm
npm install

# Clear cache if issues
rm -rf node_modules
bun install  # or npm install
```

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 bun run dev

# Or kill process
# On Unix/Mac:
lsof -i :3000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Testing Checklist

### Local
- [ ] `bun run dev` starts without errors
- [ ] http://localhost:3000 loads
- [ ] Click "Start Coding with AI"
- [ ] Chat interface appears
- [ ] Type "Build a navbar"
- [ ] Code generates in 2-5 seconds
- [ ] Preview shows navbar
- [ ] Can zoom/pan preview
- [ ] Copy button works
- [ ] Download button works

### Mobile
- [ ] Responsive on small screens
- [ ] Chat takes full width
- [ ] Input is easy to type
- [ ] Preview modal opens
- [ ] Can scroll chat history
- [ ] Buttons easy to tap

### Production (Vercel)
- [ ] Deploy successful
- [ ] Env vars configured
- [ ] Chat works on prod URL
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Share link works

## Performance Monitoring

### Check Build Size
```bash
bun run build
# Output shows size breakdown
```

### Check Lighthouse
```bash
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Click "Analyze page load"
# 4. Target: 90+ score
```

### Check Performance
```javascript
// In browser console
performance.mark('start');
// ... do something ...
performance.mark('end');
performance.measure('test', 'start', 'end');
console.log(performance.getEntriesByName('test'));
```

## Git Workflow

### Clone & Setup
```bash
git clone https://github.com/nze15/AdTech-Genie.git
cd AdTech-Genie
bun install
cp .env.example .env.local
# Add GROQ_API_KEY to .env.local
bun run dev
```

### Make Changes
```bash
git checkout -b feature/my-feature
# Make changes
bun run lint:fix
git add .
git commit -m "Add my feature"
git push origin feature/my-feature
# Create Pull Request on GitHub
```

### Deploy
```bash
git push origin main
# Vercel deploys automatically
```

## Useful Keyboard Shortcuts

### Browser (F12 DevTools)
- `Ctrl+Shift+C` (Windows/Linux) / `Cmd+Shift+C` (Mac) - Inspect element
- `Ctrl+Shift+J` - Open console
- `Ctrl+Shift+I` - Open DevTools
- `F5` - Reload page
- `Ctrl+Shift+Delete` - Clear cache

### Code Editor (VS Code)
- `Ctrl+S` - Save
- `Ctrl+/` - Toggle comment
- `Shift+Alt+F` - Format document
- `Ctrl+F` - Find
- `Ctrl+H` - Find and replace

### General
- `Ctrl+C` - Stop dev server
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo

## Learning Resources

### Getting Started
1. Read: `SETUP_AI_AGENT.md` (5 min)
2. Try: Run locally and chat
3. Read: `CHAT_FEATURE.md` (10 min)
4. Explore: Code files

### Deep Dive
1. Read: `MOBILE_AI_AGENT_GUIDE.md`
2. Read: `IMPLEMENTATION_SUMMARY.md`
3. Study: src/lib/groq.ts
4. Study: src/lib/store.ts
5. Study: src/app/chat/page.tsx

### Production Ready
1. Read: `DEPLOYMENT.md`
2. Setup: Supabase (optional)
3. Test: All features
4. Deploy: To Vercel
5. Monitor: Performance

## Directory Shortcuts

```bash
# Jump to common locations
cd src/app/chat              # Chat interface
cd src/lib                   # Libraries
cd src/app/api               # API routes
cd scripts                   # Utility scripts
cd public                    # Static files
```

## Verification Checklist

### Before Deploying
- [ ] All env vars set
- [ ] No console errors
- [ ] Code generation works
- [ ] Preview renders
- [ ] Mobile responsive
- [ ] Lighthouse score > 80
- [ ] No security warnings

### After Deploying
- [ ] URL accessible
- [ ] Chat works
- [ ] Code generates
- [ ] Preview works
- [ ] Mobile works
- [ ] Share link works
- [ ] Monitor errors

## Support Resources

### If You Get Stuck
1. Check browser console (F12)
2. Run: `node scripts/validate-setup.js`
3. Check: `.env.local` has all vars
4. Restart: `bun run dev`
5. Read: Relevant docs
6. Search: GitHub Issues

### Further Help
- GitHub: Report issue
- Docs: See SETUP_AI_AGENT.md
- Email: support@adtech-genie.dev (coming)
- Twitter: @AdTechGenie (coming)

## Useful Links

### Documentation (In Project)
- [Setup Guide](./SETUP_AI_AGENT.md)
- [Chat Feature](./CHAT_FEATURE.md)
- [Mobile Guide](./MOBILE_AI_AGENT_GUIDE.md)
- [Project README](./README_MOBILE_AI_AGENT.md)
- [Implementation](./IMPLEMENTATION_SUMMARY.md)
- [Deployment](./DEPLOYMENT.md)

### External Documentation
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

**Last Updated**: March 18, 2026
**Status**: Production Ready
**Version**: 1.0.0
