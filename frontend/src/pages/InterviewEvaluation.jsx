import { useState } from "react";
import API from "../services/api";

function InterviewEvaluation() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [result, setResult] = useState(null);

    const evaluateAnswer = async () => {

        if (question === "" || answer === "") {

            alert("Please enter question and answer");

            return;
        }

        try {

            const res = await API.post(
                "/api/evaluate-answer",
                {
                    question: question,
                    answer: answer
                }
            );

            setResult(res.data);

        }

        catch (err) {

            console.log(err);

            alert("Evaluation Failed");

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
                AI Interview Answer Evaluation
            </h1>

            <hr />

            <h3>
                Interview Question
            </h3>

            <input

                type="text"

                value={question}

                onChange={(e) =>
                    setQuestion(
                        e.target.value
                    )
                }

                placeholder="Enter interview question"

                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px"
                }}

            />

            <h3>
                Your Answer
            </h3>

            <textarea

                rows="8"

                value={answer}

                onChange={(e) =>
                    setAnswer(
                        e.target.value
                    )
                }

                placeholder="Write your answer here..."

                style={{
                    width: "100%",
                    padding: "10px"
                }}

            />

            <br />
            <br />

            <button

                onClick={
                    evaluateAnswer
                }

                style={{
                    padding: "12px 25px",
                    cursor: "pointer"
                }}

            >

                Evaluate Answer

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
                        Result
                    </h2>

                    <p>

                        <b>
                            Question :
                        </b>

                        {" "}

                        {result.question}

                    </p>

                    <p>

                        <b>
                            Score :
                        </b>

                        {" "}

                        {result.score}

                        /10

                    </p>

                    <h3>
                        Feedback
                    </h3>

                    <ul>

                        {

                            result.feedback.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <li
                                        key={index}
                                    >
                                        {item}
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

export default InterviewEvaluation;