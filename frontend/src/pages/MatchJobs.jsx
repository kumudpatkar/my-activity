import { useState } from "react";
import API from "../services/api";

function MatchJobs() {
    const [file, setFile] = useState(null);
    const [matches, setMatches] = useState([]);

    const matchJobs = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await API.post(
            "/api/match-jobs",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setMatches(response.data.matches);
    };

    return (
        <div>
            <h1>AI Job Matching</h1>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br />
            <br />

            <button onClick={matchJobs}>
                Match Jobs
            </button>

            <ul>
                {matches.map((job, index) => (
                    <li key={index}>
                        {job.title} - {job.company} - {job.match_score}%
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MatchJobs;