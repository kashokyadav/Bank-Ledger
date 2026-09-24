import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div>
            <header>
                <h1>BANK-LEDGER</h1>
                <p>Secure Banking Management System</p>
            </header>

            <main>
                <Outlet />  
            </main>
        </div>
    )
}

export default AuthLayout