import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Tasksuper({ superid }) {
  let [token, settoken] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    else {
      settoken(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
    }
  }, []);
  let logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <h1>Welcome to super admin page</h1>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <br></br>
      <br></br>
      <Link to="/tasksuperadduser" className="btn btn-success">
        Add User
      </Link>
      <br></br>
      <br></br>
      <Link to={`/tasksupergetuser/${superid}`} className="btn btn-dark">
        Fetch users
      </Link>
      <br></br>
      <br></br>
      <Link to="/tasksuperaddbook" className="btn btn-info">
        Add Book
      </Link>
    </>
  );
}
export default Tasksuper;
