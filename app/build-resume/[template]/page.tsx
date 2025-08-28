"use client"
import React, { useState } from "react";

type Experience = {
  id: number;
  company: string;
  role: string;
};

export default function ExperienceForm() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now(),
      company: "",
      role: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: number, key: keyof Experience, value: string) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [key]: value } : exp))
    );
  };

  const deleteExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Experience</h2>
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="flex flex-col md:flex-row md:items-center gap-2 p-4 border rounded-lg shadow"
        >
          <input
            type="text"
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
            placeholder="Company"
            className="input input-bordered w-full md:w-1/3"
          />
          <input
            type="text"
            value={exp.role}
            onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
            placeholder="Role"
            className="input input-bordered w-full md:w-1/3"
          />
          <button
            onClick={() => deleteExperience(exp.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Add More Experience
      </button>
    </div>
  );
}
