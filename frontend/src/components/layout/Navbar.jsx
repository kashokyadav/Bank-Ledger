import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { logoutUser } from "../../services/auth.service"

function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setLoading(true)

        try {
            await logoutUser()

            logout()

            navigate("/login", { replace: true })
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">

            {/* Brand */}
            <div>
                <h1 className="text-xl font-bold text-blue-700">
                    BANK-LEDGER
                </h1>

                <p className="text-sm text-slate-500">
                    Banking Management System
                </p>
            </div>

            {/* User + Logout */}
            <div className="flex items-center gap-4">

                <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                        {user?.name || "User"}
                    </p>

                    <p className="text-xs text-slate-500">
                        User Panel
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Logging out..." : "Logout"}
                </button>

            </div>

        </nav>
    )
}

export default Navbar