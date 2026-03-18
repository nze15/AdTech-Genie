'use client';

import { useState, useRef, useEffect } from 'react';
import { CodePreview as CodePreviewType } from '@/lib/store';
import { Button } from '@/components/button';

interface CodePreviewProps {
  preview: CodePreviewType;
}

export default function CodePreview({ preview }: CodePreviewProps) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Create complete HTML document
  const createHtmlDocument = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ${preview.css || ''}
  </style>
</head>
<body>
  ${preview.html || ''}
  <script>
    ${preview.javascript || ''}
  </script>
</body>
</html>`;
  };

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(createHtmlDocument());
        doc.close();
      }
    }
  }, [preview]);

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const newScale = Math.min(Math.max(scale - e.deltaY * 0.01, 0.5), 2);
      setScale(newScale);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2 || e.ctrlKey) {
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: position.x + (e.clientX - startPos.x),
        y: position.y + (e.clientY - startPos.y),
      });
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const copyCode = () => {
    const fullCode = createHtmlDocument();
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Toolbar */}
      <div className="p-3 border-b border-border bg-white flex justify-between items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Zoom:</span>
          <input
            type="range"
            min="50"
            max="200"
            value={scale * 100}
            onChange={(e) => setScale(Number(e.target.value) / 100)}
            className="w-24 h-1.5"
          />
          <span className="text-xs font-mono text-muted">{Math.round(scale * 100)}%</span>
        </div>

        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="text-xs"
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={copyCode}
            className="text-xs"
          >
            {copied ? '✓ Copied' : 'Copy Code'}
          </Button>
          <a
            href={`data:text/html,${encodeURIComponent(createHtmlDocument())}`}
            download="component.html"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded text-xs font-medium bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            Download
          </a>
        </div>
      </div>

      {/* Preview Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-white relative cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="inline-block"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.2s',
          }}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-screen border-none bg-white"
            style={{
              minWidth: '320px',
              minHeight: '600px',
              pointerEvents: isDragging ? 'none' : 'auto',
            }}
            sandbox="allow-scripts"
            title="Code Preview"
          />
        </div>
      </div>

      {/* Info Panel */}
      <div className="p-3 border-t border-border bg-gray-50 text-xs text-muted">
        <p>Drag to pan, Ctrl+Scroll to zoom, Right-click disabled</p>
      </div>
    </div>
  );
}
