# Deployment Guide

## Quick Deploy to Netlify via GitHub

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Jeffrey Epstein Investigation Platform"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `epstein-investigation-platform` (or your preferred name)
3. Make it **public** for best demo visibility
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Netlify
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" and authorize
4. Select your repository
5. Netlify will auto-detect Next.js settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18

### Step 5: Configure Custom Domain (Optional)
- In Netlify dashboard: Site settings → Domain management
- Add custom domain or use the provided `*.netlify.app` domain

## Key Files for Deployment

### ✅ Already Configured:
- `netlify.toml` - Netlify configuration
- `.gitignore` - Git ignore rules
- `_headers` - Security headers
- `package.json` - Build scripts
- `next.config.js` - Next.js config

### Environment Variables (if needed later):
- Add in Netlify dashboard: Site settings → Environment variables

## Build Verification
The project builds successfully with:
```bash
npm run build
```

## Site Features Ready for Demo:
- 📊 Advanced Timeline (40+ events)
- 🕸️ Interactive Network Analysis
- 📚 Document Library (8 critical documents)
- 🗺️ Geographic Mapping
- 📋 Evidence Grid
- 🔍 Advanced Search & Filtering
- 📱 Responsive Design
- 🌙 Dark/Light Theme

## Performance Optimizations:
- Static generation
- Image optimization
- Code splitting
- Caching headers
- Compression enabled

---

**Estimated Deploy Time**: 2-3 minutes
**Live Demo URL**: Will be provided after Netlify deployment 