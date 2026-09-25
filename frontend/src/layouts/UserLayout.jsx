import { Outlet } from "react-router-dom"

import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"
import Footer from "../components/layout/Footer"


function UserLayout() {

    return (

        // Main application background.
        <div className="min-h-screen w-full bg-slate-100">

            {/* ==========================================
                TOP NAVBAR
            =========================================== */}

            <Navbar />


            {/* ==========================================
                SIDEBAR + CONTENT
            =========================================== */}

            <div className="flex min-w-0">

                {/* --------------------------------------
                    DESKTOP SIDEBAR
                --------------------------------------- */}

                <Sidebar />


                {/* --------------------------------------
                    MAIN CONTENT AREA
                --------------------------------------- */}

                <main
                    className="
                        min-w-0
                        flex-1
                        overflow-x-hidden

                        /* Mobile screen spacing */
                        px-6
                        py-5

                        /* Tablet spacing */
                        sm:px-7
                        sm:py-6

                        /* Laptop spacing */
                        lg:px-8
                        lg:py-7

                        /* Large desktop spacing */
                        xl:px-10
                        xl:py-8
                    "
                >

                    {/* ----------------------------------
                        CONTENT CONTAINER
                    ----------------------------------- */}

                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-[1500px]
                        "
                    >

                        {/* Page content */}
                        <Outlet />

                    </div>

                </main>

            </div>


            {/* ==========================================
                FOOTER
            =========================================== */}

            <Footer />

        </div>
    )
}


export default UserLayout