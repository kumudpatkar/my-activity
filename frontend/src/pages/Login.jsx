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
        "http://127.0.0.1:8000/auth/login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful 🚀");

      // REDIRECT
      window.location.href = "/dashboard";

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      alert("Login Failed ❌");

    }
  };

  return (

    <div
      style={{
        width: "400px",
        margin: "100px auto",
        textAlign: "center"
      }}
    >

      <h1>Login 🔐</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
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