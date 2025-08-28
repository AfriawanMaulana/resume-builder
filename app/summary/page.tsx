"use client";
import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("english");

  const handleGenerate = async () => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: resume, language }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Resume Summary Generator</h1>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="english">English</option>
        <option value="indonesian">Indonesian</option>
      </select>

      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={6}
        placeholder="Paste your resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate Summary
      </button>

      {summary && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </main>
  );
}
