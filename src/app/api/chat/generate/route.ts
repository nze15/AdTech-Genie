import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/lib/groq';
import { z } from 'zod';

const requestSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty'),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, conversationHistory } = requestSchema.parse(body);

    // Generate code using Groq
    const result = await generateCode(prompt, conversationHistory);

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in generate endpoint:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate code',
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'generate' });
}
