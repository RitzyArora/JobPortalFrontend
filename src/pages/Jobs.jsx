import React, { useEffect, useState } from 'react'
import JobCard from '../components/JobCard'

import './Jobs.css'
import API from '../services/authService'

const Jobs = () => {

const [jobs,setJobs]=useState([])
 const [search,setSearch]=useState("")

useEffect(()=>{
  const fetchJobs=async()=>{
    try{
    const response=await API.get("/jobs")
    setJobs(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  fetchJobs()
},[])

const handleDelete=async(id)=>{
try
{
  await API.delete(`/jobs/${id}`)
  setJobs(prev=>prev.filter(job=>job._id!==id))
  alert("Job deleted successfully")
}
catch(error)
{
  console.log(error)
}
}


const filteredJobs=jobs.filter(job=>job.title.toLowerCase().includes(search.toLowerCase()))
return(
   <div className='container'>
        <h2>Jobs</h2>
         <input type="text"  className="search-box"placeholder='Search Jobs' value={search} onChange={(e)=>setSearch(e.target.value)}/>
         <p>Searching for : {search}</p>

         {/* <JobCard title="Frontend Developer"></JobCard> */}

 <div className='jobs-grid'>       
      {
           filteredJobs.map(job=>(
            <JobCard key={job._id} job={job} onDelete={handleDelete}/>
           ))
        }
        </div>

    </div>
)
}

export default Jobs