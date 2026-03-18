'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/card';
import { useProjects, useDeleteProject } from '@/hooks/use-projects';
import Link from 'next/link';

export default function ProjectsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { projects, isLoading, error, mutate } = useProjects();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        await mutate();
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-app py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">My Projects</h1>
              <p className="text-muted mt-2">
                Manage all your generated code projects
              </p>
            </div>
            <Link href="/generator">
              <Button>New Project</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted">Loading projects...</p>
            </div>
          ) : error ? (
            <Card className="border-error bg-red-50">
              <CardContent className="py-6">
                <p className="text-error">Failed to load projects</p>
              </CardContent>
            </Card>
          ) : projects.length === 0 ? (
            <Card className="text-center">
              <CardContent className="py-12">
                <p className="text-muted mb-4">No projects yet</p>
                <Link href="/generator">
                  <Button>Create Your First Project</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-xs text-muted mt-1">
                          Type: <span className="capitalize">{project.type}</span>
                        </p>
                      </div>
                      <span className="text-sm font-medium bg-primary text-white px-2 py-1 rounded">
                        {project.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.description && (
                      <p className="text-sm text-muted line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    <div className="flex gap-2 text-xs text-muted">
                      <span>
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/projects/${project.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 text-sm rounded-lg border border-error text-error hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
