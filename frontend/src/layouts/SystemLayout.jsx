import { Outlet } from "react-router-dom"

function SystemLayout() {

    return (
        <div>

            <header>
                <h1>BANK-LEDGER</h1>
                <p>System Panel</p>
            </header>

            <main>
                <Outlet />
            </main>

        </div>
    )
}

export default SystemLayout