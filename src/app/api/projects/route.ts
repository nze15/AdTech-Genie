import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/**
 * Get list of generated codes (projects)
 * Query params: limit, offset
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const codes = await db.codes.list(limit, offset);

    return NextResponse.json(
      {
        success: true,
        data: codes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Get projects error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}

/**
 * Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const code = await db.codes.create({
      ...body,
      type: body.type || 'custom',
    });

    return NextResponse.json(
      {
        success: true,
        data: code,
        message: 'Project created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Create project error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create project',
      },
      { status: 500 }
    );
  }
}
