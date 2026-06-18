import React, { useState } from 'react'
import './LoginRegister.css'
import API from '../services/authService'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState({})
  const navigate = useNavigate()

  const changeHandler = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validations = () => {
    const errorMessage = {}

    if (!formData.email.trim()) {
      errorMessage.email = "Email is required"
    }

    if (!formData.password.trim()) {
      errorMessage.password = "Password is required"
    }

    return errorMessage
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const validationErrors = validations()

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors)
      return
    }

    try {
      const response = await API.post("/api/auth/login", {
        email: formData.email,
        password: formData.password
      })

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("role", response.data.user.role)

      // Force Navbar Update
      window.dispatchEvent(new Event("storage"))

      alert("Login Successful")

      navigate("/jobs")
    }
    catch (error) {
      console.log(error)
      alert("Invalid Credentials")
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            value={formData.email}
            onChange={changeHandler}
          />

          {error.email && (
            <p style={{ color: "red" }}>{error.email}</p>
          )}

          <br />

          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            value={formData.password}
            onChange={changeHandler}
          />

          {error.password && (
            <p style={{ color: "red" }}>{error.password}</p>
          )}

          <br />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}