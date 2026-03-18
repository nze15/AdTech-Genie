#!/usr/bin/env node

/**
 * AdTech Genie Setup Validation Script
 * 
 * Checks that all required configuration is in place
 * for the mobile AI agent to function properly
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function check(condition, successMsg, failMsg) {
  if (condition) {
    log(`✓ ${successMsg}`, 'green');
    return true;
  } else {
    log(`✗ ${failMsg}`, 'red');
    return false;
  }
}

function validate() {
  log('\n' + '='.repeat(60), 'blue');
  log('AdTech Genie - Setup Validation', 'bold');
  log('='.repeat(60) + '\n', 'blue');

  let passed = 0;
  let failed = 0;

  // Check Node/Bun
  log('1. Runtime Environment', 'bold');
  const nodeVersion = process.version;
  if (check(true, `Node.js ${nodeVersion} detected`, '')) {
    passed++;
  }

  // Check .env.local
  log('\n2. Environment Variables', 'bold');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    if (check(envContent.includes('GROQ_API_KEY'), '.env.local exists with GROQ_API_KEY', '.env.local missing or incomplete')) {
      passed++;
    } else {
      failed++;
    }
  } else {
    if (check(false, '.env.local exists', '.env.local not found. Copy from .env.example and add your API keys')) {
      passed++;
    } else {
      failed++;
    }
  }

  // Check required files
  log('\n3. Required Files', 'bold');
  const requiredFiles = [
    'src/app/chat/page.tsx',
    'src/app/chat/components/chat-messages.tsx',
    'src/app/chat/components/code-preview.tsx',
    'src/lib/groq.ts',
    'src/lib/store.ts',
    'src/app/api/chat/generate/route.ts',
    'package.json',
    'next.config.ts',
  ];

  requiredFiles.forEach((file) => {
    const filePath = path.join(process.cwd(), file);
    if (check(fs.existsSync(filePath), `${file}`, `Missing: ${file}`)) {
      passed++;
    } else {
      failed++;
    }
  });

  // Check package.json dependencies
  log('\n4. Package Dependencies', 'bold');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const deps = packageJson.dependencies || {};

    const requiredDeps = ['next', 'react', '@groq/sdk', 'zustand'];
    requiredDeps.forEach((dep) => {
      if (check(dep in deps, `${dep} installed`, `${dep} not found in package.json`)) {
        passed++;
      } else {
        failed++;
      }
    });
  }

  // Check database setup
  log('\n5. Database Setup (Optional)', 'bold');
  const supabaseSetupPath = path.join(process.cwd(), 'scripts/supabase-setup.sql');
  if (check(fs.existsSync(supabaseSetupPath), 'Supabase schema available', 'Supabase schema not found')) {
    passed++;
  } else {
    log('(This is optional - app works without Supabase)', 'yellow');
  }

  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log(`Validation Summary: ${passed} passed, ${failed} failed`, failed === 0 ? 'green' : 'red');
  log('='.repeat(60) + '\n', 'blue');

  if (failed === 0) {
    log('Setup looks good! You can now run:', 'green');
    log('  bun run dev\n', 'bold');
    log('Then visit: http://localhost:3000/chat\n', 'blue');
    return 0;
  } else {
    log('Please fix the above issues before running the app.\n', 'yellow');
    log('Setup guide: See SETUP_AI_AGENT.md for help\n', 'blue');
    return 1;
  }
}

process.exit(validate());
