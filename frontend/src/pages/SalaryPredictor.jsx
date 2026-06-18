import { useState } from "react";
import API from "../services/api";

function SalaryPredictor() {

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [skills, setSkills] = useState("");

    const [result, setResult] = useState(null);

    const predictSalary = async () => {

        try {

            const res = await API.post(
                "/api/predict-salary",
                {
                    role: role,
                    experience: parseInt(experience),
                    skills: skills
                }
            );

            setResult(res.data);

        }

        catch (err) {

            console.log(err);

            alert("Salary prediction failed");

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

            <h1>
                AI Salary Predictor
            </h1>

            <hr />

            <br />

            <input
                type="text"
                placeholder="Job Role"
                value={role}
                onChange={(e) =>
                    setRole(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <input
                type="number"
                placeholder="Years of Experience"
                value={experience}
                onChange={(e) =>
                    setExperience(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px"
                }}
            />

            <textarea
                placeholder="Skills (Example: Python, AWS, Machine Learning)"
                value={skills}
                onChange={(e) =>
                    setSkills(e.target.value)
                }
                rows="4"
                style={{
                    width: "100%",
                    padding: "10px"
                }}
            />

            <br />
            <br />

            <button
                onClick={predictSalary}
                style={{
                    padding: "12px 20px"
                }}
            >
                Predict Salary
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
                        Prediction Result
                    </h2>

                    <hr />

                    <p>
                        <b>Role :</b>
                        {" "}
                        {result.role}
                    </p>

                    <p>
                        <b>Experience :</b>
                        {" "}
                        {result.experience}
                        {" "}
                        Years
                    </p>

                    <h2>

                        Estimated Salary

                    </h2>

                    <h1>

                        ₹
                        {result.estimated_salary.toLocaleString()}
                        {" "}
                        / Year

                    </h1>

                </div>

            }

        </div>

    );

}

export default SalaryPredictor;