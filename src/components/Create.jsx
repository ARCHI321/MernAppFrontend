import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://mernappbackendapp.onrender.com/";

const Create = () => {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [age , setAge] = useState(0);
    const [error , setError] = useState("");

    const navigate = useNavigate();
    
    console.log(name,email,age);

    const handleSubmit = async (e) =>{ 
        e.preventDefault();

        const addUser = {name,email,age};
        // const response = await fetch("http://localhost:5000/" , {
        const response = await fetch(BASE_URL , {
            method: "POST",
            body:JSON.stringify(addUser),
            headers:{
                "Content-type": "application/json",
            }
        });
        console.log(response);
        const result = await response.json();
        console.log(result);

        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok){
            console.log(result);
            setError("");
            setEmail("");
            setName("");
            setAge(0);
            navigate("/all");

        }
    }
  return (
    <div className="container my-2">

        {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label  className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Age
          </label>
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

export default Create;
