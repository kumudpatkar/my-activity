import { useState } from "react";
import API from "../services/api";

function Interview() {

    const [role, setRole] = useState("");
    const [questions, setQuestions] = useState([]);

    const generateQuestions = async () => {

        try {

            const res = await API.post(
                "/api/interview-questions",
                {
                    role: role
                }
            );

            setQuestions(
                res.data.questions
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>
                AI Mock Interview
            </h1>

            <br />

            <input

                type="text"

                placeholder="Enter Job Role"

                value={role}

                onChange={(e) =>
                    setRole(
                        e.target.value
                    )
                }

                style={{
                    padding: "10px",
                    width: "300px"
                }}

            />

            <button

                onClick={
                    generateQuestions
                }

                style={{
                    marginLeft: "10px"
                }}

            >

                Generate

            </button>

            <br />
            <br />

            {

                questions.map(
                    (
                        question,
                        index
                    ) => (

                        <div
                            key={index}
                            style={{
                                border:
                                    "1px solid gray",
                                padding:
                                    "10px",
                                marginBottom:
                                    "10px",
                                borderRadius:
                                    "8px"
                            }}
                        >

                            <b>
                                Q{index + 1}
                            </b>

                            {" "}

                            {question}

                        </div>

                    )
                )

            }

        </div>

    );
}

export default Interview;