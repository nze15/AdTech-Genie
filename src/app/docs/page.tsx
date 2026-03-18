'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';

const sections = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Quick Start',
        content: 'Learn how to generate your first website in 5 minutes',
      },
      {
        title: 'How It Works',
        content: 'Understand the AI code generation process',
      },
      {
        title: 'System Requirements',
        content: 'Minimal requirements to use AdTech Genie',
      },
    ],
  },
  {
    title: 'Code Generation',
    items: [
      {
        title: 'Basic Generation',
        content: 'Generate code using simple descriptions',
      },
      {
        title: 'Advanced Options',
        content: 'Customize colors, themes, and features',
      },
      {
        title: 'Code Quality',
        content: 'All generated code follows best practices',
      },
    ],
  },
  {
    title: 'Templates',
    items: [
      {
        title: 'Available Templates',
        content: 'Explore our collection of pre-built templates',
      },
      {
        title: 'Template Customization',
        content: 'Customize any template to match your needs',
      },
      {
        title: 'Creating Custom Templates',
        content: 'Build your own reusable templates',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Generate Endpoint',
        content: 'POST /api/generate - Generate code from descriptions',
      },
      {
        title: 'Advanced Generate',
        content: 'POST /api/generate/advanced - Advanced customization options',
      },
      {
        title: 'Export Endpoint',
        content: 'POST /api/export - Export generated code in various formats',
      },
    ],
  },
  {
    title: 'Best Practices',
    items: [
      {
        title: 'Writing Descriptions',
        content: 'Tips for writing effective code generation prompts',
      },
      {
        title: 'Performance',
        content: 'Optimize your generated code for speed',
      },
      {
        title: 'SEO',
        content: 'SEO-optimized code generation',
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-app py-12">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Documentation
            </h1>
            <p className="text-lg text-muted">
              Complete guide to using AdTech Genie for code generation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-sm">Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-4">
                    {sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="font-semibold text-sm text-foreground mb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-1">
                          {section.items.map((item) => (
                            <li key={item.title}>
                              <a
                                href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-sm text-muted hover:text-primary transition-colors"
                              >
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {sections.map((section) => (
                <div key={section.title} className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {section.title}
                  </h2>
                  <div className="grid gap-6">
                    {section.items.map((item) => (
                      <Card key={item.title}>
                        <CardHeader>
                          <CardTitle className="text-lg" id={item.title.toLowerCase().replace(/\s+/g, '-')}>
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted">{item.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              {/* Code Example */}
              <Card className="mt-12">
                <CardHeader>
                  <CardTitle>Example: API Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Generate code using the API
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'landing',
    description: 'A modern landing page for a SaaS product',
    customInstructions: 'Use blue as the primary color'
  })
});

const data = await response.json();
console.log(data.data.html); // Generated HTML code`}
                  </pre>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="mt-12">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Can I use generated code commercially?
                    </h4>
                    <p className="text-muted text-sm">
                      Yes, all generated code is yours to use commercially with no restrictions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Is the generated code SEO optimized?
                    </h4>
                    <p className="text-muted text-sm">
                      Yes, all templates include SEO best practices like semantic HTML and meta tags.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Can I modify the generated code?
                    </h4>
                    <p className="text-muted text-sm">
                      Absolutely! All generated code is fully editable and customizable.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
