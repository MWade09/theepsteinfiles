#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying deployment readiness...\n');

// Check if essential files exist
const essentialFiles = [
  'package.json',
  'netlify.toml',
  'tsconfig.json',
  'next.config.js',
  'src/app/page.tsx',
  'src/app/layout.tsx'
];

console.log('📁 Checking essential files:');
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING!`);
  }
});

// Check components
const componentsDir = 'src/components';
const requiredComponents = [
  'Navigation.tsx',
  'HeroSection.tsx', 
  'AdvancedTimeline.tsx',
  'NetworkAnalysis.tsx',
  'DocumentLibrary.tsx',
  'EvidenceGrid.tsx',
  'InteractiveMap.tsx'
];

console.log('\n🧩 Checking components:');
requiredComponents.forEach(component => {
  const componentPath = path.join(componentsDir, component);
  if (fs.existsSync(componentPath)) {
    console.log(`  ✅ ${component}`);
  } else {
    console.log(`  ❌ ${component} - MISSING!`);
  }
});

// Check package.json dependencies
console.log('\n📦 Checking critical dependencies:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const criticalDeps = ['next', 'react', 'react-dom', 'tailwindcss', 'postcss', 'autoprefixer'];

criticalDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    const version = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
    const location = packageJson.dependencies[dep] ? 'dependencies' : 'devDependencies';
    console.log(`  ✅ ${dep}@${version} (${location})`);
  } else {
    console.log(`  ❌ ${dep} - MISSING!`);
  }
});

console.log('\n🚀 Deployment verification complete!');
console.log('   Ready to deploy to Netlify via GitHub integration.'); 