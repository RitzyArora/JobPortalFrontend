
export const Logout = () => {

  localStorage.removeItem("token")
  localStorage.removeItem("role")

  window.dispatchEvent(new Event("storage"))

  window.location.href = "/api/auth/login"
}