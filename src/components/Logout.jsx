import { useNavigate } from "react-router-dom"
export const logout = () => {

  localStorage.removeItem("token")
  localStorage.removeItem("role")

  window.dispatchEvent(new Event("storage"))

 
}