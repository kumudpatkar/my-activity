import { useState } from "react";
import API from "../services/api";

function CoverLetter() {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [skills, setSkills] = useState("");

    const [letter, setLetter] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");

    const generateLetter = async () => {

        try {

            const res = await API.post(
                "/api/generate-cover-letter",
                {
                    name,
                    role,
                    company,
                    skills
                }
            );

            setLetter(res.data.cover_letter);
            setPdfUrl(res.data.pdf_url);   // PDF path from backend

        } catch (err) {

            console.log(err);
            alert("Failed to generate cover letter");
        }
    };

    return (

        <div
            style={{
                padding: "20px",
                maxWidth: "800px",
                margin: "auto"
            }}
        >

            <h1>AI Cover Letter Generator</h1>

            <hr />
            <br />

            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <input
                type="text"
                placeholder="Job Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <input
                type="text"
                placeholder="Your Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <button
                onClick={generateLetter}
                style={{
                    padding: "12px 20px",
                    cursor: "pointer",
                    marginTop: "10px"
                }}
            >
                Generate Cover Letter
            </button>

            {/* GENERATED LETTER */}
            {letter && (

                <div
                    style={{
                        marginTop: "30px",
                        border: "1px solid gray",
                        padding: "20px",
                        borderRadius: "10px",
                        whiteSpace: "pre-line"
                    }}
                >

                    <h2>Generated Cover Letter</h2>
                    <hr />

                    {letter}

                    {/* DOWNLOAD PDF BUTTON */}
                    {pdfUrl && (

                        <div style={{ marginTop: "15px" }}>

                            <a
                                href={`http://127.0.0.1:8000/${pdfUrl}`}
                                target="_blank"
                                rel="noreferrer"
                            >

                                <button
                                    style={{
                                        padding: "10px 15px",
                                        marginTop: "10px",
                                        backgroundColor: "green",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Download PDF
                                </button>

                            </a>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
}

export default CoverLetter;