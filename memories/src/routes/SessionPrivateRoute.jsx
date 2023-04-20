import React from 'react'
import { Navigate } from 'react-router-dom'

function UserPrivateRoute({ children }) {
    return sessionStorage.getItem("auth-token") ? children : <Navigate to="/signup" />
}

export default UserPrivateRoute