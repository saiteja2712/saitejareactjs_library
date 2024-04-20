import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Tasksupergetuser() {
  const [getuser, setuser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getfindall();
  }, []);
  async function getfindall() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/tasksuper");
        return;
      }

      const response = await fetch(
        "http://localhost:8090/auth/super/endusers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Failed:", response.statusText);
        return;
      }

      let data = await response.json();
      setuser(data);
    } catch (error) {
      console.log("Error fetching data:", error);
      alert("An error occurred. Please try again later.");
    }
  }
  async function deleteuser(id) {
    console.log(id);
    let responses = await fetch(
      `http://localhost:8090/auth/super/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(),
      }
    );
    getfindall();
  }

  return (
    <>
      <br />
      <div className="table" align="center" bgcolor="orange">
        <table className="table table-bordered table">
          <thead>
            <tr>
              <td>Id</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Email</td>
              <td>Password</td>

              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(getuser) &&
              getuser.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.firstname}</td>
                  <td>{f.lastname}</td>
                  <td>{f.email}</td>
                  <td>{f.password}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => deleteuser(f.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <br />
        <Link to="/tasksuper" className="btn btn-primary">
          Back
        </Link>
      </div>
    </>
  );
}

export default Tasksupergetuser;
