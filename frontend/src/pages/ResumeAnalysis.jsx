import { useState } from "react";
import API from "../services/api";

function ResumeAnalysis() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");

    const uploadResume = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await API.post(
            "/api/analyze-resume",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        setResult(response.data.analysis);
    };

    return (
        <div>
            <h1>AI Resume Analysis</h1>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br />
            <br />

            <button onClick={uploadResume}>
                Analyze Resume
            </button>

            <pre>{result}</pre>
        </div>
    );
}

export default ResumeAnalysis;