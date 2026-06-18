import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const profileRes =
                await API.get("/api/profile");

            setProfile(profileRes.data);

            const appRes =
                await API.get("/api/my-applications");

            setApplications(appRes.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/");

    };

    return (

        <div
            style={{
                padding: "30px",
                background: "#f5f5f5",
                minHeight: "100vh"
            }}
        >

            <h1>
                🚀 Smart Job Portal AI
            </h1>

            <hr />

            <h2>
                Welcome,
                {" "}
                {profile.name || "User"}
            </h2>

            <br />

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "30px"
                }}
            >

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        width: "220px",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}
                >
                    <h3>📄 Resume</h3>

                    <h2>
                        {
                            profile.resume
                                ? "✅ Uploaded"
                                : "❌ Missing"
                        }
                    </h2>

                </div>

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        width: "220px",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}
                >
                    <h3>🖼 Profile Photo</h3>

                    <h2>
                        {
                            profile.profile_photo
                                ? "✅ Uploaded"
                                : "❌ Missing"
                        }
                    </h2>

                </div>

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        width: "220px",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}
                >
                    <h3>💼 Applications</h3>

                    <h2>
                        {applications.length}
                    </h2>

                </div>

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        width: "220px",
                        borderRadius: "10px",
                        textAlign: "center"
                    }}
                >
                    <h3>🤖 AI Features</h3>

                    <h2>
                        Active
                    </h2>

                </div>

            </div>

            <h2>
                Job Portal
            </h2>

            <button onClick={() => navigate("/profile")}>
                My Profile
            </button>

            <button
                onClick={() => navigate("/jobs")}
                style={{ marginLeft: "10px" }}
            >
                Latest Jobs
            </button>

            <button
                onClick={() => navigate("/saved-jobs")}
                style={{ marginLeft: "10px" }}
            >
                Saved Jobs
            </button>

            <button
                onClick={() => navigate("/my-applications")}
                style={{ marginLeft: "10px" }}
            >
                My Applications
            </button>

            <br />
            <br />

            <h2>
                AI Tools
            </h2>

            <button
                onClick={() => navigate("/resume")}
            >
                AI Resume
            </button>

            <button
                onClick={() => navigate("/match")}
                style={{ marginLeft: "10px" }}
            >
                Match Jobs
            </button>

            <button
                onClick={() => navigate("/recommendations")}
                style={{ marginLeft: "10px" }}
            >
                AI Recommendations
            </button>

            <button
                onClick={() => navigate("/ats-checker")}
                style={{ marginLeft: "10px" }}
            >
                ATS Checker
            </button>

            <br />
            <br />

            <button
                onClick={() => navigate("/interview")}
            >
                AI Interview
            </button>

            <button
                onClick={() => navigate("/interview-evaluation")}
                style={{ marginLeft: "10px" }}
            >
                AI Evaluation
            </button>

            <button
                onClick={() => navigate("/career-roadmap")}
                style={{ marginLeft: "10px" }}
            >
                Career Roadmap
            </button>

            <button
                onClick={() => navigate("/cover-letter")}
                style={{ marginLeft: "10px" }}
            >
                Cover Letter
            </button>

            <button
                onClick={() => navigate("/skill-gap")}
                style={{ marginLeft: "10px" }}
            >
                Skill Gap
            </button>

            <button
                onClick={() => navigate("/salary-predictor")}
                style={{ marginLeft: "10px" }}
            >
                Salary Predictor
            </button>

            <button
    onClick={() => navigate("/voice-interview")}
    style={{ marginLeft: "10px" }}
>
    Voice Interview 🎤
</button>

            <br />
            <br />

            <h2>
                Admin
            </h2>

            <button
                onClick={() =>
                    navigate("/admin-applications")
                }
            >
                Admin Panel
            </button>

            <button
                onClick={() =>
                    navigate("/recruiter-dashboard")
                }
                style={{ marginLeft: "10px" }}
            >
                Recruiter Dashboard
            </button>

            <button
    onClick={() =>
        navigate("/resume-analyzer")
    }
    style={{
        marginLeft: "10px"
    }}
>
    Resume Analyzer
</button>

            <br />
            <br />

            <button
                onClick={logout}
                style={{
                    background: "red",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px"
                }}
            >
                Logout
            </button>

        </div>

    );

}

export default Dashboard;