import React, { useState } from "react";
import "./Bookform.css";

function Tasksuperaddbook() {
  let [token, settoken] = useState();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      console.log(e.target.name);
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data:", formData);
    if (
      formData.title &&
      formData.author &&
      formData.publishedYear &&
      formData.image
    ) {
      let response = await fetch("http://localhost:8090/auth/super/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")},`,
        },
        body: formData,
      });
      if (response.ok) {
        let data = await response.json();
        if (data.token) {
          let token = data.token;
          settoken(token);
          localStorage.setItem("tokens", token);
          console.log(token);
          console.log("Successsfully addded");
          window.alert("Successfully added");
        } else {
          window.alert("invalid token");
        }
      }
    }

    setFormData({
      title: "",
      author: "",
      publishedYear: "",
      image: null,
    });
  }

  return (
    <div className="container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishedYear">Published Year:</label>
          <input
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Tasksuperaddbook;
