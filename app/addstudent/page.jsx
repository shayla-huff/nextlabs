"use client";

import { useState } from "react";

export default function AddStudent() {
    const [form, setForm] = useState({
        name: "",
        major: "",
        year: "",
        gpa: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");

        try {
            const res = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    major: form.major,
                    year: parseInt(form.year),
                    gpa: parseFloat(form.gpa)
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`Added ${data.name} successfully!`);
                setForm({ name: "", major: "", year: "", gpa: "" });
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (err) {
            setMessage(`Network error. Try Again.`);
        }
    };
    
    return (
    <section style={{ maxWidth: "420px", margin: "2rem auto" }}>
      <h1>Add a New Student</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Major:
          <input
            name="major"
            value={form.major}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Year:
          <input
            name="year"
            type="number"
            min="1"
            max="4"
            value={form.year}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          GPA:
          <input
            name="gpa"
            type="number"
            step="0.1"
            min="0"
            max="4"
            value={form.gpa}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Student</button>
        </form>
            {message && <p>{message}</p>}
        </section>
    );
}