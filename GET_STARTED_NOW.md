# Get Started in 3 Minutes ⚡

## Step 1: Install (30 seconds)
```bash
bun install
```

## Step 2: Configure (1 minute)
```bash
# Create environment file
cp .env.example .env.local

# Add your Groq API key
# Get free key at: https://console.groq.com
echo "GROQ_API_KEY=gsk_your_key_here" >> .env.local
```

## Step 3: Run (30 seconds)
```bash
bun run dev
```

## Step 4: Visit (instantly)
```
http://localhost:3000          # Landing page
http://localhost:3000/chat     # AI code generator
```

---

## Try These Prompts

1. **"Build a responsive navbar"**
2. **"Create a hero section with CTA button"**
3. **"Make a pricing table with 3 tiers"**
4. **"Design a footer with links"**
5. **"Build a contact form"**

---

## Troubleshooting

### "Port 3000 in use?"
```bash
bun run dev -- -p 3001
```

### "Still getting errors?"
```bash
rm -rf node_modules .next bun.lockb
bun install
bun run dev
```

### "API key not working?"
1. Get key from https://console.groq.com
2. Make sure it's in `.env.local` (not `.env`)
3. Save file
4. Restart server: `Ctrl+C` then `bun run dev`

---

## What You Get

✓ Full-screen chat interface  
✓ Live HTML/CSS/JS preview  
✓ AI-powered code generation (Groq)  
✓ Real-time updates  
✓ Copy-to-clipboard  
✓ Fully responsive mobile UI  
✓ Production-ready code output  

**Ready? Start the dev server now!**
