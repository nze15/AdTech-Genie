import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getTemplate } from '@/lib/templates';

/**
 * Advanced schema for code generation with customization
 */
const AdvancedGenerateSchema = z.object({
  type: z.enum(['landing', 'portfolio', 'dashboard', 'custom']),
  description: z.string().min(10).max(2000),
  customInstructions: z.string().optional(),
  theme: z.enum(['light', 'dark']).optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  includeFeatures: z.array(z.string()).optional(),
  includeAnalytics: z.boolean().optional(),
  mobileFirst: z.boolean().optional(),
});

/**
 * Generates advanced customized code
 * This endpoint provides more detailed customization options
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = AdvancedGenerateSchema.parse(body);

    // Get base template
    let template;
    if (params.type === 'custom') {
      template = {
        html: '<div class="container"><h1>Custom Page</h1></div>',
        css: 'body { font-family: sans-serif; }',
        javascript: 'console.log("Custom generated code");',
      };
    } else {
      template = getTemplate(params.type as 'landing' | 'portfolio' | 'dashboard');
    }

    // Apply customizations
    let { html, css, javascript } = template;

    // Apply color customization if provided
    if (params.primaryColor) {
      css = css.replace(/#10b981/g, params.primaryColor);
      css = css.replace(/#059669/g, params.primaryColor);
    }

    // Apply theme
    if (params.theme === 'dark') {
      css = css.replace(/background:\s*white/g, 'background: #1f2937');
      css = css.replace(/color:\s*#333/g, 'color: #f3f4f6');
    }

    const response = {
      id: `gen-${Date.now()}`,
      type: params.type,
      description: params.description,
      html,
      css,
      javascript,
      filename: `${params.type}-${Date.now()}.html`,
      createdAt: new Date().toISOString(),
      customizations: {
        theme: params.theme,
        primaryColor: params.primaryColor,
        features: params.includeFeatures,
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: response,
        message: 'Advanced code generated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Advanced generate error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request parameters',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
