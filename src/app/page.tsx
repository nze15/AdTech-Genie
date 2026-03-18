"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  code?: string;
  language?: string;
  fileName?: string;
}

interface GeneratedFile {
  name: string;
  content: string;
  language: string;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const codeTemplates: Record<string, { html: string; css: string; js: string }> = {
  landing: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Landing Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="container">
      <a href="#" class="logo">BrandName</a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <header class="hero">
    <div class="container">
      <h1>Build Something Amazing</h1>
      <p>Create stunning websites with modern design and powerful features.</p>
      <a href="#contact" class="btn btn-primary">Get Started</a>
    </div>
  </header>

  <section id="features" class="features">
    <div class="container">
      <h2>Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>Fast</h3>
          <p>Lightning fast performance for the best user experience.</p>
        </div>
        <div class="feature-card">
          <h3>Secure</h3>
          <p>Enterprise-grade security to protect your data.</p>
        </div>
        <div class="feature-card">
          <h3>Scalable</h3>
          <p>Grow your business without limits.</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 BrandName. All rights reserved.</p>
    </div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #10b981;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #10b981;
}

.hero {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 150px 0 100px;
  text-align: center;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn {
  display: inline-block;
  padding: 15px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary {
  background: white;
  color: #10b981;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.features {
  padding: 100px 0;
  background: #f9fafb;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #10b981;
}

.footer {
  background: #1f2937;
  color: white;
  padding: 30px 0;
  text-align: center;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .nav-links {
    display: none;
  }
}`,
    js: `// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s, transform 0.5s';
  card.style.transitionDelay = \`\${index * 0.1}s\`;
  observer.observe(card);
});`,
  },
  portfolio: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <h1 class="logo">John Doe</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <section id="home" class="hero">
    <div class="container">
      <p class="greeting">Hello, I'm</p>
      <h1>John Doe</h1>
      <p class="tagline">Full Stack Developer & Designer</p>
      <div class="social-links">
        <a href="#" class="social">GitHub</a>
        <a href="#" class="social">LinkedIn</a>
        <a href="#" class="social">Twitter</a>
      </div>
    </div>
  </section>

  <section id="work" class="work">
    <div class="container">
      <h2>Featured Work</h2>
      <div class="projects">
        <div class="project">
          <div class="project-image"></div>
          <div class="project-info">
            <h3>E-Commerce Platform</h3>
            <p>A full-featured online store with payment integration.</p>
            <a href="#" class="project-link">View Project →</a>
          </div>
        </div>
        <div class="project">
          <div class="project-image"></div>
          <div class="project-info">
            <h3>Task Management App</h3>
            <p>Collaborative task management with real-time updates.</p>
            <a href="#" class="project-link">View Project →</a>
          </div>
        </div>
        <div class="project">
          <div class="project-image"></div>
          <div class="project-info">
            <h3>Weather Dashboard</h3>
            <p>Beautiful weather app with forecasts and maps.</p>
            <a href="#" class="project-link">View Project →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <div class="container">
      <h2>Get In Touch</h2>
      <form class="contact-form">
        <input type="text" placeholder="Name" required>
        <input type="email" placeholder="Email" required>
        <textarea placeholder="Message" rows="5" required></textarea>
        <button type="submit" class="btn-submit">Send Message</button>
      </form>
    </div>
  </section>

  <footer class="footer">
    <p>© 2026 John Doe. Made with ❤️</p>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.8;
  color: #1a1a1a;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 20px 0;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #10b981;
}

.header nav {
  display: flex;
  gap: 30px;
}

.header nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.header nav a:hover {
  color: #10b981;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #f0fdf4 0%, #fff 100%);
  padding-top: 80px;
}

.greeting {
  color: #10b981;
  font-weight: 600;
  font-size: 1.1rem;
}

.hero h1 {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin: 10px 0;
  background: linear-gradient(135deg, #1a1a1a, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tagline {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social {
  padding: 10px 25px;
  background: #1a1a1a;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  transition: background 0.3s, transform 0.3s;
}

.social:hover {
  background: #10b981;
  transform: translateY(-3px);
}

.work {
  padding: 120px 0;
}

.work h2 {
  font-size: 2.5rem;
  margin-bottom: 60px;
  text-align: center;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
}

.project {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.project:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.project-image {
  height: 220px;
  background: linear-gradient(135deg, #10b981, #34d399);
}

.project-info {
  padding: 30px;
}

.project-info h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.project-info p {
  color: #666;
  margin-bottom: 20px;
}

.project-link {
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
}

.contact {
  padding: 120px 0;
  background: #1a1a1a;
  color: white;
}

.contact h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-form input,
.contact-form textarea {
  padding: 18px 25px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: #333;
  color: white;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: 2px solid #10b981;
}

.btn-submit {
  padding: 18px 40px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.btn-submit:hover {
  background: #059669;
  transform: translateY(-2px);
}

.footer {
  text-align: center;
  padding: 40px;
  background: #111;
  color: #666;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }
  
  .header nav {
    display: none;
  }
}`,
    js: `// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.padding = '15px 0';
  } else {
    header.style.padding = '20px 0';
  }
});`,
  },
  dashboard: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <span>📊</span> Overview
        </a>
        <a href="#" class="nav-item">
          <span>📈</span> Analytics
        </a>
        <a href="#" class="nav-item">
          <span>💰</span> Revenue
        </a>
        <a href="#" class="nav-item">
          <span>👥</span> Customers
        </a>
        <a href="#" class="nav-item">
          <span>⚙️</span> Settings
        </a>
      </nav>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="search-box">
          <input type="text" placeholder="Search...">
        </div>
        <div class="topbar-actions">
          <button class="icon-btn">🔔</button>
          <div class="user-profile">
            <div class="avatar">JD</div>
            <span>John Doe</span>
          </div>
        </div>
      </header>

      <div class="content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <p>Total Users</p>
              <h3>12,345</h3>
              <span class="trend up">+12.5%</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
              <p>Revenue</p>
              <h3>$45,678</h3>
              <span class="trend up">+8.2%</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-info">
              <p>Orders</p>
              <h3>1,234</h3>
              <span class="trend up">+5.7%</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <p>Rating</p>
              <h3>4.8</h3>
              <span class="trend up">+0.3</span>
            </div>
          </div>
        </div>

        <div class="charts-section">
          <div class="chart-card">
            <h3>Revenue Overview</h3>
            <div class="chart-placeholder">
              <div class="bar" style="height: 60%"></div>
              <div class="bar" style="height: 80%"></div>
              <div class="bar" style="height: 45%"></div>
              <div class="bar" style="height: 90%"></div>
              <div class="bar" style="height: 70%"></div>
              <div class="bar" style="height: 85%"></div>
              <div class="bar" style="height: 95%"></div>
            </div>
          </div>
          <div class="chart-card">
            <h3>Recent Orders</h3>
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1234</td>
                  <td>Alice Smith</td>
                  <td>$299</td>
                  <td><span class="status completed">Completed</span></td>
                </tr>
                <tr>
                  <td>#1235</td>
                  <td>Bob Johnson</td>
                  <td>$149</td>
                  <td><span class="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>#1236</td>
                  <td>Carol White</td>
                  <td>$499</td>
                  <td><span class="status completed">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f3f4f6;
  color: #1f2937;
}

.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: white;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #10b981;
}

.sidebar-nav {
  padding: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #6b7280;
  text-decoration: none;
  border-radius: 10px;
  margin-bottom: 4px;
  transition: all 0.2s;
  font-weight: 500;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.nav-item.active {
  background: #10b981;
  color: white;
}

.main-content {
  flex: 1;
  margin-left: 260px;
}

.topbar {
  background: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-box input {
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  width: 300px;
  font-size: 0.875rem;
}

.search-box input:focus {
  outline: none;
  border-color: #10b981;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #f3f4f6;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981, #34d399);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.content {
  padding: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 56px;
  height: 56px;
  background: #f0fdf4;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-info p {
  color: #6b7280;
  font-size: 0.875rem;
}

.stat-info h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 4px 0;
}

.trend {
  font-size: 0.875rem;
  font-weight: 500;
}

.trend.up {
  color: #10b981;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.chart-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.chart-placeholder {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 200px;
}

.bar {
  flex: 1;
  background: linear-gradient(180deg, #10b981, #34d399);
  border-radius: 6px 6px 0 0;
  transition: height 0.3s;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.orders-table th {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.orders-table td {
  font-size: 0.875rem;
}

.status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status.completed {
  background: #d1fae5;
  color: #065f46;
}

.status.pending {
  background: #fef3c7;
  color: #92400e;
}

@media (max-width: 1024px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  
  .main-content {
    margin-left: 0;
  }
}`,
    js: `// Navigation active state
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// Search functionality
document.querySelector('.search-box input').addEventListener('input', function(e) {
  console.log('Searching:', e.target.value);
});

// Simulate real-time updates
setInterval(() => {
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => {
    const newHeight = Math.floor(Math.random() * 50) + 40;
    bar.style.height = newHeight + '%';
  });
}, 3000);

// Add animation to stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s, transform 0.5s';
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 100);
});`,
  },
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm AdTech Genie, your AI code generator. Tell me what kind of website you want to build, and I'll generate the complete code for you!",
      timestamp: "",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const generateCode = (query: string): { content: string; files: GeneratedFile[] } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("landing") || lowerQuery.includes("landing page") || lowerQuery.includes("homepage")) {
      return {
        content: "I've generated a modern landing page with hero section, features, and responsive design.",
        files: [
          { name: "index.html", content: codeTemplates.landing.html, language: "html" },
          { name: "styles.css", content: codeTemplates.landing.css, language: "css" },
          { name: "script.js", content: codeTemplates.landing.js, language: "javascript" },
        ],
      };
    }
    
    if (lowerQuery.includes("portfolio") || lowerQuery.includes("personal website") || lowerQuery.includes("about me")) {
      return {
        content: "I've generated a beautiful portfolio website with projects, about section, and contact form.",
        files: [
          { name: "index.html", content: codeTemplates.portfolio.html, language: "html" },
          { name: "styles.css", content: codeTemplates.portfolio.css, language: "css" },
          { name: "script.js", content: codeTemplates.portfolio.js, language: "javascript" },
        ],
      };
    }
    
    if (lowerQuery.includes("dashboard") || lowerQuery.includes("admin") || lowerQuery.includes("analytics")) {
      return {
        content: "I've generated a complete admin dashboard with stats, charts, and data tables.",
        files: [
          { name: "index.html", content: codeTemplates.dashboard.html, language: "html" },
          { name: "styles.css", content: codeTemplates.dashboard.css, language: "css" },
          { name: "script.js", content: codeTemplates.dashboard.js, language: "javascript" },
        ],
      };
    }

    if (lowerQuery.includes("button")) {
      return {
        content: "Here's a modern button component:",
        files: [
          { name: "button.html", content: `<button class="btn">Click Me</button>`, language: "html" },
          { name: "button.css", content: `.btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}`, language: "css" },
        ],
      };
    }

    if (lowerQuery.includes("card")) {
      return {
        content: "Here's a card component:",
        files: [
          { name: "card.html", content: `<div class="card">
  <div class="card-image"></div>
  <div class="card-content">
    <h3>Card Title</h3>
    <p>Card description goes here.</p>
  </div>
</div>`, language: "html" },
          { name: "card.css", content: `.card {
  width: 300px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.card-image {
  height: 180px;
  background: linear-gradient(135deg, #10b981, #34d399);
}

.card-content {
  padding: 20px;
}

.card h3 {
  margin-bottom: 8px;
  color: #1f2937;
}

.card p {
  color: #6b7280;
  font-size: 0.9rem;
}`, language: "css" },
        ],
      };
    }

    return {
      content: "I can generate full websites for you! Try asking for:\n- Landing page\n- Portfolio website\n- Admin dashboard\n- Or specific components like buttons, cards, etc.",
      files: [],
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setGeneratedFiles([]);
    setShowPreview(false);

    setTimeout(() => {
      const result = generateCode(input);
      
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: result.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        code: result.files.length > 0 ? result.files[0].content : undefined,
        language: result.files.length > 0 ? result.files[0].language : undefined,
        fileName: result.files.length > 0 ? result.files[0].name : undefined,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setGeneratedFiles(result.files);
      setShowPreview(result.files.length > 0);
      setIsTyping(false);
    }, 1500);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const formatTime = (timestamp: string) => timestamp;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-300 rounded-full mix-blend-screen filter blur-3xl opacity-50" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-64 h-64 border-2 border-green-400/30 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute inset-4 w-56 h-56 border border-emerald-400/20 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          <div className="absolute inset-8 w-48 h-48 border border-lime-400/20 rounded-full animate-spin" style={{ animationDuration: "10s" }} />
          <div className="absolute inset-12 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto h-screen flex flex-col p-4">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AdTech Genie</h1>
              <p className="text-xs text-green-300">AI Code Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-300">Online</span>
          </div>
        </header>

        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl border border-green-500/20 shadow-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl ${message.role === "user" ? "px-4 py-3" : ""}`}>
                  {message.role === "user" ? (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-2xl">
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 text-green-100">{formatTime(message.timestamp)}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-white/20 text-green-50 border border-green-500/20 px-4 py-3 rounded-2xl">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs mt-1 text-green-300">{formatTime(message.timestamp)}</p>
                      </div>
                      {message.code && (
                        <div className="bg-gray-900/90 rounded-xl overflow-hidden border border-green-500/30">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                            <span className="text-xs text-green-400 font-mono">{message.fileName}</span>
                            <button onClick={() => copyCode(message.code || "")} className="text-xs text-gray-400 hover:text-white transition-colors">
                              📋 Copy
                            </button>
                          </div>
                          <pre className="p-4 text-xs text-gray-300 overflow-x-auto max-h-64 font-mono">
                            <code>{message.code}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/20 rounded-2xl px-4 py-3 border border-green-500/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-green-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe what you want to build..."
                className="flex-1 bg-white/10 border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder-green-300/50 focus:outline-none focus:border-green-400"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-green-500/30 disabled:shadow-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-green-300/60 mt-2 text-center">
              Try: &quot;landing page&quot;, &quot;portfolio&quot;, &quot;dashboard&quot;, &quot;button&quot;, &quot;card&quot;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
