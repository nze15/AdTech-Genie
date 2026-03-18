'use client';

import useSWR from 'swr';
import axios from 'axios';
import type { GeneratedCode, PaginatedResponse } from '@/types';

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

/**
 * Hook to fetch projects with real-time updates via SWR
 */
export function useProjects(limit: number = 10, offset: number = 0) {
  const { data, error, isLoading, mutate } = useSWR<PaginatedResponse<GeneratedCode>>(
    `/api/projects?limit=${limit}&offset=${offset}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    projects: data?.items || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook to fetch a single project
 */
export function useProject(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<GeneratedCode>(
    id ? `/api/projects/${id}` : null,
    fetcher
  );

  return {
    project: data,
    isLoading,
    error,
    mutate,
  };
}

/**
 * Hook to create a new project
 */
export function useCreateProject() {
  const { mutate: mutateProjects } = useSWR('/api/projects');

  const createProject = async (data: Omit<GeneratedCode, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post('/api/projects', data);
      await mutateProjects(); // Revalidate projects list
      return response.data.data;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  return { createProject };
}

/**
 * Hook to update a project
 */
export function useUpdateProject(id: string) {
  const { mutate: mutateProject } = useSWR(`/api/projects/${id}`);
  const { mutate: mutateProjects } = useSWR('/api/projects');

  const updateProject = async (data: Partial<GeneratedCode>) => {
    try {
      const response = await axios.put(`/api/projects/${id}`, data);
      await mutateProject(); // Revalidate single project
      await mutateProjects(); // Revalidate projects list
      return response.data.data;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  };

  return { updateProject };
}

/**
 * Hook to delete a project
 */
export function useDeleteProject(id: string) {
  const { mutate: mutateProjects } = useSWR('/api/projects');

  const deleteProject = async () => {
    try {
      await axios.delete(`/api/projects/${id}`);
      await mutateProjects(); // Revalidate projects list
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  };

  return { deleteProject };
}
