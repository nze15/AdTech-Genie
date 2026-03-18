# AdTech Genie - Quick Start Guide

## 30 Second Setup

```bash
# Clone and install
git clone <repo-url>
cd AdTech-Genie
bun install

# Run locally
bun run dev

# Open browser
open http://localhost:3000
```

## Key URLs (Local Development)

- Home: http://localhost:3000
- Generator: http://localhost:3000/generator
- Templates: http://localhost:3000/templates
- Projects: http://localhost:3000/projects
- Docs: http://localhost:3000/docs
- API Health: http://localhost:3000/api/health

## Essential Commands

```bash
bun run dev            # Development server
bun run build          # Production build
bun run start          # Start production server
bun run typecheck      # Check types
bun run lint           # Lint code
bun run lint:fix       # Fix linting issues
bun run test           # Run tests
```

## Project Structure

```
src/
├── app/              # Pages and API routes
├── components/       # React components
├── hooks/            # Custom hooks (SWR)
├── lib/              # Database, templates, utils
└── types/            # TypeScript types
```

## Creating New Pages

1. Create file: `src/app/[route]/page.tsx`
2. Add layout if needed
3. Import components

```typescript
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Page() {
  return (
    <>
      <Header />
      <main>Your content</main>
      <Footer />
    </>
  );
}
```

## Creating New Components

```typescript
// src/components/my-component.tsx
interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export function MyComponent({ title, onClick }: MyComponentProps) {
  return <button onClick={onClick}>{title}</button>;
}
```

## Creating API Routes

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed' },
      { status: 500 }
    );
  }
}
```

## Using Real-Time Data Fetching

```typescript
'use client';

import { useProjects } from '@/hooks/use-projects';

export function ProjectsList() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;

  return (
    <ul>
      {projects.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

## Styling with Tailwind

```typescript
// ✅ Good - Use Tailwind utilities
<div className="rounded-lg bg-primary px-4 py-2 text-white">
  Button
</div>

// Use responsive prefixes
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## Environment Setup

```bash
# Copy example env
cp .env.example .env.local

# Edit .env.local with your values
# Requires for production:
# - DATABASE_URL (if using database)
# - NEXTAUTH_SECRET (if using auth)
# - Any API keys
```

## Deployment (Vercel)

```bash
# Option 1: CLI
vercel

# Option 2: GitHub
# Push to GitHub, then connect at vercel.com

# Set environment variables in Vercel dashboard
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)

# Or use different port
bun run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache
rm -rf .next

# Rebuild
bun run build
```

### Type Errors
```bash
# Type check
bun run typecheck

# Fix issues
# Most are obvious from error messages
```

### API Not Responding
```bash
# Check health endpoint
curl http://localhost:3000/api/health

# Check console for errors
# Verify environment variables
```

## Testing API Endpoints

### Generate Code
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "landing",
    "description": "A modern landing page"
  }'
```

### Get Projects
```bash
curl http://localhost:3000/api/projects
```

### Export Code
```bash
curl -X POST http://localhost:3000/api/export \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div>Test</div>",
    "css": "body { }",
    "javascript": "console.log(\"hi\");",
    "format": "html"
  }'
```

## File Naming

- Components: `PascalCase` (Button.tsx)
- Utilities: `camelCase` (formatDate.ts)
- Hooks: `camelCase` with `use` (useProjects.ts)
- Styles: CSS in components, Tailwind classes

## Adding Dependencies

```bash
# Add package
bun add package-name

# Add dev dependency
bun add -D package-name

# Remove
bun remove package-name
```

## Performance Tips

1. Use SWR for data fetching (not fetch in useEffect)
2. Use Next.js Image component
3. Lazy load heavy components
4. Check bundle size: `bun run build`
5. Use TypeScript for type safety

## Documentation

- **Full Guide**: `DEVELOPMENT.md`
- **Deployment**: `DEPLOYMENT.md`
- **Full README**: `README_PRODUCTION.md`
- **This File**: `QUICK_START.md`

## Common Tasks

### Add a New Page
1. Create `src/app/[route]/page.tsx`
2. Add content and import Header/Footer
3. Test at http://localhost:3000/[route]

### Add a New Component
1. Create `src/components/my-component.tsx`
2. Export component function
3. Import in pages or other components

### Add a New API Endpoint
1. Create `src/app/api/[endpoint]/route.ts`
2. Export GET, POST, etc. functions
3. Test with curl or API client

### Connect Database
1. Choose provider (Supabase/Neon/etc)
2. Get connection string
3. Update `src/lib/db.ts`
4. Run migrations
5. Update `.env.local`

## Need Help?

- Check `/docs` in the app
- Review error messages in console
- Read the full guides (DEVELOPMENT.md, DEPLOYMENT.md)
- Check Next.js documentation: nextjs.org/docs

---

**Ready to deploy?** See DEPLOYMENT.md for production setup.
