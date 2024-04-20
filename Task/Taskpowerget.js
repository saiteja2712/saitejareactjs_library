import React, { useEffect, useState } from "react";
import "./Task.css";
import { Link, useNavigate } from "react-router-dom";

function Taskpowerget() {
  let [finddetail, setfinddetail] = useState();
  let [token, settoken] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    let fetchData = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/taskpower");
      } else {
        console.log(localStorage.getItem("token"));
        let response = await fetch(
          "http://localhost:8090/auth/power/enduser/getall",
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(),
          }
        );
        if (!response.ok) {
          console.log("failed:", response.statusText);
          return;
        }
        let data = await response.json();

        setfinddetail(data);
      }
    };
    fetchData().catch((error) => {
      console.log("Error fetching data:", error);
      alert("An error occured please try again later");
    });
    return () => {};
  }, [token]);

  return (
    <>
      <br></br>
      <div className="table" align="center" bgcolor="orange">
        <table className="table table-bordered table">
          <thead>
            <tr>
              <td>Id</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Email</td>
              <td>Password</td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(finddetail) &&
              finddetail.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.firstname}</td>
                  <td>{f.lastname}</td>
                  <td>{f.email}</td>
                  <td>{f.password}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <Link to="/taskpower" className="btn btn-primary">
          Back
        </Link>
      </div>
    </>
  );
}
export default Taskpowerget;
