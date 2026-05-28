import { useState } from "react";
import axios from "axios";

function Login() {

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
        "http://127.0.0.1:8000/login",
        formData
      );

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem("token", response.data.access_token);

      alert("Login Success ✅");

      window.location.href = "/jobs";

    } catch (error) {

      console.log(error.response?.data);

      alert("Login Failed ❌");
    }
  };

  return (

    <div style={{
      width: "400px",
      margin: "100px auto",
      textAlign: "center"
    }}>

      <h1>Login 🔐</h1>

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
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;