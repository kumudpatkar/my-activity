
import { useState } from "react";
import API from "../services/api";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);

    const [result, setResult] = useState(null);

    const analyzeResume = async () => {

        if (!file) {

            alert("Please select a resume.");

            return;
        }

        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        try {

            const res =
                await API.post(
                    "/api/resume-analyzer",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }
                );

            setResult(
                res.data
            );

        }

        catch (err) {

            console.log(err);

            alert(
                "Resume Analysis Failed"
            );

        }

    };

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                AI Resume Analyzer
            </h1>

            <hr />

            <br />

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={
                    analyzeResume
                }
            >
                Analyze Resume
            </button>

            <br />
            <br />

            {

                result && (

                    <div
                        style={{
                            border:
                                "1px solid gray",
                            padding:
                                "20px",
                            borderRadius:
                                "10px"
                        }}
                    >

                        <h2>
                            Resume Score :
                            {" "}
                            {
                                result.resume_score
                            }
                            %
                        </h2>

                        <h3>
                            Skills Found :
                            {" "}
                            {
                                result.found_skills
                            }
                            /
                            {
                                result.total_skills
                            }
                        </h3>

                        <h3>
                            Suggestions
                        </h3>

                        <ul>

                            {
                                result.suggestions.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <li
                                            key={
                                                index
                                            }
                                        >
                                            {
                                                item
                                            }
                                        </li>

                                    )
                                )
                            }

                        </ul>

                    </div>

                )

            }

        </div>

    );

}

export default ResumeAnalyzer;

