# Deployment Instructions for Brijesh Munjiyasara Portfolio

## Option 1: Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel --prod --name brijesh-munjiyasara
```

## Option 2: Deploy via Vercel Dashboard
1. Push this project to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Set project name: "brijesh-munjiyasara"
5. Click Deploy

## Option 3: Deploy Static to Netlify
```bash
# Build static export
npm run build

# Deploy to Netlify Drop
# Go to https://app.netlify.com/drop
# Drag the 'out' folder
```
