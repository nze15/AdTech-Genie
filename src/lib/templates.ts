/**
 * Template library with pre-built code snippets
 */

export const landingPageTemplate = {
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
      <a href="#" class="logo">Brand</a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <header class="hero">
    <div class="container">
      <h1>Build Something Amazing</h1>
      <p>Create stunning websites with modern design and powerful features.</p>
      <button class="btn btn-primary">Get Started</button>
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
    <p>&copy; 2026. All rights reserved.</p>
  </footer>
</body>
</html>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
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
  font-weight: 900;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 30px;
}

.btn {
  padding: 15px 40px;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
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
  padding: 30px;
  text-align: center;
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  .nav-links { display: none; }
}`,
  javascript: `document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});`,
};

export const portfolioTemplate = {
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
      <h1 class="logo">Portfolio</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <section id="home" class="hero">
    <div class="container">
      <h1>Welcome to My Portfolio</h1>
      <p class="tagline">Full Stack Developer & Designer</p>
    </div>
  </section>

  <section id="work" class="work">
    <div class="container">
      <h2>Featured Work</h2>
      <div class="projects">
        <div class="project">
          <div class="project-image"></div>
          <h3>Project 1</h3>
          <p>A full-featured web application</p>
        </div>
        <div class="project">
          <div class="project-image"></div>
          <h3>Project 2</h3>
          <p>Creative design showcase</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>© 2026. All rights reserved.</p>
  </footer>
</body>
</html>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
  text-align: center;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 20px;
}

.tagline {
  font-size: 1.5rem;
  color: #666;
}

.work {
  padding: 100px 0;
}

.work h2 {
  font-size: 2.5rem;
  margin-bottom: 50px;
  text-align: center;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.project {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.project:hover {
  transform: translateY(-10px);
}

.project-image {
  height: 200px;
  background: linear-gradient(135deg, #10b981, #34d399);
}

.project h3 {
  font-size: 1.3rem;
  padding: 20px 20px 10px;
}

.project p {
  padding: 0 20px 20px;
  color: #666;
}

.footer {
  background: #1a1a1a;
  color: white;
  padding: 40px;
  text-align: center;
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  .header nav { display: none; }
}`,
  javascript: `document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});`,
};

export const dashboardTemplate = {
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
      <h2>Dashboard</h2>
      <nav>
        <a href="#" class="active">Overview</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </aside>

    <main class="content">
      <header class="topbar">
        <input type="text" placeholder="Search...">
        <div class="user">User</div>
      </header>

      <div class="stats">
        <div class="stat">
          <h3>Total Users</h3>
          <p>12,345</p>
        </div>
        <div class="stat">
          <h3>Revenue</h3>
          <p>$45,678</p>
        </div>
        <div class="stat">
          <h3>Growth</h3>
          <p>+12.5%</p>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`,
  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f3f4f6;
}

.app {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: white;
  padding: 24px;
  border-right: 1px solid #e5e7eb;
}

.sidebar h2 {
  font-size: 1.25rem;
  color: #10b981;
  margin-bottom: 30px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar nav a {
  padding: 12px 16px;
  text-decoration: none;
  color: #6b7280;
  border-radius: 8px;
  transition: all 0.2s;
}

.sidebar nav a:hover,
.sidebar nav a.active {
  background: #10b981;
  color: white;
}

.content {
  flex: 1;
}

.topbar {
  background: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.topbar input {
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  width: 300px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 30px;
}

.stat {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat h3 {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 10px;
}

.stat p {
  font-size: 1.75rem;
  font-weight: 700;
  color: #10b981;
}`,
  javascript: `// Dashboard interactivity
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.sidebar nav a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});`,
};

export function getTemplate(type: 'landing' | 'portfolio' | 'dashboard') {
  const templates = {
    landing: landingPageTemplate,
    portfolio: portfolioTemplate,
    dashboard: dashboardTemplate,
  };
  return templates[type];
}
