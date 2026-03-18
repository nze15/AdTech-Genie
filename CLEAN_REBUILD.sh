#!/bin/bash
# Clean Rebuild Script - Clears all caches and reinstalls

echo "🧹 Cleaning old builds and caches..."
rm -rf .next
rm -rf node_modules
rm -rf .turbo
rm -rf dist
rm -rf build

echo "🗑️  Removing old lock files..."
rm -rf bun.lock
rm -rf bun.lockb
rm -rf pnpm-lock.yaml
rm -rf yarn.lock
rm -rf package-lock.json

echo "📦 Installing fresh dependencies..."
bun install

echo "✅ Clean rebuild complete!"
echo ""
echo "Next steps:"
echo "1. Create .env.local with your GROQ_API_KEY"
echo "2. Run: bun run dev"
echo "3. Visit: http://localhost:3000/chat"
