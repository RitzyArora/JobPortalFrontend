import axios from "axios"

const API=axios.create({baseURL:"https://jobportalbackend-production-aa98.up.railway.app/api"})
API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token")
    if(token)
    {
        req.headers.Authorization=`Bearer ${token}`
    }
    return req
})
API.interceptors.response.use((response)=>response,(error)=>{
    const status=error.response?.status
    if(status===401)
    {
        alert("Session Expired!! Please login again")
        localStorage.removeItem("token")
        window.location.href="/login"
    }
    if(status===403)
    {
        alert("you are not allowed to perform this action")
    }
    return Promise.reject(error)
})
export default API
