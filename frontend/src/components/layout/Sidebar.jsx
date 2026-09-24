import { NavLink } from "react-router-dom"

import {
    LayoutDashboard,
    WalletCards,
    ArrowLeftRight,
    Send,
    UserRound,
    ShieldCheck,
    ChevronRight,
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
        icon: UserRound,
    },
    {
        name: "Funds",
        path: "/funds",
        icon: WalletCards,
    },
]


function Sidebar() {

    return (

        <aside
            className="
                hidden
                min-h-[calc(100vh-76px)]
                w-64
                shrink-0
                border-r
                border-slate-200
                bg-white
                lg:block
            "
        >

            <div className="flex h-full flex-col">


                {/* ================================= */}
                {/* SIDEBAR HEADER */}
                {/* ================================= */}

                <div className="border-b border-slate-100 px-5 py-6">

                    <div className="flex items-center gap-3">
 


 

                    </div>

                </div>


                {/* ================================= */}
                {/* NAVIGATION TITLE */}
                {/* ================================= */}

                <div className="px-5 pb-2 pt-6">

                    <p
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-400
                        "
                    >
                        Main Menu
                    </p>

                </div>


                {/* ================================= */}
                {/* NAVIGATION */}
                {/* ================================= */}

                <nav className="space-y-1.5 px-3">

                    {navigationItems.map((item) => {

                        const Icon = item.icon

                        return (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-3
                                        text-sm
                                        font-semibold
                                        transition-all
                                        duration-200
                                        ${
                                            isActive
                                                ? `
                                                    bg-blue-600
                                                    text-white
                                                    shadow-sm
                                                    shadow-blue-200
                                                `
                                                : `
                                                    text-slate-600
                                                    hover:bg-slate-50
                                                    hover:text-blue-600
                                                `
                                        }
                                    `
                                }
                            >

                                {({ isActive }) => (

                                    <>

                                        {/* Icon */}

                                        <div
                                            className={`
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                transition
                                                ${
                                                    isActive
                                                        ? "bg-white/15"
                                                        : "bg-slate-50 group-hover:bg-blue-50"
                                                }
                                            `}
                                        >

                                            <Icon
                                                size={18}
                                                strokeWidth={
                                                    isActive ? 2.3 : 2
                                                }
                                            />

                                        </div>


                                        {/* Label */}

                                        <span className="min-w-0 flex-1 truncate">
                                            {item.name}
                                        </span>


                                        {/* Active / Hover Arrow */}

                                        <ChevronRight
                                            size={15}
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


                {/* ================================= */}
                {/* BOTTOM SECURITY CARD */}
                {/* ================================= */}

                <div className="mt-auto p-4">

                    <div
                        className="
                            rounded-2xl
                            border
                            border-blue-100
                            bg-gradient-to-br
                            from-blue-50
                            to-slate-50
                            p-4
                        "
                    >

                        <div className="flex items-start gap-3">

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-white
                                    text-blue-600
                                    shadow-sm
                                "
                            >

                                <ShieldCheck size={18} />

                            </div>


                            <div className="min-w-0">

                                <p className="text-xs font-bold text-slate-700">
                                    Secure Banking
                                </p>

                                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                    Your banking experience is protected.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </aside>

    )

}

export default Sidebar