import React from "react";
import { SEO } from "../components";

function Post1() {
  return (
    <div style={{ padding: "20px" }}>
      <SEO
        title="How to Build a Blog with React, Vite and Appwrite"
        description="Step-by-step guide to build a blog using React, Vite and Appwrite with authentication and deployment."
        path="/post/react-appwrite-blog"
        type="article"
      />

      <h1>How to Build a Blog with React, Vite and Appwrite</h1>

      <p>
        In this guide, you will learn how to build a modern blog using React,
        Vite and Appwrite. This includes authentication, rich text editing,
        image uploads, and deployment.
      </p>

      <h2>Tech Stack</h2>
      <p>React, Vite, Appwrite, Tailwind CSS</p>

      <h2>Appwrite Setup</h2>
      <p>Setup Appwrite project, database and authentication.</p>

      <h2>Deployment</h2>
      <p>Deploy using Render static hosting.</p>

      <h2>Conclusion</h2>
      <p>You now have a complete blogging platform.</p>
    </div>
  );
}

export default Post1;
