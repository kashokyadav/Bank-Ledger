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


// ======================================================
// SIDEBAR NAVIGATION ITEMS
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
                w-64
                shrink-0
                border-r
                border-slate-200
                bg-white
                lg:block
            "
        >

            {/* ================================================== */}
            {/* SIDEBAR CONTAINER                                  */}
            {/* ================================================== */}

            <div
                className="
                    sticky
                    top-[76px]
                    flex
                    h-[calc(100vh-76px)]
                    flex-col
                    overflow-y-auto
                "
            >

                {/* ================================================== */}
                {/* SIDEBAR BRAND SECTION                              */}
                {/* ================================================== */}
 


                {/* ================================================== */}
                {/* NAVIGATION                                          */}
                {/* ================================================== */}

                <nav
                    className="
                        space-y-1
                        px-3
                    "
                >

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
                                        min-h-12
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        px-3
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        transition-all
                                        duration-200
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

                                        {/* ================================================== */}
                                        {/* NAVIGATION ICON                                     */}
                                        {/* ================================================== */}

                                        <div
                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                transition-all
                                                duration-200
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


                                        {/* ================================================== */}
                                        {/* NAVIGATION LABEL                                    */}
                                        {/* ================================================== */}

                                        <span
                                            className="
                                                min-w-0
                                                flex-1
                                                truncate
                                            "
                                        >
                                            {item.name}
                                        </span>


                                        {/* ================================================== */}
                                        {/* ACTIVE / HOVER ARROW                               */}
                                        {/* ================================================== */}

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
                {/* BOTTOM SECURITY CARD                                */}
                {/* ================================================== */}

                <div
                    className="
                        mt-auto
                        p-4
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            border
                            border-blue-100
                            bg-gradient-to-br
                            from-blue-50
                            via-white
                            to-slate-50
                            p-4
                            shadow-sm
                        "
                    >

                        {/* Security Header */}

                        <div
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >

                            {/* Security Icon */}

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-blue-100
                                    bg-white
                                    text-blue-600
                                    shadow-sm
                                "
                            >

                                <ShieldCheck size={18} />

                            </div>


                            {/* Security Text */}

                            <div className="min-w-0">

                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        text-slate-700
                                    "
                                >
                                    Secure Banking
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[11px]
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    Your banking experience is protected.
                                </p>

                            </div>

                        </div>


                        {/* Security Status */}

                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                gap-2
                                border-t
                                border-blue-100
                                pt-3
                            "
                        >

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-500
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                System protected
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </aside>

    )
}


export default Sidebar