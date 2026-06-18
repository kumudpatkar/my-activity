import { useState } from "react";
import API from "../services/api";

function SkillGap() {

    const [role, setRole] = useState("");
    const [skills, setSkills] = useState("");
    const [result, setResult] = useState(null);

    const analyzeSkills = async () => {

        try {

            const res = await API.post(
                "/api/skill-gap",
                {
                    role: role,
                    skills: skills
                }
            );

            setResult(res.data);

        }

        catch (err) {

            console.log(err);

            alert("Analysis Failed");

        }

    };

    return (

        <div
            style={{
                padding: "20px",
                maxWidth: "900px",
                margin: "auto"
            }}
        >

            <h1>
                AI Skill Gap Analyzer
            </h1>

            <hr />

            <br />

            <input
                type="text"
                placeholder="Target Role (Example: AI ML Engineer)"
                value={role}
                onChange={(e) =>
                    setRole(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px"
                }}
            />

            <textarea
                placeholder="Enter your skills separated by comma
Example:
Python, SQL, Machine Learning"
                value={skills}
                onChange={(e) =>
                    setSkills(e.target.value)
                }
                rows="5"
                style={{
                    width: "100%",
                    padding: "10px"
                }}
            />

            <br />
            <br />

            <button
                onClick={analyzeSkills}
                style={{
                    padding: "12px 20px",
                    cursor: "pointer"
                }}
            >
                Analyze Skills
            </button>

            {

                result &&

                <div
                    style={{
                        marginTop: "30px",
                        border: "1px solid gray",
                        padding: "20px",
                        borderRadius: "10px"
                    }}
                >

                    <h2>
                        Analysis Report
                    </h2>

                    <hr />

                    <h3>
                        Target Role:
                    </h3>

                    <p>
                        {result.target_role}
                    </p>

                    <h3>
                        Match Score:
                    </h3>

                    <h2>
                        {result.match_score}%
                    </h2>

                    <h3>
                        Your Skills:
                    </h3>

                    <ul>

                        {
                            result.your_skills.map(
                                (skill, index) => (

                                    <li key={index}>
                                        {skill}
                                    </li>

                                )
                            )
                        }

                    </ul>

                    <h3>
                        Missing Skills:
                    </h3>

                    <ul>

                        {
                            result.missing_skills.map(
                                (skill, index) => (

                                    <li key={index}>
                                        ❌ {skill}
                                    </li>

                                )
                            )
                        }

                    </ul>

                </div>

            }

        </div>

    );

}

export default SkillGap;