import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, ShieldCheck, UserRound } from "lucide-react"

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
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">

            <div className="flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand */}
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                        <ShieldCheck size={22} strokeWidth={2.2} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                            BANK-LEDGER
                        </h1>

                        <p className="hidden text-xs font-medium text-slate-400 sm:block">
                            Secure Banking Management
                        </p>
                    </div>

                </div>


                {/* User Section */}
                <div className="flex items-center gap-3">

                    {/* User Information */}
                    <div className="hidden items-center gap-3 sm:flex">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <UserRound size={19} />
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-semibold text-slate-800">
                                {user?.name || "User"}
                            </p>

                            <p className="text-xs text-slate-400">
                                Personal Account
                            </p>
                        </div>

                    </div>


                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loading}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
                    >
                        <LogOut
                            size={17}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />

                        <span className="hidden sm:inline">
                            {loading ? "Logging out..." : "Logout"}
                        </span>
                    </button>

                </div>

            </div>

        </header>
    )
}

export default Navbar