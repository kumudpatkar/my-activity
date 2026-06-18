import { useState } from "react";
import API from "../services/api";

function AIResume() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    // ================= ANALYZE RESUME =================
    const analyzeResume = async () => {

        if (!file) {
            alert("Please upload a resume");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await API.post(
                "/api/analyze-resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log(res.data);

            setAnalysis(res.data.analysis || "No analysis found");

        } catch (err) {
            console.log(err);
            alert("Analyze failed");
        } finally {
            setLoading(false);
        }
    };

    // ================= MATCH JOBS =================
    const matchJobs = async () => {

        if (!file) {
            alert("Please upload a resume");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", file);

            const res = await API.post(
                "/api/match-jobs",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log(res.data);

            setMatches(res.data.top_matches || []);

        } catch (err) {
            console.log(err);
            alert("Match jobs failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>AI Resume Analyzer 🚀</h1>

            {/* FILE UPLOAD */}
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            {/* BUTTONS */}
            <button onClick={analyzeResume}>
                Analyze Resume
            </button>

            <button
                onClick={matchJobs}
                style={{ marginLeft: "10px" }}
            >
                Match Jobs
            </button>

            {loading && <p>Processing...</p>}

            <hr />

            {/* ANALYSIS OUTPUT */}
            <h2>Resume Analysis</h2>

            <pre style={{
                background: "#f4f4f4",
                padding: "10px",
                whiteSpace: "pre-wrap"
            }}>
                {analysis}
            </pre>

            <hr />

            {/* JOB MATCHES */}
            <h2>Top Job Matches</h2>

            {matches.length === 0 && <p>No matches yet</p>}

            {matches.map((job, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <h3>{job.title}</h3>

                    <p><b>Company:</b> {job.company}</p>

                    <p><b>Match Score:</b> {job.match_score}%</p>

                    <p><b>Skills:</b> {job.skills_required}</p>

                    <p>{job.reason}</p>
                </div>
            ))}

        </div>
    );
}

export default AIResume;