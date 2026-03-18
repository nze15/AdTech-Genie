import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

if (!projectId) {
  console.warn('NEXT_PUBLIC_SANITY_PROJECT_ID is not set');
}

export const sanityClient = createClient({
  projectId: projectId || '',
  dataset,
  apiVersion,
  useCdn: true,
});

// Server-side client with write access
export function getSanityClient() {
  const token = process.env.SANITY_API_TOKEN;
  
  if (!token) {
    throw new Error('SANITY_API_TOKEN is not set');
  }

  return createClient({
    projectId: projectId || '',
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

// Query builder
export function sanityQuery(query: string, params?: Record<string, any>) {
  return sanityClient.fetch(query, params);
}

// Server-side mutation
export async function sanityMutation(mutations: any[]) {
  const client = getSanityClient();
  return client.transaction().create(mutations).commit();
}

// Fetch generated code snippets from Sanity
export async function fetchGeneratedCode(id: string) {
  const query = `
    *[_type == "generatedCode" && _id == $id][0] {
      _id,
      title,
      description,
      html,
      css,
      javascript,
      _createdAt,
      _updatedAt
    }
  `;
  return sanityQuery(query, { id });
}

// Save generated code to Sanity
export async function saveGeneratedCode(data: {
  title: string;
  description: string;
  html: string;
  css: string;
  javascript?: string;
}) {
  const client = getSanityClient();
  return client.create({
    _type: 'generatedCode',
    ...data,
  });
}
