import { NextResponse } from 'next/server';

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
