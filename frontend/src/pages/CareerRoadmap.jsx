import React, { useState } from "react";
import axios from "axios";

const CareerRoadmap = () => {
  const [role, setRole] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!role.trim()) {
      alert("Please enter a career role");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/career-roadmap",
        {
          role: role,
        }
      );

      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "800px", margin: "auto" }}
      >
        <h2 className="text-center mb-4">🚀 AI Career Roadmap</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Role (e.g. Full Stack Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={generateRoadmap}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        {roadmap.length > 0 && (
          <div className="mt-4">
            <h4>📚 Learning Roadmap</h4>

            <ul className="list-group">
              {roadmap.map((step, index) => (
                <li key={index} className="list-group-item">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRoadmap;