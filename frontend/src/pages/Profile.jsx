import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  // ================= FORM STATE =================
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    skills: "",
    college: "",
    experience: "",
    linkedin: "",
    github: "",
    resume: "",
    profile_photo: ""
  });

  // ================= RESUME FILE STATE =================
  const [resumeFile, setResumeFile] = useState(null);

  // ================= FETCH PROFILE =================
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const email = prompt("Enter your registered email");

        if (!email) return;

        const response = await axios.get(
          `http://127.0.0.1:8000/api/get-profile/${email}`
        );

        // If profile exists
        if (!response.data.message) {

          setFormData(response.data);

        } else {

          // If no profile found
          setFormData((prev) => ({
            ...prev,
            email: email
          }));
        }

      } catch (error) {

        console.log("FETCH PROFILE ERROR:", error);

      }
    };

    fetchProfile();

  }, []);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= HANDLE FILE CHANGE =================
  const handleFileChange = (e) => {

    setResumeFile(e.target.files[0]);
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let uploadedResumePath = formData.resume;

      // ================= UPLOAD RESUME =================
      if (resumeFile) {

        const fileData = new FormData();

        fileData.append("file", resumeFile);

        const uploadResponse = await axios.post(
          "http://127.0.0.1:8000/api/upload-resume",
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        uploadedResumePath = uploadResponse.data.path;
      }

      // ================= SAVE PROFILE =================
      const response = await axios.post(
        "http://127.0.0.1:8000/api/save-profile",
        {
          ...formData,
          resume: uploadedResumePath
        }
      );

      alert(response.data.message);

    } catch (error) {

      console.log("PROFILE SAVE ERROR:", error);

      alert("Profile Save Failed ❌");
    }
  };

  return (

    <div
      style={{
        width: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >

      <h1>Profile 👤</h1>

      <form onSubmit={handleSubmit}>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* SKILLS */}
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* COLLEGE */}
        <input
          type="text"
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* EXPERIENCE */}
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* LINKEDIN */}
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* GITHUB */}
        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* PROFILE PHOTO */}
        <input
          type="text"
          name="profile_photo"
          placeholder="Profile Photo URL"
          value={formData.profile_photo}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        {/* RESUME FILE */}
        <label>
          Upload Resume PDF/DOCX:
        </label>

        <br /><br />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <br /><br />

        {/* SHOW CURRENT RESUME */}
        {
          formData.resume && (
            <div>

              <p>
                Current Resume:
              </p>

              <a
                href={`http://127.0.0.1:8000/${formData.resume}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>

            </div>
          )
        }

        <br />

        {/* SAVE BUTTON */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Save / Update Profile
        </button>

      </form>

    </div>
  );
}

export default Profile;