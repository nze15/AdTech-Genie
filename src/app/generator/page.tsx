'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';

type TemplateType = 'landing' | 'portfolio' | 'dashboard' | 'custom';

const templates: Array<{ id: TemplateType; name: string; description: string }> = [
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Perfect for product launches and marketing campaigns',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work with an impressive portfolio site',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Business analytics and data visualization interface',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Tell us what you need and we\'ll generate it',
  },
];

export default function GeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedTemplate || !description.trim()) {
      alert('Please select a template and enter a description');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedTemplate,
          description,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedCode(data.data.html);
      }
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate code');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedCode) return;

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/html;charset=utf-8,${encodeURIComponent(generatedCode)}`);
    element.setAttribute('download', 'generated-page.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-app py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Code Generator
              </h1>
              <p className="text-lg text-muted">
                Select a template and describe what you want to build. We'll generate the code for you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Panel - Generator */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Your Site</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Template Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-4">
                        Select Template
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                              selectedTemplate === template.id
                                ? 'border-primary bg-blue-50'
                                : 'border-border hover:border-primary'
                            }`}
                          >
                            <h3 className="font-semibold text-foreground">{template.name}</h3>
                            <p className="text-sm text-muted mt-1">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description Input */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Describe What You Want
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="E.g., A landing page for a productivity app with features section, testimonials, and a CTA..."
                        className="w-full min-h-32 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted mt-2">
                        {description.length}/1000 characters
                      </p>
                    </div>

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerate}
                      isLoading={isGenerating}
                      disabled={!selectedTemplate || !description.trim()}
                      size="lg"
                      className="w-full"
                    >
                      Generate Code
                    </Button>

                    {/* Download Button */}
                    {generatedCode && (
                      <Button
                        onClick={handleDownload}
                        variant="secondary"
                        size="lg"
                        className="w-full"
                      >
                        Download HTML
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel - Preview */}
              <div>
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generatedCode ? (
                      <div className="bg-white border border-border rounded-lg overflow-hidden">
                        <iframe
                          srcDoc={generatedCode}
                          title="Generated Code Preview"
                          className="w-full h-96 border-0"
                          sandbox="allow-same-origin"
                        />
                      </div>
                    ) : (
                      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-muted text-center">
                          Generate code to see preview here
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
