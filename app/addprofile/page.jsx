"use client";

import { useState } from "react";

export default function AddProfile() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    bio: "",
    image_url: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Profile added successfully!");
      setForm({
        name: "",
        title: "",
        email: "",
        bio: "",
        image_url: "",
      });
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <section style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h1>Add a New Profile</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>Title:
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>Email:
          <input name="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>Bio:
          <textarea name="bio" value={form.bio} onChange={handleChange} required />
        </label>

        <label>Image URL:
          <input name="image_url" value={form.image_url} onChange={handleChange} required />
        </label>

        <button type="submit">Add Profile</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}
