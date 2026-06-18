import React from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import { Login } from '../pages/Login'
import Register from '../pages/Register'
import Jobs from '../pages/Jobs'
import JobsForm from '../pages/JobsForm'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/jobs" element={<ProtectedRoute allowedRoles={["student","recruiter"]}><Jobs/></ProtectedRoute>}/>
        <Route path="/jobscreate" element={<ProtectedRoute allowedRoles={["recruiter"]}><JobsForm/></ProtectedRoute>}/>
         <Route path="/jobsedit/:id" element={<ProtectedRoute allowedRoles={["recruiter"]}><JobsForm/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes