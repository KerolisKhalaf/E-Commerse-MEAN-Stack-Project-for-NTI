# 🚀 Deployment Guide

## Backend Deployment

### 1. Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 2. Railway
1. Connect GitHub repository
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
3. Deploy automatically

### 3. Render
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

## Frontend Deployment

### 1. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or connect GitHub repository
```

### 2. Netlify
1. Connect GitHub repository
2. Set build command: `ng build`
3. Set publish directory: `dist/kkh`
4. Add environment variables
5. Deploy

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/kkhdb
JWT_SECRET=your_super_secret_key
PORT=5000
NODE_ENV=production
```

### Frontend (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.com/api'
};
```

## Database Setup

### MongoDB Atlas
1. Create free cluster
2. Get connection string
3. Update `MONGODB_URI` in environment variables
4. Run seed script: `npm run seed`

## SSL/HTTPS
- Heroku: Automatic
- Railway: Automatic
- Render: Automatic
- Vercel: Automatic
- Netlify: Automatic

## Monitoring
- Use logging services (Winston, Morgan)
- Set up error tracking (Sentry)
- Monitor performance (New Relic)

## Security Checklist
- [ ] Use environment variables
- [ ] Enable CORS properly
- [ ] Validate input data
- [ ] Use HTTPS
- [ ] Set secure headers
- [ ] Rate limiting
- [ ] Input sanitization 