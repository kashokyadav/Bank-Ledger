import { Outlet } from "react-router-dom"

import {
    ShieldCheck,
    LockKeyhole,
} from "lucide-react"


function AuthLayout() {

    return (

        <div
            className="
                flex
                min-h-screen
                flex-col
                bg-slate-50
            "
        >

            {/* ================================================== */}
            {/* AUTH HEADER                                        */}
            {/* ================================================== */}

            <header
                className="
                    border-b
                    border-slate-200
                    bg-white
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        min-h-[72px]
                        w-full
                        max-w-7xl
                        items-center
                        justify-between
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >

                    {/* ================================================== */}
                    {/* BRAND                                               */}
                    {/* ================================================== */}

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {/* Brand Icon */}

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
                            "
                        >

                            <ShieldCheck
                                size={21}
                                strokeWidth={2.2}
                            />

                        </div>


                        {/* Brand Text */}

                        <div>

                            <h1
                                className="
                                    text-base
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                    sm:text-lg
                                "
                            >
                                BANK-LEDGER
                            </h1>

                            <p
                                className="
                                    hidden
                                    text-xs
                                    font-medium
                                    text-slate-400
                                    sm:block
                                "
                            >
                                Secure Banking Management System
                            </p>

                        </div>

                    </div>


                    {/* ================================================== */}
                    {/* SECURITY INDICATOR                                 */}
                    {/* ================================================== */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            py-2
                        "
                    >

                        <LockKeyhole
                            size={15}
                            className="text-blue-600"
                        />

                        <span
                            className="
                                hidden
                                text-xs
                                font-semibold
                                text-slate-600
                                sm:inline
                            "
                        >
                            Secure Connection
                        </span>

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-emerald-500
                            "
                        />

                    </div>

                </div>

            </header>


            {/* ================================================== */}
            {/* AUTH MAIN CONTENT                                  */}
            {/* ================================================== */}

            <main
                className="
                    flex
                    flex-1
                    items-start
                    justify-center
                    px-4
                    py-8
                    sm:px-6
                    sm:py-10
                    lg:px-8
                    lg:py-12
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                    "
                >

                    {/* Login / Register page appears here */}

                    <Outlet />

                </div>

            </main>


            {/* ================================================== */}
            {/* AUTH FOOTER                                        */}
            {/* ================================================== */}

            <footer
                className="
                    border-t
                    border-slate-200
                    bg-white
                    px-4
                    py-5
                    text-center
                    sm:px-6
                "
            >

                <p
                    className="
                        text-xs
                        text-slate-400
                    "
                >
                    © {new Date().getFullYear()} BANK-LEDGER. All rights reserved.
                </p>

            </footer>

        </div>

    )
}


export default AuthLayout