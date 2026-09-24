import { Outlet } from "react-router-dom"

import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"

function UserLayout() {
    return (
        <div className="min-h-screen bg-slate-100">

            {/* Top Navigation */}
            <Navbar />

            {/* Sidebar + Main Content */}
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Page Content */}
                <main className="min-w-0 flex-1 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

export default UserLayout