'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
            AG
          </div>
          <span className="font-semibold text-foreground">AdTech Genie</span>
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/generator" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Generator
          </Link>
          <Link href="/templates" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Templates
          </Link>
          <Link href="/docs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Sign In
          </button>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
