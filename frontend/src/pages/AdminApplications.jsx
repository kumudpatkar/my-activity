import { useEffect, useState } from "react";
import API from "../services/api";

function AdminApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const res = await API.get(
                "/api/all-applications"
            );

            setApplications(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>All Job Applications</h1>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        applications.map(
                            (item, index) => (

                                <tr key={index}>

                                    <td>{item.email}</td>
                                    <td>{item.job_title}</td>
                                    <td>{item.company}</td>
                                    <td>{item.status}</td>
                                    <td>{item.applied_at}</td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );
}

export default AdminApplications;