# Development Guidelines

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Open browser
open http://localhost:3000
```

## Project Structure Best Practices

### File Organization

```
src/
├── app/              # Next.js App Router
│   ├── api/          # API routes (keep simple)
│   ├── [routes]/     # Page routes
│   └── layout.tsx    # Root layout
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and services
└── types/            # TypeScript definitions
```

### Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `Header.tsx`)
- **Hooks**: camelCase with `use` prefix (`useProjects.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`GeneratedCode.ts`)
- **Styles**: snake_case classes (`btn-primary`)

## Code Style

### TypeScript

```typescript
// ✅ Good
interface Props {
  title: string;
  onClick: () => void;
}

export function Button({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>;
}

// ❌ Avoid
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.title}</button>;
}
```

### React Components

```typescript
// ✅ Good
'use client';

import { useState } from 'react';
import { Button } from '@/components/button';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );
}

// ❌ Avoid
import React from 'react';

export class MyComponent extends React.Component {
  // Old class component pattern
}
```

### Styling

```typescript
// ✅ Good - Use Tailwind utilities
<button className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark">
  Click me
</button>

// ✅ Good - Use semantic classes
<div className="container-app py-8">
  <h1 className="text-4xl font-bold">Title</h1>
</div>

// ❌ Avoid - Arbitrary values
<div className="p-[32px] text-[24px]">
  Avoid arbitrary values when possible
</div>
```

## Git Workflow

### Branch Naming

```
feature/description     # New features
bugfix/issue           # Bug fixes
refactor/area          # Refactoring
docs/topic             # Documentation
```

### Commit Messages

```
Format: type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code refactoring
- docs: Documentation
- test: Tests
- chore: Build, dependencies

Examples:
feat(api): add export endpoint
fix(generator): handle empty descriptions
docs(deployment): add setup guide
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Create pull request
5. Code review
6. Merge to main

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2026-03-18');
    expect(formatDate(date)).toBe('03/18/26');
  });
});
```

### Running Tests

```bash
# Run all tests
bun run test

# Watch mode
bun run test:watch

# Coverage
bun run test:coverage

# UI
bun run test:ui
```

## API Development

### Creating New Endpoints

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validate with Zod
    // Process request
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    );
  }
}
```

### Input Validation

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  age: z.number().min(0).max(150).optional(),
});

// Validate
const result = createUserSchema.safeParse(data);
if (!result.success) {
  return NextResponse.json({ errors: result.error.errors }, { status: 400 });
}
```

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image';

// ✅ Good
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
/>

// ❌ Avoid
<img src="/images/hero.jpg" />
```

### Data Fetching

```typescript
// ✅ Good - Use SWR with revalidation
const { data, isLoading } = useSWR('/api/data', fetcher);

// ✅ Good - Use Server Components when possible
async function DataDisplay() {
  const data = await fetch('...');
  return <div>{data}</div>;
}

// ❌ Avoid - useEffect with fetch
useEffect(() => {
  fetch('/api/data').then(d => setData(d));
}, []);
```

### Bundle Size

```bash
# Analyze bundle
npm run build
# Check size of .next folder

# Use dynamic imports for large components
const HeavyComponent = dynamic(
  () => import('@/components/heavy'),
  { loading: () => <Spinner /> }
);
```

## Debugging

### Console Logging

```typescript
// ✅ Good - Descriptive and contextual
console.log('[API] Generate request:', { type, description });
console.error('[Component] Render error:', error.message);

// ❌ Avoid
console.log('error');
console.log(someData);
```

### Error Boundaries

```typescript
'use client';

import { ReactNode } from 'react';

export function ErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  // Error boundary implementation
  return children;
}
```

## Security

### Input Sanitization

```typescript
// ✅ Good - Always validate input
const { data } = AdvancedGenerateSchema.parse(body);

// ✅ Good - Use parameterized queries
db.query('SELECT * FROM users WHERE id = ?', [id]);

// ❌ Avoid - String interpolation in queries
db.query(`SELECT * FROM users WHERE id = ${id}`);
```

### Environment Variables

```typescript
// ✅ Good - Use env variables for secrets
const apiKey = process.env.API_KEY;

// ✅ Good - Prefix public vars with NEXT_PUBLIC_
const publicUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ Avoid - Hardcoding secrets
const apiKey = 'sk_test_123456';
```

## Monitoring & Logging

### Application Monitoring

```typescript
// Add to key functions
console.log('[API] Processing request at:', new Date().toISOString());

// Track errors
console.error('[Error] Failed to generate code:', {
  error: error.message,
  type,
  description,
  timestamp: new Date().toISOString(),
});
```

## Performance Checklist

- [ ] Images optimized with Next.js Image
- [ ] Dynamic imports for large components
- [ ] Database queries indexed
- [ ] API responses cached (SWR)
- [ ] CSS purged with Tailwind
- [ ] Bundle size analyzed
- [ ] Core Web Vitals passing

## Before Deploying

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Build
bun run build

# Test
bun run test

# Preview build
bun run start
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Docs](https://zod.dev)
- [SWR Documentation](https://swr.vercel.app)
