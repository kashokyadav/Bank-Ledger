import { BrowserRouter, Routes, Route } from "react-router-dom"

import AuthLayout from "../layouts/AuthLayout"
import UserLayout from "../layouts/UserLayout"
import SystemLayout from "../layouts/SystemLayout"

import Landing from "../pages/Landing"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"

import UserDashboard from "../pages/user/Dashboard"
import UserAccounts from "../pages/user/Accounts"
import UserTransactions from "../pages/user/Transactions"
import UserTransactionDetails from "../pages/user/TransactionDetails"
import SendMoney from "../pages/user/SendMoney"
import SendMoneyForm from "../pages/user/SendMoneyForm"
import Profile from "../pages/user/Profile"
import Funds from "../pages/user/Funds"

import SystemDashboard from "../pages/system/Dashboard"
import SystemUsers from "../pages/system/Users"
import SystemAccounts from "../pages/system/Accounts"
import SystemTransactions from "../pages/system/Transactions"
import SystemTransactionDetails from "../pages/system/TransactionDetails"

import ProtectedRoute from "./ProtectedRoute"
import SystemProtectedRoute from "./SystemProtectedRoute"
import GuestRoute from "./GuestRoute"


function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    LANDING PAGE
                ========================== */}

                <Route
                    path="/"
                    element={<Landing />}
                />


                {/* =========================
                    PUBLIC AUTH ROUTES
                ========================== */}

                <Route element={<GuestRoute />}>

                    <Route element={<AuthLayout />}>

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/register"
                            element={<Register />}
                        />

                    </Route>

                </Route>


                {/* =========================
                    USER PROTECTED ROUTES
                ========================== */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<UserLayout />}>

                        <Route
                            path="/dashboard"
                            element={<UserDashboard />}
                        />

                        <Route
                            path="/accounts"
                            element={<UserAccounts />}
                        />

                        <Route
                            path="/transactions/"
                            element={<UserTransactions />}
                        />

                        <Route
                            path="/transactions/:id"
                            element={<UserTransactionDetails />}
                        />

                        <Route
                            path="/send-money"
                            element={<SendMoney />}
                        />

                        <Route
                            path="/send-money/:accountId"
                            element={<SendMoneyForm />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/funds"
                            element={<Funds />}
                        />

                    </Route>

                </Route>


                {/* =========================
                    SYSTEM PROTECTED ROUTES
                ========================== */}

                <Route element={<SystemProtectedRoute />}>

                    <Route element={<SystemLayout />}>

                        <Route
                            path="/system/dashboard"
                            element={<SystemDashboard />}
                        />

                        <Route
                            path="/system/users"
                            element={<SystemUsers />}
                        />

                        <Route
                            path="/system/accounts"
                            element={<SystemAccounts />}
                        />

                        <Route
                            path="/system/transactions"
                            element={<SystemTransactions />}
                        />

                        <Route
                            path="/system/transactions/:id"
                            element={<SystemTransactionDetails />}
                        />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes