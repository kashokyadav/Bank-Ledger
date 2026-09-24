import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function SystemProtectedRoute() {

    const { user, isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (!user?.systemUser) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default SystemProtectedRoute