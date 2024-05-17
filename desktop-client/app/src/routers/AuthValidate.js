import { Navigate } from "react-router-dom"

export const AuthValidate = ({ children }) => {

  if (!localStorage.getItem('userSession')) {
    return <Navigate to='/login' replace />
  }

  return children
}