import { NavLink } from "react-router-dom"
import {
    LayoutDashboard,
    WalletCards,
    ArrowLeftRight,
    Send,
    UserRound,
} from "lucide-react"
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
        icon: UserRound
    },
    {
    name: "Funds",
    path: "/funds",
    icon: WalletCards,
}
]

function Sidebar() {
    return (
        <aside className="hidden min-h-[calc(100vh-76px)] w-64 shrink-0 border-r border-slate-200 bg-white lg:block">

            <div className="flex h-full flex-col">

                {/* Navigation Header */}
                <div className="px-4 pb-3 pt-6">

                    <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Main Menu
                    </p>

                </div>


                {/* Navigation */}
                <nav className="space-y-1 px-3">

                    {navigationItems.map((item) => {

                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                    }`
                                }
                            >

                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={19}
                                            strokeWidth={isActive ? 2.3 : 2}
                                            className="shrink-0"
                                        />

                                        <span>
                                            {item.name}
                                        </span>

                                        {isActive && (
                                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </>
                                )}

                            </NavLink>
                        )
                    })}

                </nav>


                {/* Bottom Information */}
                <div className="mt-auto p-4">

                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <p className="text-xs font-bold text-blue-700">
                            BANK-LEDGER
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-600/70">
                            Secure and simple banking management.
                        </p>

                    </div>

                </div>

            </div>

        </aside>
    )
}

export default Sidebar