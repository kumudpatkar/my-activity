import { useState } from "react";
import API from "../services/api";

function ATSChecker() {

    const [resume, setResume] = useState("");
    const [role, setRole] = useState("");
    const [result, setResult] = useState(null);

    const checkATS = async () => {

        try {

            const res = await API.post("/api/ats-check", {
                resume_text: resume,
                job_role: role
            });

            setResult(res.data);

        } catch (err) {
            console.log(err);
            alert("Error checking ATS score");
        }
    };

    return (

        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>

            <h1>ATS Resume Checker</h1>

            <textarea
                placeholder="Paste your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                style={{ width: "100%", height: "200px", padding: "10px" }}
            />

            <input
                placeholder="Job Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />

            <button
                onClick={checkATS}
                style={{ marginTop: "10px", padding: "10px 20px" }}
            >
                Check ATS Score
            </button>

            {result && (
                <div style={{ marginTop: "20px" }}>

                    <h2>ATS Score: {result.ats_score}/100</h2>

                    <h3>Matched Keywords</h3>
                    <p>{result.matched_keywords.join(", ")}</p>

                    <h3>Missing Keywords</h3>
                    <p>{result.missing_keywords.join(", ")}</p>

                    <h3>Suggestion</h3>
                    <p>{result.suggestion}</p>

                </div>
            )}

        </div>
    );
}

export default ATSChecker;