import { useRef, useState } from "react";
import API from "../services/api";

function VoiceInterview() {

    const [question, setQuestion] = useState("");

    const [transcript, setTranscript] = useState("");

    const [result, setResult] = useState(null);

    const [recording, setRecording] = useState(false);

    const [loading, setLoading] = useState(false);

    const mediaRecorder = useRef(null);

    const audioChunks = useRef([]);

    // ================= ASK QUESTION =================

    const askQuestion = () => {

        const q =
            "Tell me about yourself, your skills, and a project you worked on.";

        setQuestion(q);

        setTranscript("");

        setResult(null);

        speechSynthesis.cancel();

        speechSynthesis.speak(
            new SpeechSynthesisUtterance(q)
        );

    };

    // ================= START RECORDING =================

    const startRecording = async () => {

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

            audioChunks.current = [];

            mediaRecorder.current =
                new MediaRecorder(stream);

            mediaRecorder.current.ondataavailable =
                (event) => {

                    if (event.data.size > 0) {

                        audioChunks.current.push(
                            event.data
                        );

                    }

                };

            mediaRecorder.current.start();

            setRecording(true);

        }

        catch (err) {

            console.log(err);

            alert(
                "Microphone permission denied"
            );

        }

    };

    // ================= STOP RECORDING =================

    const stopRecording = () => {

        if (!mediaRecorder.current)
            return;

        mediaRecorder.current.stop();

        setRecording(false);

        mediaRecorder.current.onstop =
            async () => {

                const audioBlob =
                    new Blob(
                        audioChunks.current,
                        {
                            type:
                                "audio/webm"
                        }
                    );

                const formData =
                    new FormData();

                formData.append(
                    "audio",
                    audioBlob,
                    "voice.webm"
                );

                try {

                    setLoading(true);

                    const res =
                        await API.post(

                            "/api/voice-interview",

                            formData,

                            {
                                headers: {
                                    "Content-Type":
                                        "multipart/form-data"
                                }
                            }

                        );

                    console.log(
                        res.data
                    );

                    setTranscript(
                        res.data.transcript
                    );

                }

                catch (err) {

                    console.log(err);

                    alert(
                        "Speech recognition failed"
                    );

                }

                finally {

                    setLoading(false);

                }

            };

    };

    // ================= EVALUATE =================

    const evaluateAnswer = async () => {

        if (!transcript) {

            alert(
                "Please record your answer first."
            );

            return;

        }

        try {

            setLoading(true);

            const cleanAnswer =
                transcript.replace(
                    /\n/g,
                    " "
                );

            const res =
                await API.post(

                    "/api/evaluate-interview",

                    {
                        question:
                            question,

                        answer:
                            cleanAnswer
                    }

                );

            console.log(
                res.data
            );

            setResult(
                res.data
            );

        }

        catch (err) {

            console.log(
                err
            );

            console.log(
                err.response
            );

            alert(
                "Evaluation failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div

            style={{

                maxWidth: "900px",

                margin: "auto",

                padding: "25px",

                fontFamily: "Arial"

            }}

        >

            <h1>

                🎤 PRO AI Voice Interview Bot

            </h1>

            <hr />

            <br />

            <button

                onClick={askQuestion}

                style={{

                    padding: "10px 15px",

                    cursor: "pointer"

                }}

            >

                Ask Question 🔊

            </button>

            <h3>

                {question}

            </h3>

            <hr />

            <button

                onClick={startRecording}

                disabled={recording}

                style={{

                    padding: "10px",

                    background: "green",

                    color: "white",

                    border: "none",

                    cursor: "pointer"

                }}

            >

                🎙 Start Recording

            </button>

            <button

                onClick={stopRecording}

                disabled={!recording}

                style={{

                    marginLeft: "10px",

                    padding: "10px",

                    background: "red",

                    color: "white",

                    border: "none",

                    cursor: "pointer"

                }}

            >

                ⛔ Stop Recording

            </button>

            <br />
            <br />

            {

                loading &&

                <h3>

                    Processing...

                </h3>

            }

            <div

                style={{

                    border: "1px solid gray",

                    padding: "15px",

                    borderRadius: "10px",

                    minHeight: "120px",

                    background: "#f8f8f8"

                }}

            >

                <h3>

                    Your Answer

                </h3>

                <p>

                    {transcript}

                </p>

            </div>

            <br />

            <button

                onClick={evaluateAnswer}

                style={{

                    padding: "12px 20px",

                    background: "#007bff",

                    color: "white",

                    border: "none",

                    cursor: "pointer"

                }}

            >

                Evaluate Answer 🤖

            </button>

            {

                result &&

                <div

                    style={{

                        marginTop: "30px",

                        border: "1px solid #ddd",

                        padding: "20px",

                        borderRadius: "10px"

                    }}

                >

                    <h2>

                        📊 Score :

                        {" "}

                        {result.score}

                        /10

                    </h2>

                    <h3>

                        💡 Feedback

                    </h3>

                    <ul>

                        {

                            result.feedback &&

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

export default VoiceInterview;