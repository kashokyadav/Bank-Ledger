import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-white border-r p-4">

            <nav className="space-y-2">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-medium ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/accounts"
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-medium ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`
                    }
                >
                    Accounts
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-medium ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`
                    }
                >
                    Transactions
                </NavLink>

                <NavLink
                    to="/send-money"
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 font-medium transition ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`
                    }
                >
                    Send Money
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 font-medium transition ${
                            isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                        }`
                    }
                >
                    Profile
                </NavLink>
    
            </nav>

        </aside>
    )
}

export default Sidebar