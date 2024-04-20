import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasklogin() {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  let [captcha, setcaptcha] = useState();
  let [captchInput, setCaptchaInput] = useState();
  let [token, settoken] = useState();
  let [errors, seterrors] = useState({
    error_first: "",
    error_last: "",
    error_captch: "",
  });
  let navigate = useNavigate();
  async function submit(e) {
    console.log(form.email, form.password, captchInput);
    e.preventDefault();
    if (
      form.email &&
      form.password &&
      captchInput.toLowerCase() === captcha.toLowerCase()
    ) {
      if (
        form.email &&
        form.password &&
        captchInput.toLowerCase() === captcha.toLowerCase()
      ) {
        let response = await fetch("http://localhost:8090/auth/power/signin", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          if (data.token) {
            const token = data.token;
            settoken(token);
            localStorage.setItem("token", token);
            console.log("Token:", token);
            console.log("login successful");
            navigate("/taskpower");
          }
        }
        if (
          form.email &&
          form.password &&
          captchInput.toLowerCase() === captcha.toLowerCase()
        ) {
          let response = await fetch(
            "http://localhost:8090/auth/user/enduser/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "Application/json",
              },
              body: JSON.stringify(form),
            }
          );
          if (response.ok) {
            let vars = await response.json();
            console.log(vars);
            if (vars.token) {
              const token = vars.token;
              settoken(token);
              localStorage.setItem("token", token);
              console.log("Token:", token);
              console.log("login successful");
              navigate("/taskuser");
            }
          }
        }
        if (
          form.email &&
          form.password &&
          captchInput.toLowerCase() === captcha.toLowerCase()
        ) {
          let response = await fetch(
            "http://localhost:8090/auth/super/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "Application/json",
              },
              body: JSON.stringify(form),
            }
          );
          if (response.ok) {
            let dta = await response.json();
            console.log(dta);
            if (dta.token) {
              const token = dta.token;
              settoken(token);
              localStorage.setItem("token", token);
              console.log("Token", token);
              console.log("login successful");
              navigate("/tasksuper");
            }
          }
        }
      }
    } else if (!form.email && !form.password && !captchInput) {
      seterrors({
        ...errors,
        error_first: "Username is Mandatory",
        error_last: "Password is Mandatory",
        error_captch: "Captcha is Mandatory",
      });
    } else if (!captchInput) {
      seterrors({
        ...errors,
        error_captch: "Captcha is Mandatory",
      });
    } else if (captchInput.toLowerCase() !== captcha.toLowerCase()) {
      seterrors({
        ...errors,
        error_captch: "Invalid captcha",
      });
    } else {
      window.alert("user details not found");
    }
  }
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/taskpower");
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/taskuser");
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
    });
  };
  let handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };
  let generateCaptcha = () => {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setcaptcha(captcha);
  };
  useState(() => {
    generateCaptcha();
  }, []);
  return (
    <>
      <div className="containerlogin">
        <div className="row align-items-start">
          <div className="col-4">
            <form onSubmit={submit}>
              <div className="cols">
                <div className="rowone">
                  <h2>Power Admin Login</h2>
                  <div>
                    <input
                      type="email"
                      className="inputbox"
                      name="username"
                      id="gmail"
                      value={form.email}
                      placeholder="Enter Your Username"
                      onChange={(e) => {
                        Change("email", e.target.value);
                      }}
                    />

                    {errors.error_first && (
                      <div style={{ color: "red", paddingRight: "100px" }}>
                        {errors.error_first}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      className="inputbox"
                      type="password"
                      id="word"
                      value={form.password}
                      placeholder="Enter Your Password"
                      onChange={(e) => {
                        Change("password", e.target.value);
                      }}
                    ></input>
                    {errors.error_last && (
                      <div style={{ color: "red", paddingRight: "100px" }}>
                        {errors.error_last}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      id="captcha"
                      className="inputbox"
                      value={form.captchaInput}
                      placeholder="Enter The Below Captcha"
                      onChange={handleCaptchaChange}
                    />
                    {errors.error_captch && (
                      <div style={{ color: "red", paddingRight: "100px" }}>
                        {errors.error_captch}
                      </div>
                    )}
                  </div>
                  <div className="vpt">
                    <img
                      src={`https://via.placeholder.com/120x40.png?text=${captcha}`}
                      alt="Captcha"
                      onClick={generateCaptcha}
                      style={{ cursor: "pointer" }}
                    />
                    <button
                      className="btn"
                      onClick={() => setcaptcha(generateCaptcha)}
                    >
                      🔃
                    </button>
                    {/*                     
                    <input type="text" className="captcha" value={captcha} />
                    <button
                      className="btn"
                      onClick={() => setcaptcha(generateCaptcha)}
                    >
                      🔃
                  </button>*/}
                  </div>
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-primary"
                    id="btn"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tasklogin;
