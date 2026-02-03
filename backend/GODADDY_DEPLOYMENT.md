# GoDaddy Deployment Guide for Backend

## Prerequisites
- GoDaddy Shared Hosting or VPS with Node.js support
- SSH access enabled
- Node.js version 14+ available on your hosting

## Step 1: Prepare Your Backend for Production

1. **Make sure all dependencies are installed locally:**
   ```bash
   cd backend
   npm install
   ```

2. **Build the TypeScript code:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with compiled JavaScript.

3. **Test locally before deploying:**
   ```bash
   npm start
   ```
   Visit http://localhost:3000/api/health to verify it works.

## Step 2: Configure Environment Variables

1. **Create a `.env` file** (do NOT commit this to Git):
   ```
   USER=your-email@gmail.com
   APP_PASSWORD=your-gmail-app-password
   EMAIL_FROM=your-email@gmail.com
   PORT=3000
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Get Gmail App Password:**
   - Go to Google Account > Security > 2-Step Verification
   - Scroll to "App passwords"
   - Generate a new app password for "Mail"
   - Use this password in `APP_PASSWORD`

## Step 3: Upload Files to GoDaddy

### Option A: Using cPanel File Manager
1. Log into your GoDaddy cPanel
2. Go to File Manager
3. Navigate to your public_html or desired directory
4. Create a `backend` folder
5. Upload these files/folders:
   - `dist/` (compiled JavaScript)
   - `EmailTemp/` (email templates)
   - `node_modules/` (or run npm install on server)
   - `package.json`
   - `package-lock.json`
   - `.htaccess`
   - `.env` (create on server or upload)

### Option B: Using SSH/FTP
1. Connect via SSH or FTP client (FileZilla)
2. Navigate to your hosting directory
3. Upload the backend folder contents
4. Run: `npm install --production` to install dependencies

## Step 4: GoDaddy-Specific Configuration

### For Shared Hosting with cPanel:

1. **Setup Node.js Application in cPanel:**
   - Go to cPanel > Software > Setup Node.js App
   - Click "Create Application"
   - Node.js version: Select latest available (14.x or higher)
   - Application mode: Production
   - Application root: `backend` (or your backend folder path)
   - Application URL: `subdomain.yourdomain.com` or `/backend`
   - Application startup file: `dist/server.js`
   - Click "Create"

2. **Add Environment Variables in cPanel:**
   - In the Node.js App setup, add your environment variables:
     - `USER` = your-email@gmail.com
     - `APP_PASSWORD` = your-gmail-app-password
     - `EMAIL_FROM` = your-email@gmail.com
     - `PORT` = (use the port provided by GoDaddy, usually auto-assigned)
     - `FRONTEND_URL` = https://yourdomain.com

3. **Start/Restart the Application:**
   - Click "Restart" in the Node.js App interface

### For VPS/Dedicated Server:

1. **Install Node.js** (if not already installed):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   cd /home/yourusername/backend
   pm2 start dist/server.js --name backend-api
   pm2 save
   pm2 startup
   ```

3. **Setup Nginx reverse proxy:**
   Create `/etc/nginx/sites-available/backend`:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Step 5: Update Angular Frontend

Update your Angular app to point to the backend URL:

**In `environments/environment.production.ts`:**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com' // or https://yourdomain.com/backend
};
```

**Update your email service:**
```typescript
constructor(private http: HttpClient) {}

sendEmail(data: any) {
  return this.http.post(`${environment.apiUrl}/api/send-email`, data);
}
```

## Step 6: Test Your Deployment

1. **Test health endpoint:**
   ```
   https://api.yourdomain.com/api/health
   ```
   Should return: `{"status":"OK","message":"Backend is running"}`

2. **Test email endpoint:**
   - Submit the contact form on your website
   - Check server logs in cPanel or via SSH

## Troubleshooting

### Issue: Port already in use
- **Solution:** GoDaddy assigns ports automatically. Don't hardcode PORT in production.

### Issue: Cannot find module errors
- **Solution:** Run `npm install` in the backend directory on the server.

### Issue: CORS errors
- **Solution:** Update `FRONTEND_URL` in `.env` to match your actual domain.

### Issue: Gmail authentication fails
- **Solution:** 
  - Enable 2-Step Verification on Gmail
  - Generate an App Password (not your regular password)
  - Update `APP_PASSWORD` in `.env`

### Check Logs:
- **cPanel:** Node.js App > View Logs
- **VPS with PM2:** `pm2 logs backend-api`
- **VPS without PM2:** Check `/var/log/nodejs/` or your log directory

## Security Checklist
- ✅ Never commit `.env` to Git (add to `.gitignore`)
- ✅ Use environment variables for sensitive data
- ✅ Enable HTTPS/SSL certificate (Let's Encrypt via cPanel)
- ✅ Regularly update dependencies: `npm audit fix`
- ✅ Use strong Gmail app password
- ✅ Limit CORS to your domain only

## Common GoDaddy Hosting Plans

| Plan | Node.js Support | Deployment Method |
|------|----------------|-------------------|
| Economy Shared | ❌ No | Not supported |
| Deluxe/Ultimate Shared | ❌ No | Not supported |
| Business Hosting | ✅ Yes | cPanel Node.js App |
| VPS Hosting | ✅ Yes | SSH + PM2 + Nginx |
| Dedicated Server | ✅ Yes | SSH + PM2 + Nginx |

**Note:** If your current plan doesn't support Node.js, you'll need to upgrade or use alternative hosting (Heroku, DigitalOcean, AWS, etc.).

## Alternative: Use GoDaddy for Frontend Only

If Node.js is not supported on your plan:
1. Host Angular frontend on GoDaddy
2. Deploy backend to:
   - **Heroku** (Free/Paid): Easy deployment
   - **Railway** (Free tier): Simple setup
   - **Render** (Free tier): Auto-deploy from Git
   - **DigitalOcean** ($5/month): Full VPS control

This is actually recommended for better separation and scalability!
