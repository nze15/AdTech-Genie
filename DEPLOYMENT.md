# AdTech Genie - Deployment Guide

## Production Deployment Instructions

### Prerequisites
- Node.js 20+ or Bun installed
- GitHub repository connected
- Vercel account (for deployment)

### Step 1: Local Setup

```bash
# Clone the repository
git clone https://github.com/nze15/AdTech-Genie.git
cd AdTech-Genie

# Install dependencies
bun install
# or
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Step 2: Database Setup

Choose your database provider:

#### Option A: Supabase (Recommended)
1. Create a Supabase project at https://supabase.com
2. Get your connection string from Project Settings
3. Run migrations:
```bash
psql $DATABASE_URL < scripts/setup-database.sql
```
4. Update `.env.local` with your Supabase credentials

#### Option B: Neon
1. Create a Neon project at https://neon.tech
2. Copy the connection string
3. Run migrations:
```bash
psql $DATABASE_URL < scripts/setup-database.sql
```

#### Option C: AWS RDS / PlanetScale
Similar process - get connection string and run migrations

### Step 3: Build and Test

```bash
# Run type checking
bun run typecheck

# Run linter
bun run lint

# Build the application
bun run build

# Test locally
bun run dev
```

### Step 4: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and set environment variables
```

#### Option B: Using GitHub Integration
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Select your repository
4. Set environment variables
5. Click Deploy

### Step 5: Production Environment Variables

Set these in Vercel project settings:

```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=generate_with: openssl rand -base64 32
NEXTAUTH_URL=https://yourdomain.com
NODE_ENV=production
```

### Step 6: Verify Deployment

```bash
# Check the health endpoint
curl https://your-domain.com/api/health

# Test the generator
curl -X POST https://your-domain.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"type":"landing","description":"A modern landing page"}'
```

## Performance Optimizations

### Already Included:
- Next.js Image Optimization
- Automatic Code Splitting
- CSS Purging with Tailwind
- Server-side Rendering
- API Route Compression
- Security Headers

### Recommended Additional Optimizations:

1. **Enable Caching**
```javascript
// next.config.ts
headers: async () => [{
  source: '/:path*',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=3600' }
  ]
}]
```

2. **Monitor with Vercel Analytics**
- Automatically enabled on Vercel

3. **Enable ISR (Incremental Static Regeneration)**
```javascript
export const revalidate = 3600; // revalidate every hour
```

## Scaling

### Database Connection Pooling
For production databases, enable connection pooling:

```
DATABASE_URL=postgresql://user:password@db.example.com:5432/db?schema=public&sslmode=require&pgbouncer=true
```

### CDN Configuration
Vercel automatically provides CDN coverage.

### Rate Limiting
Consider adding rate limiting for API endpoints:

```bash
npm install @upstash/ratelimit
```

## Monitoring

### Health Checks
```bash
# Automated health checks
curl https://your-domain.com/api/health
```

### Error Tracking
- Integrate with Sentry: `npm install @sentry/nextjs`
- Set up error boundaries in React components

### Performance Monitoring
- Use Vercel Web Analytics
- Monitor Core Web Vitals

## Security Best Practices

1. **API Routes**
   - Validate all inputs with Zod
   - Use CORS headers
   - Rate limit endpoints

2. **Database**
   - Use connection pooling
   - Enable SSL/TLS
   - Regular backups

3. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel's Vars section
   - Rotate secrets regularly

4. **Dependencies**
   - Run `npm audit` regularly
   - Keep dependencies updated
   - Use Dependabot on GitHub

## Troubleshooting

### Build Failures
```bash
# Clear build cache
rm -rf .next
bun run build
```

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT version();"
```

### API Errors
- Check logs: `vercel logs`
- Verify environment variables
- Check CORS headers

## Rollback Procedure

### On Vercel
1. Go to Deployments
2. Select previous version
3. Click "Promote to Production"

## Maintenance

### Weekly
- Monitor error rates
- Check database performance
- Review usage analytics

### Monthly
- Update dependencies
- Review security vulnerabilities
- Optimize database queries

### Quarterly
- Performance audit
- Security review
- Capacity planning

## Support

- Documentation: `/docs` route
- GitHub Issues: https://github.com/nze15/AdTech-Genie/issues
- Email: support@adtech-genie.com

## Next Steps

1. Set up monitoring
2. Configure backups
3. Implement CI/CD pipeline
4. Set up automated testing
5. Plan scaling strategy
