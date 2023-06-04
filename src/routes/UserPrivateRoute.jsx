import React from 'react'
import { Navigate } from 'react-router-dom'

function UserPrivateRoute({ children }) {
    return localStorage.getItem("auth-token") ? children : <Navigate to="/login" />
}

export default UserPrivateRoute