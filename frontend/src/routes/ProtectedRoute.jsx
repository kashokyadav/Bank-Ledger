import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute() {

    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <p className="text-slate-500">
                    Checking authentication...
                </p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
// ProtectedRoute protects the frontend UI:
// ackend middleware protects actual data/API: