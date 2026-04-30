# 🚀 MegaBlog

A full-stack blog application built with **React, Redux Toolkit, and Appwrite**, allowing users to create, edit, and manage blog posts with rich text content and images.

---

## 🌐 Live Demo

👉 https://megablog-1-ankx.onrender.com

---

## 📌 Features

* 🔐 User Authentication (Signup/Login/Logout)
* 📝 Create, Edit, and Delete Blog Posts
* 🖼️ Upload and display featured images
* ✍️ Rich Text Editor (TinyMCE)
* 📱 Responsive UI with Tailwind CSS
* 🔒 Protected routes using React Router
* ⚡ Fast build using Vite
* 🔍 SEO optimized (meta tags, OG, Twitter, sitemap, robots.txt)

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Redux Toolkit
* React Router DOM v7
* Tailwind CSS v4
* Vite

### Backend

* Appwrite (Auth, Database, Storage)

### Editor

* TinyMCE

---

## 📂 Project Structure

```
src/
├── appwrite/        # Backend services (Auth + Database + Storage)
├── components/      # Reusable UI components
├── pages/           # Page-level components
├── store/           # Redux store & slices
├── conf/            # Environment config
public/
├── robots.txt       # Crawler instructions
├── sitemap.xml      # Static sitemap
└── og-image.png     # Social share image (1200×630)
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root (no quotes around values):

```
VITE_APPWRITE_URL=https://nyc.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_api_key
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```
git clone https://github.com/SiddhantLabaje/MegaBlog.git
cd MegaBlog
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run locally

```
npm run dev
```

### 4️⃣ Build for production

```
npm run build
```

---

## 🌍 Deployment

* Frontend hosted on **Render** (Static Site)
* Backend powered by **Appwrite Cloud**
* Add a rewrite rule in Render: `/* → /index.html` for client-side routing

---

## 🔍 SEO Setup

### File locations

| File | Location | Purpose |
|---|---|---|
| `index.html` | project root | Base meta tags, OG, Twitter |
| `public/robots.txt` | `public/` | Crawler instructions |
| `public/sitemap.xml` | `public/` | Static sitemap |
| `src/components/SEO.jsx` | `src/components/` | Per-page dynamic meta tags |

### How the SEO component works

```jsx
import { SEO } from '../components'

<SEO
  title="Page Title"
  description="Page description under 155 chars."
  path="/page-path"
  type="article"
/>
```

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → `https://megablog-1-ankx.onrender.com`
3. Verify via HTML tag → paste into `index.html` `<head>`
4. Submit sitemap: `https://megablog-1-ankx.onrender.com/sitemap.xml`

---

## ⚠️ Important Notes

* Add your deployed domain in Appwrite → **Settings → Platforms**
* Add your domain in TinyMCE → **Allowed Domains**
* Do **not** upload `.env` to GitHub
* `.env` values must **not** be wrapped in quotes

---

## 🧠 Learnings

* Integration of frontend with Appwrite BaaS
* Handling authentication and protected routes
* Managing global state with Redux Toolkit
* File uploads and image rendering via Appwrite Storage
* Debugging real-world issues (CORS, SDK v24 API changes, Redux serialization)
* Frontend-only SEO with dynamic meta tags

---

## 📸 Screenshots

*(Add your screenshots here)*

---

## 🤝 Contributing

Feel free to fork this repository and contribute.

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Siddhant Labaje**

---

⭐ If you like this project, give it a star on GitHub!
