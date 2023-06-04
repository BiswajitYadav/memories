import React from 'react'
import { Navigate } from 'react-router-dom'

function SessionPrivateRoute({ children }) {
    return sessionStorage.getItem("auth-token") || sessionStorage.getItem('email') ? children : <Navigate to="/signup" />
}

export default SessionPrivateRoute