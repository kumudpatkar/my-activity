import { useEffect, useState } from "react";
import API from "../services/api";

function Recommendations() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const res =
                await API.get("/api/recommend");

            setJobs(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>Loading AI Recommendations...</h2>
            </div>
        );
    }

    return (

        <div
            style={{
                padding: "20px",
                background: "#f5f5f5",
                minHeight: "100vh"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                AI Recommended Jobs
            </h1>

            {

                jobs.length === 0

                ?

                (

                    <h2>
                        No Recommendations Found
                    </h2>

                )

                :

                (

                    jobs.map((job, index) => (

                        <div
                            key={index}
                            style={{
                                background: "white",
                                padding: "20px",
                                marginBottom: "20px",
                                borderRadius: "10px",
                                boxShadow:
                                    "0px 2px 10px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h2>
                                {job.title}
                            </h2>

                            <p>
                                <b>Company :</b>
                                {" "}
                                {job.company}
                            </p>

                            <p>
                                <b>Skills :</b>
                                {" "}
                                {job.skills}
                            </p>

                            <p>
                                <b>Salary :</b>
                                {" "}
                                {job.salary}
                            </p>

                            <p>
                                <b>Match Score :</b>
                                {" "}
                                {job.score}%
                            </p>

                        </div>

                    ))

                )

            }

        </div>

    );
}

export default Recommendations;