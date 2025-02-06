"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NewChallengeForm = () => {
  const router = useRouter();
  const [challenge, setChallenge] = useState({
    title: "",
    category: "",
    description: "",
    level: "Easy",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setChallenge({ ...challenge, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Get the token from localStorage (ensure that the token is stored there upon login)
      const token = localStorage.getItem("token");

      // Call your Next.js API endpoint for new challenge creation
      const res = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Pass token as Bearer token in the Authorization header.
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(challenge),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create challenge");
      }

      // Optionally, show success feedback and redirect to your challenge listings page.
      router.push("/challenges");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Challenge</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={challenge.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={challenge.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={challenge.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Difficulty</label>
          <select
            name="level"
            value={challenge.level}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Challenge
        </button>
      </form>
    </div>
  );
};

export default NewChallengeForm;
