import { Outlet } from "react-router-dom"

import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"
import Footer from "../components/layout/Footer"

function UserLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-100">

            {/* Navbar */}
            <Navbar />

            {/* Sidebar + Main Content */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    )
}

export default UserLayout