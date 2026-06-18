import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SavedJobs() {

    const [jobs, setJobs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    // ================= GET SAVED JOBS =================

    const fetchSavedJobs = async () => {

        try {

            const res = await API.get(
                "/api/saved-jobs"
            );

            setJobs(res.data);

        }

        catch (err) {

            console.log(err);

        }
    };

    // ================= REMOVE JOB =================

    const removeJob = async (job) => {

        try {

            await API.delete(
                "/api/remove-saved-job",
                {
                    data: {
                        job_title: job.job_title,
                        company: job.company
                    }
                }
            );

            alert("Job Removed Successfully");

            fetchSavedJobs();

        }

        catch (err) {

            console.log(err);

            alert("Failed");

        }
    };

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
                    textAlign: "center"
                }}
            >
                ⭐ Saved Jobs
            </h1>

            <br />

            <button
                onClick={() => navigate("/dashboard")}
                style={{
                    marginBottom: "20px"
                }}
            >
                Back to Dashboard
            </button>

            {
                jobs.length === 0

                    ?

                    (

                        <div
                            style={{
                                background: "white",
                                padding: "20px",
                                borderRadius: "10px"
                            }}
                        >

                            <h3>
                                No Saved Jobs Found
                            </h3>

                        </div>

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
                                        "0 2px 10px rgba(0,0,0,0.1)"
                                }}
                            >

                                <h2>
                                    {job.job_title}
                                </h2>

                                <h3>
                                    {job.company}
                                </h3>

                                <br />

                                <button
                                    onClick={() =>
                                        removeJob(job)
                                    }
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Remove ❌
                                </button>

                            </div>

                        ))

                    )
            }

        </div>

    );
}

export default SavedJobs;