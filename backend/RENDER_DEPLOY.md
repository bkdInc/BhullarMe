# Deploy Backend to Render.com (100% FREE)

## Why Render?
- ✅ Truly free (750 hours/month)
- ✅ Auto-deploys from GitHub
- ✅ HTTPS included
- ✅ No credit card required
- ⚠️ Sleeps after 15 min inactivity (wakes up in ~30 seconds)

## Setup (5 minutes):

### 1. Push Your Code to GitHub
```bash
cd E:\GitHub\BhullarMe
git add .
git commit -m "Backend ready for deployment"
git push
```

### 2. Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest)

### 3. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `BhullarMe`
3. Configure:
   - **Name:** bhullar-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### 4. Add Environment Variables
Click "Advanced" and add:
- `USER` = your-email@gmail.com
- `APP_PASSWORD` = your-gmail-app-password
- `EMAIL_FROM` = your-email@gmail.com
- `FRONTEND_URL` = https://bhullar.me
- `NODE_ENV` = production

### 5. Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://bhullar-backend.onrender.com`

### 6. Test
Visit: `https://bhullar-backend.onrender.com/api/health`

Should see: `{"status":"OK","message":"Backend is running"}`

### 7. Update Angular App
In your Angular environment files, update the API URL:

**environments/environment.production.ts:**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://bhullar-backend.onrender.com'
};
```

## Done! 🎉

Your backend is now live and will auto-deploy whenever you push to GitHub.

## Note about Free Tier
- App sleeps after 15 min of no requests
- First request after sleep takes ~30 seconds to wake up
- After that, it's fast
- To prevent sleep: upgrade to paid ($7/month) or use a cron job to ping it every 10 minutes
