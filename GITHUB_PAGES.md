# GitHub Pages Configuration

This file ensures the repository is properly configured for GitHub Pages deployment.

## Deployment Instructions

1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
3. Click **Save**

Your site will be published at: `https://anacondy.github.io/25-2-saving-pro-2/`

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

## Files Served

- `index.html` - Main entry point
- `styles.css` - Stylesheet
- `app.js` - JavaScript functionality
- `screenshots/` - UI screenshots
- `wiki/` - Documentation

## Notes

- GitHub Pages automatically serves `index.html` as the homepage
- All assets are loaded from the same origin (security best practice)
- HTTPS is automatically enabled by GitHub Pages
