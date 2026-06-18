import { useState } from "react";
import API from "../services/api";

function AIMatching() {

    const [file, setFile] = useState(null);
    const [jobs, setJobs] = useState([]);

    const uploadResume = async () => {

        if (!file) {
            alert("Select Resume PDF");
            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            const res = await API.post(
                "/api/match-jobs",
                formData,
                {
                    headers: {
                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );

            setJobs(
                res.data.top_matches
            );

        } catch (err) {

            console.log(err);
            alert("Matching Failed");

        }
    };

    return (

        <div style={{padding:"20px"}}>

            <h1>
                AI Resume Matching
            </h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e)=>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <br /><br />

            <button
                onClick={uploadResume}
            >
                Match Resume
            </button>

            <br /><br />

            {
                jobs.map(
                    (job,index)=>

                    <div
                    key={index}
                    style={{
                        border:"1px solid gray",
                        marginBottom:"15px",
                        padding:"15px"
                    }}
                    >

                    <h3>
                        {job.title}
                    </h3>

                    <p>
                        Company :
                        {job.company}
                    </p>

                    <p>
                        Match Score :
                        {job.match_score}%
                    </p>

                    <p>
                        Skills :
                        {job.skills_required}
                    </p>

                    <p>
                        {job.reason}
                    </p>

                    </div>
                )
            }

        </div>
    );
}

export default AIMatching;