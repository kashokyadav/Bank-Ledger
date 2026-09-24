import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function GuestRoute() {

    const { user, isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-slate-500">
                    Checking authentication...
                </p>
            </div>
        )
    }

    if (isAuthenticated) {

        if (user?.systemUser) {
            return <Navigate to="/system/dashboard" replace />
        }

        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default GuestRoute