import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
    ArrowDownLeft,
    ArrowLeftRight,
    ArrowUpRight,
    CreditCard,
    Send,
    WalletCards,
} from "lucide-react"

import Card from "../../components/common/Card"
import StatCard from "../../components/common/StatCard"

import {
    getMyBalance,
    getMyAccounts,
    getMyTransactions,
} from "../../services/user.service"

import { useAuth } from "../../context/AuthContext"


function UserDashboard() {

    const { user } = useAuth()

    const [balance, setBalance] = useState(0)
    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])


    useEffect(() => {

        async function loadUserData() {

            try {

                // =========================
                // BALANCE
                // =========================

                const balanceData = await getMyBalance()

                console.log("BALANCE API:", balanceData)

                setBalance(balanceData.balance)


                // =========================
                // ACCOUNTS
                // =========================

                const accountsData = await getMyAccounts()

                console.log("ACCOUNTS API:", accountsData)

                setAccounts(accountsData.accounts || [])


                // =========================
                // TRANSACTIONS
                // =========================

                const transactionsData = await getMyTransactions()

                console.log("TRANSACTIONS API:", transactionsData)

                setTransactions(transactionsData.transactions || [])

            } catch (error) {

                console.error(
                    "Dashboard API Error:",
                    error.response?.data || error.message
                )

            }

        }

        loadUserData()

    }, [])


    return (

        <div className="space-y-6">

            {/* =====================================
                HEADER
            ====================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <p className="text-sm font-semibold text-blue-600">
                        Personal Banking
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Welcome back{user?.name ? `, ${user.name}` : ""} 👋
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Here's your banking overview.
                    </p>

                </div>

                <Link
                    to="/send-money"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98]"
                >
                    <Send size={17} />

                    Send Money
                </Link>

            </div>


            {/* =====================================
                BALANCE HERO
            ====================================== */}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-6 text-white shadow-lg shadow-blue-100 sm:p-8">

                {/* Decorative circles */}

                <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/10" />

                <div className="pointer-events-none absolute -bottom-24 right-20 h-40 w-40 rounded-full bg-white/5" />


                <div className="relative">

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <p className="text-sm font-medium text-blue-100">
                                Available Balance
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                ₹{Number(balance).toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                })}
                            </h2>

                            <p className="mt-3 text-xs text-blue-100">
                                Current available account balance
                            </p>

                        </div>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                            <WalletCards size={24} />
                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================
                SUMMARY CARDS
            ====================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="Total Accounts"
                    value={accounts.length}
                    description="Accounts linked to you"
                    icon={<CreditCard size={21} />}
                />

                <StatCard
                    title="Account Status"
                    value={
                        accounts.length > 0
                            ? accounts[0].status
                            : "No Account"
                    }
                    description="Primary account status"
                    icon={<WalletCards size={21} />}
                    valueClassName={
                        accounts.length > 0 &&
                        accounts[0].status === "ACTIVE"
                            ? "text-emerald-600"
                            : "text-slate-900"
                    }
                />

                <StatCard
                    title="Transactions"
                    value={transactions.length}
                    description="Recent account activity"
                    icon={<ArrowLeftRight size={21} />}
                />

            </div>


            {/* =====================================
                QUICK ACTIONS
            ====================================== */}

            <div>

                <div className="mb-4">

                    <h2 className="text-lg font-bold text-slate-900">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your banking activity.
                    </p>

                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <Link
                        to="/send-money"
                        className="group"
                    >

                        <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                    <Send size={21} />
                                </div>

                                <div className="min-w-0">

                                    <h3 className="font-semibold text-slate-800">
                                        Send Money
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Transfer money to another account.
                                    </p>

                                </div>

                                <ArrowUpRight
                                    size={19}
                                    className="ml-auto shrink-0 text-slate-300 transition group-hover:text-blue-600"
                                />

                            </div>

                        </Card>

                    </Link>


                    <Link
                        to="/transactions"
                        className="group"
                    >

                        <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-slate-800 group-hover:text-white">
                                    <ArrowLeftRight size={21} />
                                </div>

                                <div className="min-w-0">

                                    <h3 className="font-semibold text-slate-800">
                                        Transactions
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        View your complete transaction history.
                                    </p>

                                </div>

                                <ArrowUpRight
                                    size={19}
                                    className="ml-auto shrink-0 text-slate-300 transition group-hover:text-slate-700"
                                />

                            </div>

                        </Card>

                    </Link>

                </div>

            </div>


            {/* =====================================
                RECENT TRANSACTIONS
            ====================================== */}

            <Card>

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h2 className="text-lg font-bold text-slate-900">
                            Recent Transactions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your latest account activity.
                        </p>

                    </div>

                    <Link
                        to="/transactions"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                        View all
                    </Link>

                </div>


                {transactions.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <ArrowLeftRight size={21} />
                        </div>

                        <p className="mt-3 font-semibold text-slate-700">
                            No transactions yet
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Your recent transactions will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-slate-100">

                        {transactions.slice(0, 5).map((transaction) => (

                            <div
                                key={transaction._id}
                                className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                            >

                                {/* Transaction Icon */}

                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                        transaction.status === "COMPLETED"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : transaction.status === "FAILED"
                                            ? "bg-red-50 text-red-600"
                                            : "bg-amber-50 text-amber-600"
                                    }`}
                                >

                                    {transaction.status === "COMPLETED" ? (
                                        <ArrowDownLeft size={18} />
                                    ) : (
                                        <ArrowLeftRight size={18} />
                                    )}

                                </div>


                                {/* Transaction Details */}

                                <div className="min-w-0 flex-1">

                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        Transaction
                                    </p>

                                    <p className="mt-1 truncate text-xs text-slate-400">
                                        ID: {transaction._id}
                                    </p>

                                </div>


                                {/* Amount + Status */}

                                <div className="text-right">

                                    <p className="font-semibold text-slate-800">
                                        ₹{Number(transaction.amount).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>

                                    <p
                                        className={`mt-1 text-xs font-semibold ${
                                            transaction.status === "COMPLETED"
                                                ? "text-emerald-600"
                                                : transaction.status === "FAILED"
                                                ? "text-red-600"
                                                : "text-amber-600"
                                        }`}
                                    >
                                        {transaction.status}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </Card>

        </div>
    )
}


export default UserDashboard