
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
// import { Logout } from './Logout'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()

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

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }

  }, [])

  const handleLogout = () => {
  
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.dispatchEvent(new Event("storage"));

    setToken(null);
    setRole(null);

    navigate("/login");
  };

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

            {/* <button
              onClick={() => {
                Logout()
                setToken(null)
                setRole(null)
              }}
            >
              Logout
            </button> */}
             <button onClick={handleLogout}>
      Logout
    </button>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar