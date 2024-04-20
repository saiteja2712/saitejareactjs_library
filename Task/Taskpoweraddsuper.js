import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Poweraddsuper() {
  let [tokens, settoken] = useState();
  let [token, setftoken] = useState();
  let [form, setform] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  let [errors, seterrors] = useState({
    error_first: "",
    error_last: "",
    error_mail: "",
    error_password: "",
  });
  async function Register(e) {
    e.preventDefault();
    console.log(
      "firstname:" + form.firstname,
      "lastname:" + form.lastname,
      "email:" + form.email,
      "password:" + form.password
    );
    if (!form.firstname && !form.lastname && !form.email && !form.password) {
      seterrors({
        ...errors,
        error_first: "Firstname is mandatory",
        error_last: "Lastname is mandatory",
        error_mail: "Mail is Mandatory",
        error_password: "Password is Mandatory",
      });
    } else if (form.firstname && form.lastname && form.email && form.password) {
      let response = await fetch(
        "http://localhost:8090/auth/power/super/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (response.ok) {
        let data = await response.json();
        if (data.token) {
          const token = data.token;
          setftoken(token);
          localStorage.setItem("tokens", token);
          console.log(token);
          console.log("registration success");
          window.alert("Successfully added");
        }
      } else {
        window.alert("invalid token");
        console.error("Registration failed");
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/taskpoweraddsuper");
      console.log(localStorage.getItem("tokens"));
    }
  }, []);
  let Change = (key, value) => {
    setform({
      ...form,
      [key]: value,
    });
    seterrors({
      ...errors,
      error_first: "",
      error_last: "",
      error_mail: "",
      error_password: "",
    });
  };
  let back = () => {
    localStorage.removeItem("tokens");
    localStorage.getItem("token");
    console.log("tokens", tokens);
    navigate("/taskpower");
  };
  return (
    <>
      <form onSubmit={Register}>
        <div className="imagestart">
          <div className="col">
            <div className="rowone">
              <div>
                <br></br>
                <h5>Add Enduser</h5>
                <div>
                  <input
                    className="inputbox"
                    type="text"
                    placeholder="Enter Your Firstname"
                    id="first"
                    value={form.firstname}
                    onChange={(e) => {
                      Change("firstname", e.target.value);
                    }}
                  ></input>
                </div>
                {errors.error_first && (
                  <div style={{ color: "red", paddingRight: "100px" }}>
                    {errors.error_first}
                  </div>
                )}
                <br></br>
                <div>
                  <input
                    className="inputbox"
                    type="text"
                    placeholder="Enter Your Lastname"
                    id="lastname"
                    value={form.lastname}
                    onChange={(e) => {
                      Change("lastname", e.target.value);
                    }}
                  ></input>
                </div>
                {errors.error_last && (
                  <div style={{ color: "red", paddingRight: "100px" }}>
                    {errors.error_last}
                  </div>
                )}
                <br></br>
                <div>
                  <input
                    className="inputbox"
                    type="email"
                    name="username"
                    id="gmail"
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={(e) => {
                      Change("email", e.target.value);
                    }}
                  ></input>
                </div>
                {errors.error_mail && (
                  <div style={{ color: "red", paddingRight: "120px" }}>
                    {errors.error_mail}
                  </div>
                )}
                <br></br>
                <div>
                  <input
                    type="password"
                    className="inputbox"
                    id="word"
                    placeholder="Enter Your Password"
                    value={form.password}
                    onChange={(e) => {
                      Change("password", e.target.value);
                    }}
                  ></input>
                </div>
                {errors.error_password && (
                  <div style={{ color: "red", paddingRight: "100px" }}>
                    {errors.error_password}
                  </div>
                )}
                <br></br>
                <div>
                  <input type="submit" className="btn btn-primary" id="btns" />
                  <button className="btn btn-danger" onClick={back}>
                    Back
                  </button>
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default Poweraddsuper;
