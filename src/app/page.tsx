'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/card';
import Link from 'next/link';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: 'AI-Powered Generation',
    description: 'Generate production-ready code with natural language descriptions',
    icon: '⚡',
  },
  {
    title: 'Multiple Templates',
    description: 'Choose from landing pages, portfolios, dashboards, and more',
    icon: '🎨',
  },
  {
    title: 'Real-time Preview',
    description: 'See your code live with instant hot reload',
    icon: '👁️',
  },
  {
    title: 'Export Ready',
    description: 'Download optimized HTML, CSS, and JavaScript files',
    icon: '📦',
  },
  {
    title: 'SEO Optimized',
    description: 'All generated code follows modern SEO best practices',
    icon: '🔍',
  },
  {
    title: 'Mobile Responsive',
    description: 'Automatically responsive design for all devices',
    icon: '📱',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="container-app py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Generate Code with AI
            </h1>
            <p className="text-xl text-muted mb-8 text-balance">
              AdTech Genie uses advanced AI to generate professional websites, landing pages, and 
              dashboards from simple descriptions. No coding required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg">
                  Start Coding with AI
                </Button>
              </Link>
              <a href="#templates">
                <Button variant="outline" size="lg">
                  View Templates
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="bg-gray-50 py-20">
          <div className="container-app">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-muted">
                Everything you need to create amazing websites quickly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white">
          <div className="container-app max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Start generating professional websites in minutes, not days.
            </p>
            <Link href="/chat">
              <Button variant="secondary" size="lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>

        <section id="templates" className="py-20">
          <div className="container-app">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Pre-built Templates
              </h2>
              <p className="text-lg text-muted">
                Get started with our collection of professional templates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Landing Page',
                  description: 'Perfect for product launches and marketing campaigns',
                },
                {
                  name: 'Portfolio',
                  description: 'Showcase your work with an impressive portfolio site',
                },
                {
                  name: 'Dashboard',
                  description: 'Business analytics and data visualization interface',
                },
              ].map((template) => (
                <Card key={template.name} className="hover:shadow-lg">
                  <div className="h-48 bg-gradient-to-br from-primary to-primary-light rounded-t-lg"></div>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted mb-4">{template.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="container-app">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '10K+', label: 'Websites Generated' },
                { number: '50K+', label: 'Active Users' },
                { number: '99.9%', label: 'Uptime' },
                { number: '4.9★', label: 'User Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
