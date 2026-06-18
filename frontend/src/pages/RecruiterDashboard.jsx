import { useEffect, useState } from "react";
import API from "../services/api";

function RecruiterDashboard() {

    const [data, setData] = useState({
        total_jobs: 0,
        total_applications: 0,
        candidates: []
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await API.get(
                "/api/recruiter-dashboard"
            );

            setData(res.data);

        }

        catch (err) {
            console.log(err);
        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Recruiter Dashboard</h1>

            <hr />

            <h2>
                Total Jobs :
                {data.total_jobs}
            </h2>

            <h2>
                Total Applications :
                {data.total_applications}
            </h2>

            <br />

            <h2>Candidate List</h2>

            {

                data.candidates.map(
                    (candidate, index) => (

                        <div
                            key={index}
                            style={{
                                border: "1px solid gray",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "10px"
                            }}
                        >

                            {
                                candidate.profile_photo &&

                                <img
                                    src={
                                        "http://127.0.0.1:8000/" +
                                        candidate.profile_photo
                                    }
                                    alt=""
                                    width="100"
                                />
                            }

                            <h3>
                                {candidate.name}
                            </h3>

                            <p>
                                Email :
                                {candidate.email}
                            </p>

                            <p>
                                Job :
                                {candidate.job_title}
                            </p>

                            <p>
                                Company :
                                {candidate.company}
                            </p>

                            <p>
                                Status :
                                {candidate.status}
                            </p>

                            {
                                candidate.resume &&

                                <a
                                    href={
                                        "http://127.0.0.1:8000/" +
                                        candidate.resume
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View Resume
                                </a>

                            }

                        </div>

                    )
                )

            }

        </div>

    );
}

export default RecruiterDashboard;