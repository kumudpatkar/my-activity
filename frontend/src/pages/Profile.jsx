import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: localStorage.getItem("userEmail") || "",
        skills: "",
        college: "",
        experience: "",
        linkedin: "",
        github: "",
        resume: "",
        profile_photo: ""
    });

    const [loading, setLoading] = useState(false);

    const [resumeFile, setResumeFile] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

    // ================= FETCH PROFILE =================

    const fetchProfile = async () => {

        try {

            setLoading(true);

            const res = await API.get("/api/profile");

            setProfile({
                name: res.data.name || "",
                email: res.data.email || "",
                skills: res.data.skills || "",
                college: res.data.college || "",
                experience: res.data.experience || "",
                linkedin: res.data.linkedin || "",
                github: res.data.github || "",
                resume: res.data.resume || "",
                profile_photo: res.data.profile_photo || ""
            });

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ================= HANDLE INPUT =================

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    // ================= SAVE PROFILE =================

    const saveProfile = async () => {

        try {

            const res = await API.post(
                "/api/save-profile",
                profile
            );

            alert(res.data.message);

        } catch (err) {

            console.log(err);

            alert("Save Failed");

        }

    };

    // ================= UPLOAD RESUME =================

    const uploadResume = async () => {

        if (!resumeFile) {
            alert("Select Resume PDF");
            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "file",
                resumeFile
            );

            const res = await API.post(
                "/api/upload-resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setProfile({
                ...profile,
                resume: res.data.resume
            });

            alert("Resume Uploaded");

        } catch (err) {

            console.log(err);

            alert("Resume Upload Failed");

        }

    };

    // ================= UPLOAD PHOTO =================

    const uploadPhoto = async () => {

        if (!photoFile) {
            alert("Select Profile Photo");
            return;
        }

        try {

            const formData = new FormData();

            formData.append(
                "file",
                photoFile
            );

            const res = await API.post(
                "/api/upload-photo",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setProfile({
                ...profile,
                profile_photo: res.data.profile_photo
            });

            alert("Photo Uploaded");

        } catch (err) {

            console.log(err);

            alert("Photo Upload Failed");

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>My Profile</h1>

            {loading && <p>Loading...</p>}

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={profile.name}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={profile.skills}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="college"
                placeholder="College"
                value={profile.college}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={profile.experience}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn"
                value={profile.linkedin}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="github"
                placeholder="GitHub"
                value={profile.github}
                onChange={handleChange}
            />

            <br /><br />

            <hr />

            <h3>Upload Resume PDF</h3>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setResumeFile(e.target.files[0])
                }
            />

            <br /><br />

            <button onClick={uploadResume}>
                Upload Resume
            </button>

            <br /><br />

            {
                profile.resume &&
                <a
                    href={`http://127.0.0.1:8000/${profile.resume}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <button>
                        View Resume
                    </button>
                </a>
            }

            <hr />

            <h3>Upload Profile Photo</h3>

            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setPhotoFile(e.target.files[0])
                }
            />

            <br /><br />

            <button onClick={uploadPhoto}>
                Upload Photo
            </button>

            <br /><br />

            {
                profile.profile_photo &&
                <img
                    src={`http://127.0.0.1:8000/${profile.profile_photo}`}
                    alt="Profile"
                    width="150"
                />
            }

            <br /><br />

            <button onClick={saveProfile}>
                Save Profile
            </button>

        </div>
    );
}

export default Profile;