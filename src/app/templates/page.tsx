'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/card';
import Link from 'next/link';

const templates = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Perfect for product launches, SaaS products, and marketing campaigns',
    features: ['Navigation', 'Hero Section', 'Features Grid', 'CTA Buttons', 'Footer'],
    image: '🚀',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work as a designer, developer, or creative professional',
    features: ['Hero Section', 'Project Gallery', 'About Section', 'Contact Form', 'Social Links'],
    image: '🎨',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Admin dashboard for analytics, data visualization, and management',
    features: ['Sidebar Navigation', 'Stats Cards', 'Charts', 'Data Tables', 'User Profile'],
    image: '📊',
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    description: 'Blog or content site with posts, categories, and archives',
    features: ['Article List', 'Categories', 'Search', 'Pagination', 'Author Info'],
    image: '✍️',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    description: 'Product catalog with filtering, search, and shopping cart',
    features: ['Product Grid', 'Search & Filter', 'Product Details', 'Cart', 'Checkout'],
    image: '🛍️',
  },
  {
    id: 'saas',
    name: 'SaaS Landing',
    description: 'SaaS product landing page with pricing and testimonials',
    features: ['Value Proposition', 'Pricing Table', 'Testimonials', 'FAQ', 'Demo CTA'],
    image: '💼',
  },
];

export default function TemplatesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-app py-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Browse Templates
            </h1>
            <p className="text-lg text-muted">
              Choose from our collection of professionally designed templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center rounded-t-lg">
                  <span className="text-6xl">{template.image}</span>
                </div>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Includes:</p>
                    <ul className="text-sm text-muted space-y-1">
                      {template.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/generator" className="block">
                    <Button className="w-full" variant="outline">
                      Use Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Template CTA */}
          <div className="mt-20 bg-white rounded-lg p-8 text-center border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Don't see what you need?
            </h2>
            <p className="text-muted mb-6">
              Create a custom template with our AI code generator. Tell us what you want,
              and we'll generate the perfect code for you.
            </p>
            <Link href="/generator">
              <Button size="lg">Create Custom Template</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
