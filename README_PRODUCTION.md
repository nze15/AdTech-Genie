# AdTech Genie - Production-Ready AI Code Generation Platform

A modern, scalable web application for AI-powered code generation and website creation. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **AI Code Generation**: Generate production-ready HTML, CSS, and JavaScript code from descriptions
- **Template Library**: Pre-built landing pages, portfolios, dashboards, and more
- **Real-time Preview**: Live preview of generated code with instant updates
- **Project Management**: Save, organize, and manage all generated projects
- **Export Options**: Download code in multiple formats (HTML, separate files, ZIP)
- **Mobile Responsive**: All templates are fully responsive and mobile-optimized

### Developer Features
- **REST API**: Complete API for code generation and project management
- **Type Safety**: Full TypeScript support with strict mode
- **Best Practices**: SEO optimized, accessible, and performance-focused code generation
- **Database Ready**: Support for Supabase, Neon, PlanetScale, and AWS RDS
- **Real-time Updates**: SWR for efficient data fetching and caching
- **Error Handling**: Comprehensive error handling and validation

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.x | React framework with App Router |
| React | 19.x | UI library with latest features |
| TypeScript | 5.9.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Zod | 3.22.x | Schema validation |
| SWR | 2.2.x | Data fetching and caching |
| Axios | 1.7.x | HTTP client |
| Bun | 1.0.x | Package manager and runtime |

## Installation

### Prerequisites
- Node.js 20+ or Bun 1.0+
- Git
- A database (optional for local development)

### Quick Start

```bash
# Clone repository
git clone https://github.com/nze15/AdTech-Genie.git
cd AdTech-Genie

# Install dependencies
bun install

# Set up environment (copy and edit as needed)
cp .env.example .env.local

# Run development server
bun run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
adtech-genie/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/             # API routes
│   │   ├── projects/        # Project management pages
│   │   ├── generator/       # Code generator page
│   │   ├── templates/       # Template gallery
│   │   ├── docs/            # Documentation
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable React components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── use-projects.ts  # Project management hooks
│   ├── lib/                 # Utility functions
│   │   ├── db.ts            # Database service
│   │   ├── templates.ts     # Template library
│   │   └── utils.ts         # Helper functions
│   └── types/               # TypeScript types
│       └── index.ts         # Core type definitions
├── public/                  # Static assets
├── scripts/                 # Utility scripts
│   └── setup-database.sql   # Database schema
├── .env.example             # Environment variables template
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── DEPLOYMENT.md            # Deployment guide
```

## API Endpoints

### Code Generation

```bash
# Basic generation
POST /api/generate
{
  "type": "landing",
  "description": "A modern landing page for a SaaS product"
}

# Advanced generation with customization
POST /api/generate/advanced
{
  "type": "landing",
  "description": "A modern landing page for a SaaS product",
  "theme": "dark",
  "primaryColor": "#10b981",
  "includeAnalytics": true
}

# Export generated code
POST /api/export
{
  "html": "<div>...</div>",
  "css": "body { ... }",
  "javascript": "console.log(...)",
  "format": "html"
}
```

### Project Management

```bash
# Get all projects
GET /api/projects?limit=10&offset=0

# Get single project
GET /api/projects/[id]

# Create project
POST /api/projects
{
  "name": "My Project",
  "type": "landing",
  "html": "...",
  "css": "...",
  "javascript": "..."
}

# Update project
PUT /api/projects/[id]
{
  "name": "Updated name"
}

# Delete project
DELETE /api/projects/[id]
```

### Health Check

```bash
# Check API health
GET /api/health
```

## Development Commands

```bash
# Install dependencies
bun install

# Development server with hot reload
bun run dev

# Production build
bun run build

# Production server
bun run start

# Type checking
bun run typecheck

# Linting
bun run lint

# Fix linting issues
bun run lint:fix

# Format code
bun run format

# Run tests
bun run test

# Test with UI
bun run test:ui

# Test coverage
bun run test:coverage
```

## Pages

### Public Pages
- **Home** (`/`) - Landing page with features and CTA
- **Generator** (`/generator`) - AI code generator interface
- **Templates** (`/templates`) - Browse available templates
- **Docs** (`/docs`) - Documentation and API reference

### User Pages
- **Projects** (`/projects`) - View all generated projects
- **Project Detail** (`/projects/[id]`) - View and edit individual projects

## Customization

### Adding New Templates

1. Add template to `src/lib/templates.ts`:

```typescript
export const myTemplate = {
  html: `<!DOCTYPE html>...`,
  css: `body { ... }`,
  javascript: `...`
};
```

2. Add to template list in UI components

### Styling

The app uses Tailwind CSS with design tokens defined in `src/app/globals.css`:

```css
--color-primary: #10b981;
--color-foreground: #1f2937;
--color-background: #ffffff;
```

Customize by editing the theme variables.

### Adding Database

1. Choose a provider: Supabase, Neon, PlanetScale, or AWS RDS
2. Update `.env.local` with connection string
3. Run migration: `psql $DATABASE_URL < scripts/setup-database.sql`
4. Update `src/lib/db.ts` to use real database calls

## Performance Metrics

### Core Web Vitals (Target)
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Achieved Optimizations
- Automatic code splitting
- Image optimization
- CSS purging with Tailwind
- Server-side rendering
- API route compression
- Security headers included

## Security Features

- ✅ SQL Injection Prevention (Parameterized Queries)
- ✅ Input Validation (Zod)
- ✅ CSRF Protection
- ✅ XSS Prevention
- ✅ Security Headers
- ✅ Environment Variable Management
- ✅ TypeScript Type Safety

## Testing

The project is set up for testing with Vitest:

```bash
# Run tests
bun run test

# Watch mode
bun run test:watch

# Coverage report
bun run test:coverage
```

## Deployment

### Vercel (Recommended)

```bash
# Deploy with Vercel CLI
vercel

# Or connect GitHub repo at vercel.com
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
EXPOSE 3000
CMD ["bun", "start"]
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Monitoring

### Error Tracking
- Integrate with Sentry for production error monitoring
- Access logs via `vercel logs`

### Performance Monitoring
- Vercel Web Analytics included
- Core Web Vitals dashboard

### Database Monitoring
- Use provider's built-in monitoring (Supabase, Neon, etc.)
- Monitor query performance

## Troubleshooting

### Common Issues

**Build fails on deployment:**
```bash
rm -rf .next
bun run build
```

**Database connection error:**
```bash
psql $DATABASE_URL -c "SELECT version();"
```

**Performance issues:**
- Clear Next.js cache: `rm -rf .next`
- Check database indexes
- Review API response times

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support & Resources

- **Documentation**: Visit `/docs` in the app
- **Issues**: GitHub Issues tracker
- **Discussions**: GitHub Discussions
- **Email**: support@adtech-genie.com

## Roadmap

### Q1 2026
- [ ] AI-powered customization suggestions
- [ ] Template marketplace
- [ ] Collaboration features

### Q2 2026
- [ ] Advanced analytics
- [ ] Custom domain support
- [ ] Scheduled exports

### Q3 2026
- [ ] Mobile app
- [ ] API v2 with webhooks
- [ ] Advanced permissions

## Changelog

### v1.0.0 (Current)
- Initial production release
- Code generation API
- Project management
- Template library
- Full documentation
- Deployment guides

## Credits

Built with modern web technologies and best practices.

---

**Ready to deploy?** Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup instructions.
