import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Taskpower() {
  let [token, settoken] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
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
      <h1>Welcome to power page</h1>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <br></br>
      <br></br>
      <Link to="/taskpowerget" className="btn btn-secondary">
        Fetchusers
      </Link>
      <br></br>
      <br></br>
      <Link to="/taskpoweradduser" className="btn btn-success">
        AddEndUser
      </Link>
      <br></br>
      <br></br>
      <Link to="/taskpoweraddsuper" className="btn btn-dark">
        AddSuperAdmin
      </Link>
    </>
  );
}
export default Taskpower;
