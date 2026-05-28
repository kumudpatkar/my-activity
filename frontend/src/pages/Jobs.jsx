import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log("Error fetching jobs:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 Latest Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            <h2>{job.title}</h2>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Skills:</b> {job.skills}</p>
            <p><b>Salary:</b> {job.salary}</p>
            <p><b>Experience:</b> {job.experience}</p>
            <p>{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Jobs;