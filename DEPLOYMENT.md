# 🚀 Deployment Guide

This guide covers various deployment options for your Inventory Manager SPA.

## Build for Production

First, create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist/inventory-spa/` directory.

## Deployment Options

### 1. Static Web Hosting

The application is a static SPA and can be hosted on any static file server.

#### GitHub Pages

1. Install angular-cli-ghpages:
```bash
npm install -g angular-cli-ghpages
```

2. Build with base href:
```bash
ng build --base-href "/your-repo-name/"
```

3. Deploy:
```bash
npx angular-cli-ghpages --dir=dist/inventory-spa
```

#### Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Connect your repository or drag-and-drop the `dist/inventory-spa` folder
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/inventory-spa`
4. Deploy!

Alternatively, use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist/inventory-spa
```

#### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com)

#### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init hosting
```

3. Configure:
   - Public directory: `dist/inventory-spa`
   - Single-page app: Yes
   - Automatic builds: Optional

4. Deploy:
```bash
firebase deploy
```

### 2. Traditional Web Server

#### Apache

1. Copy `dist/inventory-spa` contents to server
2. Create `.htaccess` file:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx

1. Copy `dist/inventory-spa` contents to server
2. Configure nginx:

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/dist/inventory-spa;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

3. Restart nginx:
```bash
sudo systemctl restart nginx
```

### 3. Docker

Create a `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist/inventory-spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

Build and run:

```bash
docker build -t inventory-spa .
docker run -p 8080:80 inventory-spa
```

### 4. Cloud Platforms

#### AWS S3 + CloudFront

1. Create S3 bucket
2. Enable static website hosting
3. Upload `dist/inventory-spa` contents
4. Configure CloudFront distribution
5. Update bucket policy for public access

#### Google Cloud Storage

1. Create a bucket
2. Upload files:
```bash
gsutil -m cp -r dist/inventory-spa/* gs://your-bucket-name
```
3. Configure for web hosting
4. Set up load balancer if needed

#### Azure Static Web Apps

1. Install Azure CLI
2. Create resource:
```bash
az staticwebapp create \
  --name inventory-manager \
  --resource-group your-group \
  --source dist/inventory-spa
```

## HTTPS Configuration

### Let's Encrypt (Free SSL)

For nginx/Apache servers:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

For Apache:
```bash
sudo certbot --apache -d your-domain.com
```

## Environment Configuration

### Multiple Environments

Create environment files:

**src/environments/environment.ts** (development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

**src/environments/environment.prod.ts** (production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.your-domain.com'
};
```

Update `angular.json` to use them:
```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ]
  }
}
```

## Performance Optimization

### 1. Enable Gzip Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

**Apache** (.htaccess):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>
```

### 2. Browser Caching

**Nginx**:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### 3. CDN

Consider using a CDN for better global performance:
- Cloudflare (free tier available)
- AWS CloudFront
- Google Cloud CDN
- Azure CDN

## PWA (Progressive Web App)

Add PWA capabilities:

```bash
ng add @angular/pwa
```

This adds:
- Service worker for offline support
- Web app manifest
- Icons for home screen

Rebuild and redeploy!

## Monitoring

### Google Analytics

Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Error Tracking

Consider adding Sentry for error monitoring:

```bash
npm install @sentry/angular
```

## Security Headers

Add security headers to your server:

**Nginx**:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## Pre-Deployment Checklist

- [ ] Run production build successfully
- [ ] Test production build locally
- [ ] Update environment variables
- [ ] Configure HTTPS/SSL
- [ ] Set up domain/DNS
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify camera permissions work
- [ ] Check LocalStorage functionality
- [ ] Set up error monitoring (optional)
- [ ] Configure analytics (optional)
- [ ] Set up backups (for server-based deployments)

## Post-Deployment

1. **Test thoroughly**:
   - Scan items
   - Add to inventory
   - Make a sale
   - Check data persistence

2. **Monitor performance**:
   - Check loading times
   - Monitor error rates
   - Review user feedback

3. **Update regularly**:
   - Keep dependencies updated
   - Apply security patches
   - Add features based on feedback

## Rollback Strategy

Always keep previous builds:

```bash
# Before deploying
cp -r dist/inventory-spa dist/inventory-spa-backup-$(date +%Y%m%d)

# To rollback
# Replace current with backup
```

## Cost Considerations

### Free Hosting Options
- GitHub Pages (free for public repos)
- Netlify (free tier: 100GB bandwidth/month)
- Vercel (free tier: generous limits)
- Firebase Hosting (free tier: 10GB storage, 360MB/day bandwidth)

### Paid Options
- AWS S3 + CloudFront (~$1-5/month for small traffic)
- DigitalOcean App Platform (~$5/month)
- Heroku (~$7/month)

## Need Help?

- Check Angular deployment docs: https://angular.io/guide/deployment
- Check your hosting provider's documentation
- Review server logs for errors
- Test locally with production build first

---

**Ready to deploy? Good luck! 🚀**

