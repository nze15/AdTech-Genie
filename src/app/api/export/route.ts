import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Schema for export request
 */
const ExportSchema = z.object({
  html: z.string(),
  css: z.string(),
  javascript: z.string(),
  format: z.enum(['html', 'zip', 'separate']).optional(),
});

/**
 * Exports generated code in various formats
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { html, css, javascript, format = 'html' } = ExportSchema.parse(body);

    if (format === 'html') {
      // Combine all into single HTML file
      const combined = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${javascript}
  </script>
</body>
</html>`;

      return new NextResponse(combined, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'Content-Disposition': 'attachment; filename="index.html"',
        },
      });
    } else if (format === 'separate') {
      // Return JSON with separate files
      return NextResponse.json(
        {
          success: true,
          data: {
            files: [
              {
                name: 'index.html',
                content: html,
                type: 'text/html',
              },
              {
                name: 'styles.css',
                content: css,
                type: 'text/css',
              },
              {
                name: 'script.js',
                content: javascript,
                type: 'text/javascript',
              },
            ],
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Unsupported export format',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('[API] Export error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid export request',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Export failed',
      },
      { status: 500 }
    );
  }
}
