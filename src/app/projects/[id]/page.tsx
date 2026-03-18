'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';
import { useProject, useUpdateProject } from '@/hooks/use-projects';

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { project, isLoading, error } = useProject(id);
  const { updateProject } = useUpdateProject(id);
  const [showCode, setShowCode] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!project) return;

    const code =
      showCode === 'html'
        ? project.html
        : showCode === 'css'
          ? project.css
          : project.javascript;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHTML = () => {
    if (!project) return;

    const html = `<!DOCTYPE html>
<html>
<head>
  <style>${project.css}</style>
</head>
<body>
${project.html}
  <script>${project.javascript}</script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name || 'project'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container-app py-12">
          <p className="text-muted">Loading project...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Header />
        <main className="container-app py-12">
          <Card className="border-error bg-red-50">
            <CardContent className="py-6">
              <p className="text-error">Project not found</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-app py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">{project.name}</h1>
            {project.description && (
              <p className="text-lg text-muted">{project.description}</p>
            )}
            <p className="text-sm text-muted mt-4">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-border rounded-lg overflow-hidden">
                    <iframe
                      srcDoc={`<!DOCTYPE html>
<html>
<head><style>${project.css}</style></head>
<body>${project.html}<script>${project.javascript}</script></body>
</html>`}
                      title="Project Preview"
                      className="w-full h-96 border-0"
                      sandbox="allow-same-origin"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleDownloadHTML} className="w-full">
                    Download HTML
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Edit Project
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted">Type</p>
                    <p className="font-medium text-foreground capitalize">
                      {project.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">ID</p>
                    <p className="font-mono text-sm text-foreground break-all">
                      {project.id}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Code View */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Source Code</CardTitle>
                <div className="flex gap-2">
                  {(['html', 'css', 'js'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setShowCode(tab)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                        showCode === tab
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-foreground hover:bg-gray-200'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>
                    {showCode === 'html'
                      ? project.html
                      : showCode === 'css'
                        ? project.css
                        : project.javascript}
                  </code>
                </pre>
                <Button
                  onClick={handleCopyCode}
                  variant="outline"
                  className="w-full"
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
