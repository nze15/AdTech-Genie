/**
 * Core application types
 */

export interface GeneratedCode {
  id: string;
  name: string;
  type: 'landing' | 'portfolio' | 'dashboard' | 'custom';
  html: string;
  css: string;
  javascript: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}

export interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  type: 'landing' | 'portfolio' | 'dashboard';
  thumbnail?: string;
  html: string;
  css: string;
  javascript: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeGenerated?: GeneratedCode;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
