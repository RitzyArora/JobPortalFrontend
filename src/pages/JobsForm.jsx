import React, { useEffect } from 'react'
import './LoginRegister.css'
import { useState } from 'react'
import API from '../services/authService'
import { useNavigate, useParams } from 'react-router-dom'
const JobsForm = () => {
    const[formData,setFormData]=useState({title:"",company:"",location:""})
    const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
    const {id}=useParams()
    const navigate=useNavigate()
    const submitHandler=async(e)=>{
        e.preventDefault()
        try
        {
            if(id)
            {
                await API.put(`/api/jobs/${id}`,formData)
                alert("Job updated successfully!!")
            }
            else{
            await API.post("/api/jobs",formData)
            alert("Job posted successfully!!")
        }
        navigate("/jobs")
    }
        catch(error)
        {
            console.log(error)
        }
    
    }
    

    useEffect(()=>{
        if(id)
        {
            fetchJob()
        }

    },[id])

    const fetchJob=async()=>{
        try
        {
            const response= await API.get(`/api/jobs/${id}`)
            setFormData(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }
  return (
   
    <div className="auth-container">
        <div className="auth-card">
      <h2>{id?"Update Job":"Create Job"}</h2>

      <form onSubmit={submitHandler}>
        {/* Name */}
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={changeHandler}
        />
        

        <br />

        <input
          type="text"
          name="company"
          placeholder="Enter company"
          value={formData.company}
           onChange={changeHandler}
        />
      
        <br />

        <input
          type="text"
          name="location"
          placeholder="Enter location"
          value={formData.location}
           onChange={changeHandler}
   
        />
     
        <br />

        <button type="submit">{id?"Update":"Create"}</button>
      </form>
    </div>
    </div>
  )
}

export default JobsForm