function Dashboard() {

  const handleLogout = () => {

    // REMOVE TOKEN
    localStorage.removeItem("token");

    // REDIRECT TO LOGIN
    window.location.href = "/login";
  };

  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >

      <h1>Dashboard 🚀</h1>

      <p>
        Login Successful
      </p>

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>

  );
}

export default Dashboard;