# 🚀 Complete Step-by-Step Guide: Deploying EndoCare to Render (render.com)

This guide walks you through deploying the complete EndoCare platform (React Frontend + Spring Boot Backend + PostgreSQL Database) to **Render.com**.

---

## 🔑 Your Updated Admin Login Information

- **Admin Username**: `Elbekendo`
- **Admin Password**: `Elbek1990`

*(The old `admin / password123` has been retired and will return 401 Unauthorized).*

---

## 🛠️ Option 1: 1-Click Blueprint Deployment (Recommended & Easiest)

We have already configured a production `render.yaml` Blueprint file in the root of your project. This automatically provisions the database, backend, and frontend with all environment variables pre-connected.

### Step 1: Push Your Code to GitHub
Open your terminal in the project directory and push the latest code:
```bash
git add .
git commit -m "Configure Render deployment and update admin credentials to Elbekendo"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [dashboard.render.com](https://dashboard.render.com) and log in (or sign up with GitHub).
2. Click the blue **New +** button at the top right, and select **Blueprint**.
3. Select your GitHub repository (`Jasur977/medical-portfolio-website`).
4. Render will detect `render.yaml` and display the 3 resources to be created:
   - **endocare-db** (PostgreSQL Database - Free)
   - **endocare-backend** (Spring Boot Docker Web Service - Free)
   - **endocare-frontend** (React Vite Static Site - Free)
5. Click **Apply**.
6. Render will automatically build the backend container, compile the frontend static site, and wire up the database connection string!

---

## 📋 Option 2: Manual Step-by-Step Deployment on Render

If you prefer to create the services individually in the Render UI:

### Step 1: Create the PostgreSQL Database
1. In Render Dashboard, click **New +** -> **PostgreSQL**.
2. Settings:
   - **Name**: `endocare-db`
   - **Database**: `websited`
   - **User**: `postgres`
   - **Region**: Frankfurt (or closest to you)
   - **Plan**: Free
3. Click **Create Database**.
4. Once created, copy the **Internal Database URL** (e.g. `postgres://postgres:password@dpg-.../websited`).

### Step 2: Create the Backend Web Service
1. Click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `endocare-backend`
   - **Runtime**: **Docker**
   - **Docker Context**: `backend`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Plan**: Free
4. Add **Environment Variables**:
   - `DATABASE_URL` = *(Paste the Internal Database URL from Step 1)*
   - `ADMIN_USERNAME` = `Elbekendo`
   - `ADMIN_PASSWORD` = `Elbek1990`
   - `JWT_SECRET` = `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970`
   - `JWT_EXPIRATION` = `86400000`
5. Click **Create Web Service**.
6. Copy your live backend URL once deployed (e.g. `https://endocare-backend.onrender.com`).

### Step 3: Create the Frontend Static Site
1. Click **New +** -> **Static Site**.
2. Connect your GitHub repository.
3. Configure the static site:
   - **Name**: `endocare-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add **Environment Variable**:
   - `VITE_API_URL` = `https://endocare-backend.onrender.com/api` *(Use your actual backend URL from Step 2)*
5. Configure **Redirects / Rewrites** (under settings):
   - **Type**: Rewrite
   - **Source**: `/*`
   - **Destination**: `/index.html`
   *(This ensures client-side routing works for page refreshes).*
6. Click **Create Static Site**.

---

## 🛡️ Production Verification Checklist

Once both services show **Live**:
1. Open your live frontend URL (e.g. `https://endocare-frontend.onrender.com`).
2. Verify all sections and calculators load smoothly.
3. Click **Doctor Login** in the navbar:
   - Username: `Elbekendo`
   - Password: `Elbek1990`
4. You will see the admin controls and the **Live Session Countdown Badge** (15-minute inactivity security timer) activate in the top navbar!
