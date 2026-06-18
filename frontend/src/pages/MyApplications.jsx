import { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {

            const res = await API.get(
                "/api/my-applications"
            );

            setApplications(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>My Applications</h1>

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >

                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        applications.map((item, index) => (

                            <tr key={index}>
                                <td>{item.job_title}</td>
                                <td>{item.company}</td>
                                <td>{item.status}</td>
                                <td>{item.applied_at}</td>
                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );
}

export default MyApplications;