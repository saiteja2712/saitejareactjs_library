import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Productbook from "./TaskProductbook";

function Taskuser() {
  let [token, settoken] = useState();
  let [products, updateproducts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    //   const storedToken = localStorage.getItem("token");
    //   if (!storedToken) {
    //     navigate("/");
    //   } else {
    //     settoken(storedToken);
    //   }
    // }, [navigate]);
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      settoken(localStorage.getItem("token"));
      console.log(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    getproducts();
  }, []);
  async function getproducts() {
    let res = await fetch("http://localhost:8090/auth/book/bookget");
    let list = await res.json();
    updateproducts(list);
    console.log(list);
  }
  if (products.length === 0) {
    return <h2>Fetching data</h2>;
  }
  let logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <h1>Welcome to user page</h1>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <div className="product-list">
        {products.map((p) => (
          <Productbook {...p}></Productbook>
        ))}
      </div>
    </>
  );
}
export default Taskuser;
