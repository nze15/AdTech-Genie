/**
 * Database service for AdTech Genie
 * Provides methods for CRUD operations
 * 
 * Note: This is a template structure. Connect your database in production:
 * - Supabase: https://supabase.com
 * - Neon: https://neon.tech
 * - AWS RDS: https://aws.amazon.com/rds
 * - PlanetScale: https://planetscale.com
 */

import type { GeneratedCode, UserPreferences } from '@/types';

/**
 * In-memory storage for development
 * Replace with actual database calls in production
 */
const storage = {
  codes: new Map<string, GeneratedCode>(),
  users: new Map<string, { id: string; email: string; name: string }>(),
};

export const db = {
  /**
   * Generated Codes Operations
   */
  codes: {
    async create(data: Omit<GeneratedCode, 'id' | 'createdAt' | 'updatedAt'>) {
      const id = `code-${Date.now()}`;
      const code: GeneratedCode = {
        ...data,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      storage.codes.set(id, code);
      return code;
    },

    async get(id: string): Promise<GeneratedCode | null> {
      return storage.codes.get(id) || null;
    },

    async list(limit: number = 10, offset: number = 0) {
      const codes = Array.from(storage.codes.values());
      return {
        items: codes.slice(offset, offset + limit),
        total: codes.length,
        limit,
        offset,
      };
    },

    async update(id: string, data: Partial<GeneratedCode>) {
      const existing = storage.codes.get(id);
      if (!existing) return null;

      const updated = {
        ...existing,
        ...data,
        updatedAt: new Date(),
      };
      storage.codes.set(id, updated);
      return updated;
    },

    async delete(id: string) {
      return storage.codes.delete(id);
    },

    async getByType(type: string) {
      const codes = Array.from(storage.codes.values());
      return codes.filter((code) => code.type === type);
    },
  },

  /**
   * Users Operations
   */
  users: {
    async create(data: { email: string; name: string }) {
      const id = `user-${Date.now()}`;
      const user = { ...data, id };
      storage.users.set(id, user);
      return user;
    },

    async get(id: string) {
      return storage.users.get(id) || null;
    },

    async getByEmail(email: string) {
      const users = Array.from(storage.users.values());
      return users.find((u) => u.email === email) || null;
    },

    async list() {
      return Array.from(storage.users.values());
    },

    async update(id: string, data: Partial<{ email: string; name: string }>) {
      const existing = storage.users.get(id);
      if (!existing) return null;

      const updated = { ...existing, ...data };
      storage.users.set(id, updated);
      return updated;
    },

    async delete(id: string) {
      return storage.users.delete(id);
    },
  },

  /**
   * Statistics
   */
  stats: {
    async getTotalCodes() {
      return storage.codes.size;
    },

    async getTotalUsers() {
      return storage.users.size;
    },

    async getCodesByType() {
      const codes = Array.from(storage.codes.values());
      const stats: Record<string, number> = {};

      codes.forEach((code) => {
        stats[code.type] = (stats[code.type] || 0) + 1;
      });

      return stats;
    },
  },
};

/**
 * Example usage for connecting to Supabase:
 * 
 * import { createClient } from '@supabase/supabase-js'
 * 
 * const supabase = createClient(
 *   process.env.SUPABASE_URL,
 *   process.env.SUPABASE_KEY
 * )
 * 
 * export const db = {
 *   codes: {
 *     async create(data) {
 *       const { data: result, error } = await supabase
 *         .from('generated_codes')
 *         .insert([data])
 *         .select()
 *       if (error) throw error
 *       return result[0]
 *     },
 *     // ... other methods
 *   }
 * }
 */
