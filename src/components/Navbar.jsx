
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import { logout } from './logout'

const Navbar = () => {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  )

  const [role, setRole] = useState(
    localStorage.getItem("role")
  )

  useEffect(() => {

    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"))
      setRole(localStorage.getItem("role"))
    }
    const nav=useNavigate()

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }

  }, [])

  return (
    <nav className='navbar'>
      <h2>Job Portal</h2>

      <div className='nav-links'>

        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/jobs">Jobs</Link>

            {role === "recruiter" && (
              <Link to="/jobscreate">
                Jobs Posting Form
              </Link>
            )}

            <button
              onClick={() => {
                logout()
                setToken(null)
                setRole(null)
                nav("/login")
              }}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar