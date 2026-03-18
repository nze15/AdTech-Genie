# AdTech Genie Chat - AI Code Generation Feature

## Overview

The Chat feature enables users to generate production-ready web components and pages using natural language AI assistance powered by Groq.

## Architecture

### Client-Side
- **pages/chat** - Main chat interface with split view (mobile-first)
- **components/chat-messages** - Message display with syntax highlighting
- **components/code-preview** - Live preview with zoom/pan controls
- **lib/store** - Zustand state management for messages and UI state

### Server-Side
- **api/chat/generate** - Code generation endpoint using Groq API
- **lib/groq.ts** - Groq AI integration with streaming support
- **lib/supabase.ts** - Supabase real-time database client

### Database
- **conversations** - Chat session records
- **messages** - Individual chat messages with code
- **generated_components** - Saved generated code

## Usage Flow

```
User Types: "Build a responsive navbar"
    ↓
Message sent to /api/chat/generate
    ↓
Groq AI generates HTML/CSS/JavaScript
    ↓
Response displayed in chat with preview
    ↓
User can copy/download/deploy code
```

## Features

### Real-time Code Generation
- Streaming responses from Groq
- Fast inference times (< 3 seconds)
- Multiple output formats (HTML, CSS, JS)

### Live Preview
- Iframe-based rendering
- Zoom and pan controls
- Responsive viewport preview
- Touch gestures on mobile

### Code Export
- Copy to clipboard
- Download as HTML file
- Share via URL (coming soon)
- One-tap Vercel deploy (coming soon)

### Chat History
- Persist to Supabase (optional)
- Browse previous conversations
- Fork and continue previous projects

## Component Structure

### ChatPage
Main container managing chat and preview panels.

```tsx
<ChatPage>
  ├─ ChatMessages (left panel on desktop)
  ├─ CodePreview (right panel on desktop, modal on mobile)
  └─ Input area
```

### ChatMessages
Displays list of messages with code blocks.

```tsx
<ChatMessages messages={messages}>
  {messages.map(msg => (
    <Message role={msg.role}>
      <MessageContent>{msg.content}</MessageContent>
      {msg.code && <CodeBlock code={msg.code} />}
    </Message>
  ))}
</ChatMessages>
```

### CodePreview
Renders live preview with controls.

```tsx
<CodePreview preview={currentPreview}>
  <Toolbar>
    <ZoomControl />
    <CopyButton />
    <DownloadButton />
  </Toolbar>
  <IFramePreview />
  <GestureHandler />
</CodePreview>
```

## State Management

Using Zustand for global state:

```typescript
{
  messages: ChatMessage[]
  currentPreview: CodePreview | null
  isLoading: boolean
  error: string | null
  conversationId: string | null
  
  actions: {
    addMessage()
    setPreview()
    setLoading()
    setError()
  }
}
```

## Prompts & Templates

### Suggested Prompts
- "Build a responsive navbar"
- "Create a hero section"
- "Make a card component"
- "Design a footer"
- "Build a contact form"
- "Create a pricing table"

### Quick Templates (fallback)
- Navbar with mobile menu
- Hero section
- Card component
- Features grid
- Footer

## Mobile Optimization

### Touch Controls
- Full-screen chat on mobile
- Modal preview panel
- Pinch-to-zoom (CSS)
- Drag-to-pan (JS)
- Tap suggested prompts

### Responsive Breakpoints
- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)

### Performance
- Lazy load preview iframe
- Message virtualization (future)
- Optimistic updates
- Request debouncing

## API Endpoints

### POST /api/chat/generate
Generate code from prompt.

**Request:**
```json
{
  "prompt": "Build a navbar",
  "conversationHistory": [
    { "role": "user", "content": "..." }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "html": "<nav>...</nav>",
    "css": "nav { ... }",
    "javascript": "...",
    "description": "..."
  }
}
```

## Database Queries

### Get Conversations
```sql
SELECT * FROM conversations 
WHERE user_id = $1 
ORDER BY updated_at DESC;
```

### Get Messages
```sql
SELECT * FROM messages 
WHERE conversation_id = $1 
ORDER BY created_at ASC;
```

### Save Component
```sql
INSERT INTO generated_components 
(conversation_id, title, html, css, javascript)
VALUES ($1, $2, $3, $4, $5);
```

## Error Handling

- API request failures caught and displayed
- User-friendly error messages
- Graceful fallbacks to template generation
- Rate limit handling (queue requests)

## Performance Metrics

- **Time to first token**: < 500ms
- **Total response time**: 2-5 seconds
- **Preview render time**: < 100ms
- **Memory usage**: < 50MB idle

## Future Enhancements

1. **Voice Input**: "Tell me what to build"
2. **Image Upload**: Generate from design screenshots
3. **Collaboration**: Real-time editing with others
4. **Version History**: Track all iterations
5. **Component Library**: Save favorites
6. **AI Refinement**: "Make it more colorful" commands
7. **Mobile App**: React Native version
8. **Offline Support**: PWA with cached models

## Testing

### Unit Tests
- Generate code validation
- Message parsing
- State management

### Integration Tests
- Chat flow from prompt to preview
- Database CRUD operations
- Real-time subscriptions

### E2E Tests
- Full user workflow
- Mobile interactions
- Performance benchmarks

## Debugging

### Enable Debug Logging
```typescript
localStorage.setItem('DEBUG_CHAT', 'true');
```

### Common Issues

**"Code not showing in preview"**
- Check HTML is valid
- Look for console errors (F12 → Console)
- Try simpler prompt

**"Slow response time"**
- Check network tab (F12 → Network)
- May be hitting rate limits
- Try again in 30 seconds

**"Messages not saving"**
- Supabase may not be configured
- Check browser console for errors
- Data still works without Supabase

## Deployment

### Vercel
```bash
vercel deploy
```

### Docker
```bash
docker build -t adtech-genie .
docker run -p 3000:3000 adtech-genie
```

### Environment Variables
```
GROQ_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Support

For issues, check:
1. Setup instructions in SETUP_AI_AGENT.md
2. Browser console for errors
3. Network tab (F12) for API issues
4. Groq API status dashboard
