import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log("SUCCESS:", response.data);
      alert(response.data?.message || "Success");

    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div style={{
      width: "400px",
      margin: "100px auto",
      textAlign: "center"
    }}>

      <h1>Register 🚀</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;