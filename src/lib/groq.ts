import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export interface CodeGenerationResponse {
  html: string;
  css: string;
  javascript?: string;
  description: string;
}

const systemPrompt = `You are an expert web developer and UI/UX designer specializing in generating production-ready HTML, CSS, and JavaScript code.

When a user requests a component or page, provide ONLY valid, modern code that:
- Uses semantic HTML5
- Includes responsive Tailwind CSS classes (or plain CSS if requested)
- Is fully functional and ready to use
- Follows accessibility best practices
- Is mobile-first and works on all screen sizes

Format your response as follows:
[HTML]
<html code here>
[/HTML]

[CSS]
<css code here>
[/CSS]

[JAVASCRIPT]
<javascript code here (optional)>
[/JAVASCRIPT]

[DESCRIPTION]
Brief description of what was created.
[/DESCRIPTION]

Be concise and only include the code requested. Never include explanations outside the format above.`;

export async function generateCode(
  prompt: string,
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
): Promise<CodeGenerationResponse> {
  try {
    const messages: Array<{ role: "user" | "assistant"; content: string }> = [
      ...(conversationHistory || []),
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await groq.messages.create({
      model: "mixtral-8x7b-32768",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
    });

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse the response
    const htmlMatch = content.match(/\[HTML\]([\s\S]*?)\[\/HTML\]/);
    const cssMatch = content.match(/\[CSS\]([\s\S]*?)\[\/CSS\]/);
    const jsMatch = content.match(/\[JAVASCRIPT\]([\s\S]*?)\[\/JAVASCRIPT\]/);
    const descMatch = content.match(/\[DESCRIPTION\]([\s\S]*?)\[\/DESCRIPTION\]/);

    return {
      html: htmlMatch ? htmlMatch[1].trim() : "",
      css: cssMatch ? cssMatch[1].trim() : "",
      javascript: jsMatch ? jsMatch[1].trim() : undefined,
      description: descMatch ? descMatch[1].trim() : "Generated component",
    };
  } catch (error) {
    console.error("Error generating code with Groq:", error);
    throw error;
  }
}

// Generate code with streaming for real-time updates
export async function generateCodeStream(
  prompt: string,
  onChunk: (chunk: string) => void,
  conversationHistory?: { role: "user" | "assistant"; content: string }[]
): Promise<CodeGenerationResponse> {
  try {
    const messages: Array<{ role: "user" | "assistant"; content: string }> = [
      ...(conversationHistory || []),
      {
        role: "user",
        content: prompt,
      },
    ];

    const stream = await groq.messages.stream({
      model: "mixtral-8x7b-32768",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
    });

    let fullContent = "";

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        fullContent += chunk.delta.text;
        onChunk(chunk.delta.text);
      }
    }

    // Parse the complete response
    const htmlMatch = fullContent.match(/\[HTML\]([\s\S]*?)\[\/HTML\]/);
    const cssMatch = fullContent.match(/\[CSS\]([\s\S]*?)\[\/CSS\]/);
    const jsMatch = fullContent.match(/\[JAVASCRIPT\]([\s\S]*?)\[\/JAVASCRIPT\]/);
    const descMatch = fullContent.match(/\[DESCRIPTION\]([\s\S]*?)\[\/DESCRIPTION\]/);

    return {
      html: htmlMatch ? htmlMatch[1].trim() : "",
      css: cssMatch ? cssMatch[1].trim() : "",
      javascript: jsMatch ? jsMatch[1].trim() : undefined,
      description: descMatch ? descMatch[1].trim() : "Generated component",
    };
  } catch (error) {
    console.error("Error generating code with Groq stream:", error);
    throw error;
  }
}

// Quick templates for fast generation (fallback)
export const quickTemplates = {
  navbar: {
    html: `<nav class="navbar">
  <div class="nav-container">
    <a href="#" class="nav-logo">Logo</a>
    <button class="hamburger" id="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-menu" id="navMenu">
      <li><a href="#home" class="nav-link">Home</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#services" class="nav-link">Services</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
  </div>
</nav>`,
    css: `.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 999;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.8;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: inherit;
    padding: 1rem 2rem;
    gap: 1rem;
    display: none;
  }

  .nav-menu.active {
    display: flex;
  }
}`,
    javascript: `const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});`,
  },
  hero: {
    html: `<section class="hero">
  <div class="hero-content">
    <h1>Welcome to Your Site</h1>
    <p>Create amazing experiences</p>
    <button class="cta-button">Get Started</button>
  </div>
</section>`,
    css: `.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 20px;
  text-align: center;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 12px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }
}`,
  },
  card: {
    html: `<div class="card">
  <div class="card-image"></div>
  <div class="card-body">
    <h3>Card Title</h3>
    <p>This is a beautiful card component with image, title, and description.</p>
    <button class="card-button">Learn More</button>
  </div>
</div>`,
    css: `.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-body {
  padding: 1.5rem;
}

.card-body h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.card-body p {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.card-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.card-button:hover {
  opacity: 0.9;
}`,
  },
};
