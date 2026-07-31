# Firebase Setup Guide

This project uses Firebase Authentication, Cloud Firestore, and Firebase Storage.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** and follow the setup steps
3. Enable Google Analytics if desired

## 2. Register a Web App

1. In your Firebase project, click the web icon (`</>`) to add a web app
2. Give it a nickname like `astra-web`
3. Copy the Firebase configuration object

## 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your Firebase config values from the web app registration

## 4. Enable Authentication

1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Save

## 5. Enable Firestore

1. Go to **Firestore Database** → **Create database**
2. Start in **production mode** or **test mode** initially
3. After setup, go to the **Rules** tab and paste the contents of `firestore.rules`
4. Publish

## 6. Enable Storage

1. Go to **Storage** → **Get started**
2. Choose production or test mode
3. Go to the **Rules** tab and paste the contents of `storage.rules`
4. Publish

## 7. Create the First Admin

After deploying, register the first member account. Then manually update that user's document in Firestore to set `role: "admin"`.

Path: `users/{uid}`

```json
{
  "role": "admin"
}
```

## 8. GitHub Pages Base Path

If your repository name is different from `ASTRA-WEB-PAGE`, update these files:

1. `vite.config.ts`:
   ```ts
   const base = '/your-repo-name/'
   ```
2. `index.html` — update the `basePath` in the redirect restore script:
   ```js
   const basePath = '/your-repo-name/'
   ```
3. `public/404.html` — update the `basePath`:
   ```js
   const basePath = '/your-repo-name/'
   ```

These changes ensure React Router works correctly on GitHub Pages.

## 9. Add GitHub Secrets (for automatic deployment)

If you use the included GitHub Actions workflow, add these secrets in your GitHub repository settings under **Settings → Secrets and variables → Actions**:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_BASE_PATH` (optional, defaults to `/ASTRA-WEB-PAGE/`)

Alternatively, you can commit your Firebase client config directly since these values are already exposed to the client.

## 10. Deploy

Push to GitHub. The GitHub Actions workflow in `.github/workflows/deploy.yml` will build and deploy automatically.

Alternatively, run locally:

```bash
npm install
npm run dev
```
