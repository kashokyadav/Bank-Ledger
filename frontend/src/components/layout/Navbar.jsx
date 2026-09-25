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
    ChevronRight,
} from "lucide-react"

import { useAuth } from "../../context/AuthContext"
import { logoutUser } from "../../services/auth.service"


// ======================================================
// NAVIGATION ITEMS
// ======================================================

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


function Navbar() {

    // ==================================================
    // HOOKS
    // ==================================================

    const navigate = useNavigate()

    const { user, logout } = useAuth()

    // Controls logout loading state.
    const [loading, setLoading] = useState(false)

    // Controls mobile/tablet navigation menu.
    const [menuOpen, setMenuOpen] = useState(false)


    // ==================================================
    // LOGOUT
    // ==================================================

    async function handleLogout() {

        setLoading(true)

        try {

            // Call backend logout API.
            await logoutUser()

            // Clear authentication state.
            logout()

            // Close mobile menu.
            setMenuOpen(false)

            // Redirect user to login page.
            navigate("/login", {
                replace: true,
            })

        } catch (error) {

            // Keep the existing behavior of logging logout errors.
            console.error("Logout failed:", error)

        } finally {

            // Stop loading state.
            setLoading(false)

        }
    }


    // ==================================================
    // CLOSE MOBILE MENU
    // ==================================================

    function closeMenu() {
        setMenuOpen(false)
    }


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <header
            className="
                sticky
                top-0
                z-50
                border-b
                border-slate-200
                bg-white/95
                shadow-sm
                backdrop-blur-md
            "
        >

            {/* ================================================== */}
            {/* MAIN NAVBAR                                        */}
            {/* ================================================== */}

            <div
                className="
                    mx-auto
                    flex
                    h-[72px]
                    w-full
                    max-w-[1600px]
                    items-center
                    justify-between
                    px-3
                    sm:h-[76px]
                    sm:px-5
                    lg:px-8
                    xl:px-10
                "
            >

                {/* ================================================== */}
                {/* BRAND                                               */}
                {/* ================================================== */}

                <NavLink
                    to="/dashboard"
                    onClick={closeMenu}
                    className="
                        group
                        flex
                        min-w-0
                        items-center
                        gap-2.5
                        sm:gap-3
                    "
                >

                    {/* Brand Logo */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-600
                            text-white
                            shadow-sm
                            shadow-blue-200
                            transition
                            duration-200
                            group-hover:bg-blue-700
                            group-hover:shadow-md
                            sm:h-11
                            sm:w-11
                        "
                    >

                        <ShieldCheck
                            size={21}
                            strokeWidth={2.2}
                        />

                    </div>


                    {/* Brand Information */}

                    <div className="min-w-0">

                        <h1
                            className="
                                truncate
                                text-base
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-lg
                                lg:text-xl
                            "
                        >
                            BANK-LEDGER
                        </h1>

                        <p
                            className="
                                hidden
                                text-[11px]
                                font-medium
                                text-slate-400
                                sm:block
                            "
                        >
                            Secure Banking Management
                        </p>

                    </div>

                </NavLink>


                {/* ================================================== */}
                {/* RIGHT SIDE                                         */}
                {/* ================================================== */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        sm:gap-3
                    "
                >

                    {/* ================================================== */}
                    {/* DESKTOP USER INFORMATION                           */}
                    {/* ================================================== */}

                    <div
                        className="
                            hidden
                            items-center
                            gap-3
                            sm:flex
                        "
                    >

                        {/* User Avatar */}

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-blue-100
                                bg-blue-50
                                text-blue-600
                            "
                        >

                            <UserRound size={18} />

                        </div>


                        {/* User Details */}

                        <div className="hidden text-right md:block">

                            <p
                                className="
                                    max-w-[180px]
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                {user?.name || "User"}
                            </p>

                            <p className="text-xs text-slate-400">
                                Personal Account
                            </p>

                        </div>

                    </div>


                    {/* ================================================== */}
                    {/* DESKTOP LOGOUT                                      */}
                    {/* ================================================== */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loading}
                        aria-label="Logout"
                        className="
                            group
                            flex
                            h-10
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-3
                            text-sm
                            font-semibold
                            text-slate-600
                            transition-all
                            duration-200
                            hover:border-red-200
                            hover:bg-red-50
                            hover:text-red-600
                            active:scale-[0.97]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:h-11
                            sm:px-4
                        "
                    >

                        <LogOut
                            size={17}
                            className="
                                transition-transform
                                duration-200
                                group-hover:-translate-x-0.5
                            "
                        />

                        <span className="hidden sm:inline">
                            {loading
                                ? "Logging out..."
                                : "Logout"
                            }
                        </span>

                    </button>


                    {/* ================================================== */}
                    {/* MOBILE / TABLET MENU BUTTON                        */}
                    {/* ================================================== */}

                    <button
                        type="button"
                        onClick={() => setMenuOpen((previous) => !previous)}
                        aria-label={
                            menuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={menuOpen}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            text-slate-600
                            transition-all
                            duration-200
                            hover:border-blue-200
                            hover:bg-blue-50
                            hover:text-blue-600
                            active:scale-95
                            lg:hidden
                            sm:h-11
                            sm:w-11
                        "
                    >

                        {menuOpen ? (

                            <X
                                size={22}
                                strokeWidth={2}
                            />

                        ) : (

                            <Menu
                                size={22}
                                strokeWidth={2}
                            />

                        )}

                    </button>

                </div>

            </div>


            {/* ================================================== */}
            {/* MOBILE / TABLET MENU                               */}
            {/* ================================================== */}

            <div
                className={`
                    overflow-hidden
                    border-t
                    border-slate-100
                    bg-white
                    transition-all
                    duration-300
                    ease-in-out
                    lg:hidden
                    ${
                        menuOpen
                            ? "max-h-[750px] opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
            >

                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[1600px]
                        px-3
                        pb-5
                        pt-4
                        sm:px-5
                    "
                >

                    {/* ================================================== */}
                    {/* MOBILE USER CARD                                    */}
                    {/* ================================================== */}

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50
                            p-4
                        "
                    >

                        {/* User Avatar */}

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-blue-100
                                bg-blue-100
                                text-blue-700
                            "
                        >

                            <UserRound size={20} />

                        </div>


                        {/* User Details */}

                        <div className="min-w-0">

                            <p
                                className="
                                    truncate
                                    text-sm
                                    font-bold
                                    text-slate-800
                                "
                            >
                                {user?.name || "User"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Personal Account
                            </p>

                        </div>

                    </div>


                    {/* ================================================== */}
                    {/* MOBILE NAVIGATION TITLE                            */}
                    {/* ================================================== */}

                    <p
                        className="
                            mb-2
                            px-1
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-400
                        "
                    >
                        Navigation
                    </p>


                    {/* ================================================== */}
                    {/* MOBILE NAVIGATION                                   */}
                    {/* ================================================== */}

                    <nav className="space-y-1.5">

                        {navigationItems.map((item) => {

                            const Icon = item.icon

                            return (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `
                                            group
                                            flex
                                            min-h-12
                                            items-center
                                            gap-3
                                            rounded-xl
                                            border
                                            px-4
                                            py-3
                                            text-sm
                                            font-semibold
                                            transition-all
                                            duration-200
                                            active:scale-[0.98]
                                            ${
                                                isActive
                                                    ? `
                                                        border-blue-600
                                                        bg-blue-600
                                                        text-white
                                                        shadow-sm
                                                        shadow-blue-200
                                                    `
                                                    : `
                                                        border-transparent
                                                        text-slate-600
                                                        hover:border-slate-200
                                                        hover:bg-slate-50
                                                        hover:text-blue-600
                                                    `
                                            }
                                        `
                                    }
                                >

                                    {({ isActive }) => (

                                        <>

                                            {/* Navigation Icon */}

                                            <div
                                                className={`
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    ${
                                                        isActive
                                                            ? "bg-white/15"
                                                            : "bg-slate-100 group-hover:bg-blue-50"
                                                    }
                                                `}
                                            >

                                                <Icon
                                                    size={18}
                                                    strokeWidth={
                                                        isActive
                                                            ? 2.3
                                                            : 2
                                                    }
                                                />

                                            </div>


                                            {/* Navigation Name */}

                                            <span className="min-w-0 flex-1 truncate">
                                                {item.name}
                                            </span>


                                            {/* Active Arrow */}

                                            <ChevronRight
                                                size={16}
                                                className={`
                                                    shrink-0
                                                    transition-all
                                                    duration-200
                                                    ${
                                                        isActive
                                                            ? "translate-x-0 opacity-100"
                                                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                    }
                                                `}
                                            />

                                        </>

                                    )}

                                </NavLink>

                            )

                        })}

                    </nav>


                    {/* ================================================== */}
                    {/* MOBILE LOGOUT                                      */}
                    {/* ================================================== */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loading}
                        className="
                            mt-4
                            flex
                            min-h-12
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-red-100
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            font-semibold
                            text-red-600
                            transition-all
                            duration-200
                            hover:border-red-200
                            hover:bg-red-100
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <LogOut size={18} />

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