import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
const BASE_URL = "https://mernappbackendapp.onrender.com/";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    const response = await fetch(BASE_URL + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      navigate("/all");
      setError("");
    }
  };

  const getSingleUser = async () => {
    // const response = await fetch(`http://localhost:5000/${id}`);
    const response = await fetch(BASE_URL+ `/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("updated user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  useEffect(() => {
    getSingleUser();
  },[]);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the data</h2>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
