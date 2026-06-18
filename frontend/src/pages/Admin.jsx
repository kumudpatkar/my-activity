import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

    const [job, setJob] = useState({
        title: "",
        company: "",
        skills: "",
        salary: "",
        experience: "",
        description: ""
    });

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    // INPUT CHANGE
    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    // FETCH JOBS
    const fetchJobs = async () => {

        try {

            const res = await API.get(
                "/api/jobs"
            );

            setJobs(res.data);

        }

        catch (err) {

            console.log(err);

        }
    };

    // ADD JOB
    const addJob = async () => {

        try {

            const res = await API.post(
                "/api/add-job",
                job
            );

            alert(res.data.message);

            setJob({
                title: "",
                company: "",
                skills: "",
                salary: "",
                experience: "",
                description: ""
            });

            fetchJobs();

        }

        catch (err) {

            console.log(err);

            alert("Failed to add job");

        }
    };

    // DELETE JOB
    const deleteJob = async (id) => {

        try {

            const res = await API.delete(
                `/api/delete-job/${id}`
            );

            alert(res.data.message);

            fetchJobs();

        }

        catch (err) {

            console.log(err);

            alert("Delete Failed");

        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Admin Dashboard</h1>

            <hr />

            <h2>Add New Job</h2>

            <input
                name="title"
                placeholder="Job Title"
                value={job.title}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="company"
                placeholder="Company"
                value={job.company}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="skills"
                placeholder="Skills"
                value={job.skills}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="salary"
                placeholder="Salary"
                value={job.salary}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="experience"
                placeholder="Experience"
                value={job.experience}
                onChange={handleChange}
            />

            <br /><br />

            <textarea
                name="description"
                placeholder="Description"
                value={job.description}
                onChange={handleChange}
                rows="5"
                cols="50"
            />

            <br /><br />

            <button onClick={addJob}>
                Add Job
            </button>

            <hr />

            <h2>All Jobs</h2>

            {
                jobs.length === 0 ?

                    <p>No Jobs Available</p>

                    :

                    jobs.map((item, index) => (

                        <div
                            key={index}
                            style={{
                                border: "1px solid gray",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "10px"
                            }}
                        >

                            <h3>{item.title}</h3>

                            <p>
                                <b>Company:</b>
                                {" "}
                                {item.company}
                            </p>

                            <p>
                                <b>Skills:</b>
                                {" "}
                                {item.skills}
                            </p>

                            <p>
                                <b>Salary:</b>
                                {" "}
                                {item.salary}
                            </p>

                            <p>
                                <b>Experience:</b>
                                {" "}
                                {item.experience}
                            </p>

                            <p>
                                {item.description}
                            </p>

                            <button
                                onClick={() =>
                                    deleteJob(item._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))
            }

        </div>

    );
}

export default Admin;