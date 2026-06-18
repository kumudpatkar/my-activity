import { useEffect, useState } from "react";
import API from "../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchJobs();
        fetchApplications();
        fetchSavedJobs();
    }, []);

    // ================= FETCH JOBS =================

    const fetchJobs = async () => {

        try {

            const res = await API.get("/api/jobs");

            setJobs(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= FETCH APPLICATIONS =================

    const fetchApplications = async () => {

        try {

            const res = await API.get(
                "/api/my-applications"
            );

            setApplications(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= FETCH SAVED JOBS =================

    const fetchSavedJobs = async () => {

        try {

            const res = await API.get(
                "/api/saved-jobs"
            );

            setSavedJobs(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= APPLY =================

    const applyJob = async (job) => {

        try {

            const res = await API.post(
                "/api/apply-job",
                {
                    job_title: job.title,
                    company: job.company
                }
            );

            alert(res.data.message);

            fetchApplications();

        }

        catch (err) {

            console.log(err);

            alert("Application Failed ❌");

        }

    };

    // ================= SAVE JOB =================

    const saveJob = async (job) => {

        try {

            const res = await API.post(
                "/api/save-job",
                {
                    job_title: job.title,
                    company: job.company
                }
            );

            alert(res.data.message);

            fetchSavedJobs();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= REMOVE SAVED JOB =================

    const removeSavedJob = async (job) => {

        try {

            const res = await API.delete(
                "/api/remove-saved-job",
                {
                    data: {
                        job_title: job.title,
                        company: job.company
                    }
                }
            );

            alert(res.data.message);

            fetchSavedJobs();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= CHECK APPLIED =================

    const alreadyApplied = (job) => {

        return applications.some(

            (item) =>

                item.job_title === job.title &&
                item.company === job.company

        );

    };

    // ================= CHECK SAVED =================

    const alreadySaved = (job) => {

        return savedJobs.some(

            (item) =>

                item.job_title === job.title &&
                item.company === job.company

        );

    };

    // ================= SEARCH =================

    const filteredJobs = jobs.filter(

        (job) =>

            job.title.toLowerCase().includes(
                search.toLowerCase()
            )

            ||

            job.company.toLowerCase().includes(
                search.toLowerCase()
            )

            ||

            job.skills.toLowerCase().includes(
                search.toLowerCase()
            )

    );

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
                🔥 Latest Jobs
            </h1>

            <br />

            <input

                type="text"

                placeholder="Search Jobs..."

                value={search}

                onChange={(e) =>
                    setSearch(e.target.value)
                }

                style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px"
                }}

            />

            {

                filteredJobs.length === 0

                    ?

                    <h3>No Jobs Found</h3>

                    :

                    filteredJobs.map((job, index) => (

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
                                <b>Company:</b>
                                {" "}
                                {job.company}
                            </p>

                            <p>
                                <b>Skills:</b>
                                {" "}
                                {job.skills}
                            </p>

                            <p>
                                <b>Salary:</b>
                                {" "}
                                {job.salary}
                            </p>

                            <p>
                                <b>Experience:</b>
                                {" "}
                                {job.experience}
                            </p>

                            <p>
                                {job.description}
                            </p>

                            <br />

                            {

                                alreadyApplied(job)

                                    ?

                                    <button
                                        disabled
                                        style={{
                                            padding:
                                                "10px 20px",
                                            background:
                                                "green",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px"
                                        }}
                                    >
                                        Applied ✅
                                    </button>

                                    :

                                    <button

                                        onClick={() =>
                                            applyJob(job)
                                        }

                                        style={{
                                            padding:
                                                "10px 20px",
                                            background:
                                                "#007bff",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px",
                                            cursor:
                                                "pointer"
                                        }}

                                    >
                                        Apply Now 🚀
                                    </button>

                            }

                            {

                                alreadySaved(job)

                                    ?

                                    <button

                                        onClick={() =>
                                            removeSavedJob(job)
                                        }

                                        style={{
                                            marginLeft:
                                                "10px",
                                            padding:
                                                "10px 20px",
                                            background:
                                                "red",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px",
                                            cursor:
                                                "pointer"
                                        }}

                                    >
                                        Remove ❤️
                                    </button>

                                    :

                                    <button

                                        onClick={() =>
                                            saveJob(job)
                                        }

                                        style={{
                                            marginLeft:
                                                "10px",
                                            padding:
                                                "10px 20px",
                                            background:
                                                "orange",
                                            color:
                                                "white",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px",
                                            cursor:
                                                "pointer"
                                        }}

                                    >
                                        Save 🤍
                                    </button>

                            }

                        </div>

                    ))

            }

        </div>

    );

}

export default Jobs;