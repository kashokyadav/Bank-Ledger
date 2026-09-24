import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import {
    LogOut,
    ShieldCheck,
    UserRound,
    Menu,
    X,
    LayoutDashboard,
    WalletCards,
    ArrowLeftRight,
    Send,
} from "lucide-react"

import { useAuth } from "../../context/AuthContext"
import { logoutUser } from "../../services/auth.service"


function Navbar() {

    const navigate = useNavigate()

    const { user, logout } = useAuth()

    const [loading, setLoading] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)


    const navigationItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Accounts",
            path: "/accounts",
            icon: WalletCards,
        },
        {
            name: "Funds",
            path: "/funds",
            icon: WalletCards,
        },
        {
            name: "Transactions",
            path: "/transactions",
            icon: ArrowLeftRight,
        },
        {
            name: "Send Money",
            path: "/send-money",
            icon: Send,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: UserRound,
        },
    ]


    async function handleLogout() {

        setLoading(true)

        try {

            await logoutUser()

            logout()

            setMenuOpen(false)

            navigate("/login", {
                replace: true,
            })

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            )

        } finally {

            setLoading(false)

        }
    }


    function closeMenu() {
        setMenuOpen(false)
    }


    return (

        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">


            {/* ============================= */}
            {/* TOP NAVBAR */}
            {/* ============================= */}

            <div className="flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">


                {/* ============================= */}
                {/* BRAND */}
                {/* ============================= */}

                <NavLink
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-3"
                >

                    {/* Logo */}

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200 transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-blue-200">

                        <ShieldCheck
                            size={22}
                            strokeWidth={2.2}
                        />

                    </div>


                    {/* Brand Text */}

                    <div>

                        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                            BANK-LEDGER
                        </h1>

                        <p className="hidden text-xs font-medium text-slate-400 sm:block">
                            Secure Banking Management
                        </p>

                    </div>

                </NavLink>


                {/* ============================= */}
                {/* RIGHT SECTION */}
                {/* ============================= */}

                <div className="flex items-center gap-2 sm:gap-3">


                    {/* ============================= */}
                    {/* USER INFORMATION */}
                    {/* ============================= */}

                    <div className="hidden items-center gap-3 sm:flex">


                        {/* User Icon */}

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">

                            <UserRound
                                size={19}
                            />

                        </div>


                        {/* User Details */}

                        <div className="text-right">

                            <p className="max-w-[180px] truncate text-sm font-semibold text-slate-800">

                                {user?.name || "User"}

                            </p>

                            <p className="text-xs text-slate-400">

                                Personal Account

                            </p>

                        </div>

                    </div>


                    {/* ============================= */}
                    {/* DESKTOP LOGOUT */}
                    {/* ============================= */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loading}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
                    >

                        <LogOut
                            size={17}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />

                        <span className="hidden sm:inline">

                            {loading
                                ? "Logging out..."
                                : "Logout"
                            }

                        </span>

                    </button>


                    {/* ============================= */}
                    {/* MOBILE MENU BUTTON */}
                    {/* ============================= */}

                    <button
                        type="button"
                        onClick={() =>
                            setMenuOpen(
                                (previous) => !previous
                            )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600 active:scale-95 lg:hidden"
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={menuOpen}
                    >

                        {menuOpen ? (

                            <X
                                size={23}
                                strokeWidth={2}
                            />

                        ) : (

                            <Menu
                                size={23}
                                strokeWidth={2}
                            />

                        )}

                    </button>

                </div>

            </div>


            {/* ============================= */}
            {/* MOBILE / TABLET NAVIGATION */}
            {/* ============================= */}

            <div
                className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ease-in-out lg:hidden ${
                    menuOpen
                        ? "max-h-[700px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >

                <div className="px-4 pb-5 pt-4 sm:px-6">


                    {/* ============================= */}
                    {/* MOBILE USER CARD */}
                    {/* ============================= */}

                    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">

                        {/* User Icon */}

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">

                            <UserRound
                                size={20}
                            />

                        </div>


                        {/* User Details */}

                        <div className="min-w-0">

                            <p className="truncate text-sm font-bold text-slate-800">

                                {user?.name || "User"}

                            </p>

                            <p className="text-xs text-slate-500">

                                Personal Account

                            </p>

                        </div>

                    </div>


                    {/* ============================= */}
                    {/* MOBILE NAVIGATION */}
                    {/* ============================= */}

                    <nav className="space-y-1">


                        {navigationItems.map((item) => {

                            const Icon = item.icon

                            return (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                                            isActive
                                                ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                        }`
                                    }
                                >

                                    {({ isActive }) => (

                                        <>

                                            {/* Icon */}

                                            <Icon
                                                size={19}
                                                strokeWidth={
                                                    isActive
                                                        ? 2.3
                                                        : 2
                                                }
                                                className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                                            />


                                            {/* Name */}

                                            <span>

                                                {item.name}

                                            </span>


                                            {/* Active Indicator */}

                                            {isActive && (

                                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />

                                            )}

                                        </>

                                    )}

                                </NavLink>

                            )

                        })}

                    </nav>


                    {/* ============================= */}
                    {/* MOBILE LOGOUT */}
                    {/* ============================= */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loading}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <LogOut
                            size={18}
                        />

                        {loading
                            ? "Logging out..."
                            : "Logout"
                        }

                    </button>

                </div>

            </div>

        </header>
    )
}


export default Navbar