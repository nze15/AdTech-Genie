# AdTech Genie — AI Agent MVP

An AI-powered multi-tool workspace featuring real-time streaming chat, AI image editing/generation, and an intelligent code editor. Built with Vite + React + TypeScript + Tailwind CSS v4 + Blink SDK.

---

## Features

- **AI Chat** — Streaming conversations with AdTech Genie, specialized for advertising technology, campaigns, and marketing strategy
- **Image AI** — Upload images to edit with AI prompts, or generate new images from text descriptions
- **Code AI** — Write, explain, debug, and optimize code across all major programming languages with syntax highlighting
- **Dashboard** — Central hub with tool cards and quick-start tips
- **Auth** — Blink SDK managed authentication (Google, GitHub, email)
- **Dark theme** — Premium cyberpunk-inspired interface (deep navy + electric violet)
- **Mobile responsive** — Bottom navigation bar on mobile, collapsible sidebar on desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite 8 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config) |
| UI Components | shadcn/ui components (custom themed) |
| Fonts | Space Grotesk + IBM Plex Mono |
| Auth | Blink SDK (managed mode) |
| AI | Blink SDK — `streamText`, `generateImage`, `modifyImage` |
| Storage | Blink SDK — `storage.upload` |
| State | React Query v5 + local state |
| Routing | React Router DOM v7 |
| Icons | Lucide React |

---

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- A [Blink](https://blink.new) account with a project

### 1. Clone and install

```bash
git clone https://github.com/nze15/AdTech-Genie
cd AdTech-Genie
npm install
# or
bun install
```

### 2. Configure environment

Create a `.env.local` file:

```env
VITE_BLINK_PROJECT_ID=your-project-id
VITE_BLINK_PUBLISHABLE_KEY=blnk_pk_your-key
```

These values are found in your Blink workspace dashboard under **Settings → API Keys**.

### 3. Run development server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Production Build

```bash
npm run build
```

Output: `dist/` folder ready for static hosting.

---

## Deployment Options

### Option 1: Blink Hosting (Recommended)

Click **Publish** in the Blink editor. Your app deploys to `{projectId}.live.blink.new`.

### Option 2: Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

Or connect your GitHub repo and set:
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: `VITE_BLINK_PROJECT_ID`, `VITE_BLINK_PUBLISHABLE_KEY`

Add `public/_redirects`:
```
/*  /index.html  200
```
(Already included in this repo)

### Option 3: Vercel

```bash
npm install -g vercel
vercel --prod
```

Add environment variables in Vercel dashboard. The SPA redirects are handled automatically.

### Option 4: Cloudflare Pages

Connect your GitHub repo in Cloudflare Pages:
- Build command: `npm run build`
- Build output directory: `dist`
- Set env variables in Settings → Environment Variables

### Option 5: Self-hosted (Docker)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

`nginx.conf`:
```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## Project Structure

```
src/
├── blink/
│   └── client.ts          # Blink SDK initialization
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx   # Root layout wrapper
│   │   ├── Header.tsx     # Top header bar
│   │   ├── Sidebar.tsx    # Desktop sidebar navigation
│   │   └── MobileNav.tsx  # Mobile bottom navigation
│   └── ui/                # shadcn/ui components (themed)
├── hooks/
│   └── useAuth.ts         # Auth state hook
├── pages/
│   ├── Dashboard.tsx      # Home / dashboard
│   ├── ChatPage.tsx       # AI Chat with streaming
│   ├── ImagePage.tsx      # Image AI editor
│   └── CodePage.tsx       # Code AI editor
├── lib/
│   └── utils.ts           # cn() utility
├── index.css              # Tailwind v4 design tokens + global styles
├── App.tsx                # Router + providers
└── main.tsx               # App entry point
```

---

## AI Features

### Chat Streaming
Uses `blink.ai.streamText` with a system prompt tuned for AdTech/marketing use cases. Supports abort via `AbortController`.

### Image AI
- **Edit existing image**: Upload → prompt → `blink.ai.modifyImage`
- **Generate new**: Text prompt → `blink.ai.generateImage`
- Files are uploaded to Blink Storage before passing the public URL to the AI

### Code AI
- Full code editor textarea with language selection
- Actions: Explain, Find Bugs, Optimize, Complete/Extend
- Uses `blink.ai.streamText` with a code-specialized system prompt
- Streaming output with blinking cursor

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_BLINK_PROJECT_ID` | ✅ | Your Blink project ID |
| `VITE_BLINK_PUBLISHABLE_KEY` | ✅ | Client-safe publishable key |

These are automatically injected by Blink in the sandbox environment.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint check |

---

## Customization

### Colors / Theme
Edit `src/index.css` — the `@theme` block contains all design tokens:
- `--color-primary` — violet accent (263 74% 57%)
- `--color-accent` — cyan accent (192 91% 43%)
- `--color-background` — deep dark navy

### System Prompt
Edit `SYSTEM_PROMPT` in `src/pages/ChatPage.tsx` to customize the AI persona.

### Adding New Pages
1. Create `src/pages/NewPage.tsx`
2. Add a `<Route>` in `src/App.tsx`
3. Add to `navItems` in `src/components/layout/Sidebar.tsx` and `MobileNav.tsx`

---

## License

MIT
