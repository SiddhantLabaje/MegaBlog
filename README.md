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

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Vite

### Backend

* Appwrite (Auth, Database, Storage)

---

## 📂 Project Structure

```
src/
├── appwrite/        # Backend services (Auth + Database + Storage)
├── components/      # Reusable UI components
├── pages/           # Page-level components
├── store/           # Redux store & slices
├── conf/            # Environment config
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

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

---

### 2️⃣ Install dependencies

```
npm install
```

---

### 3️⃣ Run locally

```
npm run dev
```

---

### 4️⃣ Build for production

```
npm run build
```

---

## 🌍 Deployment

* Frontend hosted on Render
* Backend powered by Appwrite

---

## ⚠️ Important Notes

* Add your deployed domain in Appwrite → **Settings → Platforms**
* Add your domain in TinyMCE → **Allowed Domains**
* Do not upload `.env` file to GitHub

---

## 🧠 Learnings

* Integration of frontend with backend-as-a-service (Appwrite)
* Handling authentication and protected routes
* Managing global state using Redux Toolkit
* Handling file uploads and image rendering
* Debugging real-world deployment issues (CORS, API keys)

---

## 📸 Screenshots

(Add your screenshots here)

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
