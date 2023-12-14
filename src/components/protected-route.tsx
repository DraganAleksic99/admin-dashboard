import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { saveClaimsAction } from '../features/auth/authSlice'
import { ClaimsType } from '../models/claims-type'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  if (!token) {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  const decoded: ClaimsType = jwtDecode(token)
  const expiresAt = decoded.exp * 1000
  const dateNow = Date.now()
  const isValid = dateNow <= expiresAt

  if (!isValid) localStorage.clear()

  return isValid ? children : <Navigate to="/login" />
}

export default ProtectedRoute
