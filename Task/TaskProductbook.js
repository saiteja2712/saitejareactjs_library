import React from "react";
import "./Task.css";
function Productbook({ id, titleofbook, author, publishyear, imageofbook }) {
  return (
    <>
      <div className="card">
        <img src={imageofbook} width="100px" height="fit-content"></img>
        <b>{titleofbook}</b>

        <br></br>
        <div className="author">
          <h5 margin-top="30px">{author}</h5>
          <h6>{publishyear}</h6>
        </div>
      </div>
    </>
  );
}
export default Productbook;
