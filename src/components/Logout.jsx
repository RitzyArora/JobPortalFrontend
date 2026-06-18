
// export const Logout = () => {

//   localStorage.removeItem("token")
//   localStorage.removeItem("role")

//   window.dispatchEvent(new Event("storage"))

//   window.location.href = "/login"
// }
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};