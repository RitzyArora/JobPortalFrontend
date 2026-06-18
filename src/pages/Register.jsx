
import React, { useState } from "react";
import './LoginRegister.css'
import API from "../services/authService"

 const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errorMessages = {};

    // Name Validation
    if (!formData.name.trim()) {
      errorMessages.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      errorMessages.name = "Name must be at least 3 characters";
    }

    // Email Validation
    if (!formData.email.trim()) {
      errorMessages.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errorMessages.email = "Enter a valid email address";
    }

    // Password Validation
    if (!formData.password.trim()) {
      errorMessages.password = "Password is required";
    } else if (formData.password.length < 6) {
      errorMessages.password =
        "Password must be at least 6 characters";
    }

    

    return errorMessages;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } 
    try{
      setErrors({})
      const response=await API.post("/auth/register",{
        name:formData.name,
        email:formData.email,
        password:formData.password,
        role:formData.role
      })
      alert("Registeration is Successful !!!")
    

      // Reset Form
      setFormData({
        name: "",
        email: "",
        password: "",
        role:"student"
      });
    }
    catch(error)
    {
      console.log(error.message)
      alert("Registeration failed")
    }
  }
    
  

  return (
    <div className="auth-container">
        <div className="auth-card">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={changeHandler}
        />
        {errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}

        <br />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={changeHandler}
        />
        {errors.email && (
          <p style={{ color: "red" }}>{errors.email}</p>
        )}

        <br />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={changeHandler}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

       <select name="role" value={formData.role} onChange={changeHandler}>
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
       </select>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );

 }
export default Register;