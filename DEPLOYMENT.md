# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Done! Your calculator is live 🎉

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `browser-calculator`
   - Directory: `./`

### Method 3: Drag & Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag your project folder to the deployment area
3. Wait for deployment to complete
4. Your calculator is live!

## Other Deployment Options

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site is live!

### GitHub Pages
1. Push to GitHub
2. Go to repository Settings > Pages
3. Select source: Deploy from branch
4. Select branch: main
5. Your site will be available at: `https://username.github.io/repository-name`

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## Environment Setup

No build process required! This is a static site that works out of the box.

### Files needed for deployment:
- ✅ `index.html` - Main page
- ✅ `script.js` - Application logic
- ✅ `calculator-engine.js` - Calculator engine
- ✅ `styles.css` - All styles
- ✅ `vercel.json` - Vercel configuration (optional)

## Post-Deployment Checklist

After deployment, test these features:

### ✅ Basic Functionality
- [ ] Number buttons work
- [ ] All operators (+, -, ×, ÷) work
- [ ] Equals button calculates correctly
- [ ] Clear button resets calculator

### ✅ Keyboard Support
- [ ] Number keys (0-9) work
- [ ] Operator keys (+, -, *, /) work
- [ ] Enter key calculates
- [ ] Escape key clears
- [ ] Backspace deletes digits

### ✅ Responsive Design
- [ ] Works on desktop
- [ ] Works on tablet
- [ ] Works on mobile
- [ ] Buttons are touch-friendly

### ✅ Error Handling
- [ ] Division by zero shows error
- [ ] Invalid operations handled gracefully
- [ ] Error messages clear properly

## Custom Domain (Optional)

### Vercel Custom Domain
1. Go to your project dashboard on Vercel
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Example DNS Settings
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## Performance Optimization

The calculator is already optimized with:
- ✅ Minimal JavaScript (no frameworks)
- ✅ Optimized CSS with custom properties
- ✅ Compressed assets
- ✅ Proper caching headers (via vercel.json)
- ✅ No external dependencies

## Monitoring

### Vercel Analytics (Free)
1. Go to your project dashboard
2. Click "Analytics" tab
3. Enable analytics to track usage

### Google Analytics (Optional)
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Common Issues

**Calculator not loading:**
- Check browser console for errors
- Ensure all files are uploaded
- Verify file paths are correct

**Buttons not working:**
- Check if JavaScript is enabled
- Verify script.js is loading
- Check for console errors

**Styling issues:**
- Ensure styles.css is loading
- Check for CSS syntax errors
- Verify responsive design on different devices

### Support
- Check browser compatibility (Chrome 60+, Firefox 60+, Safari 12+)
- Test on different devices and screen sizes
- Verify HTTPS is working (required for some features)

---

**Your calculator is ready to deploy! 🎉**