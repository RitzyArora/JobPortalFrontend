import { useNavigate } from "react-router-dom"
export const Logout = () => {
const navigate=useNavigate()
  localStorage.removeItem("token")
  localStorage.removeItem("role")

  window.dispatchEvent(new Event("storage"))
navigate("/login")
 
}