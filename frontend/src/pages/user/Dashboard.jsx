import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    WalletCards,
    ArrowLeftRight,
    Send,
    TrendingUp,
    CheckCircle2,
    Clock3,
    ArrowDownLeft,
    ArrowUpRight,
    Eye,
    ChevronRight,
    ShieldCheck,
    AlertCircle,
    RefreshCw,
} from "lucide-react"

import Button from "../../components/common/Button"

import {
    getMyBalance,
    getMyAccounts,
    getMyTransactions,
} from "../../services/user.service"


function Dashboard() {

    const navigate = useNavigate()

    const [balance, setBalance] = useState(0)

    const [accounts, setAccounts] = useState([])

    const [transactions, setTransactions] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    async function loadDashboard() {

        try {

            setLoading(true)

            setError("")


            const [
                balanceData,
                accountsData,
                transactionsData,
            ] = await Promise.all([
                getMyBalance(),
                getMyAccounts(),
                getMyTransactions(),
            ])


            console.log(
                "DASHBOARD BALANCE:",
                balanceData
            )

            console.log(
                "DASHBOARD ACCOUNTS:",
                accountsData
            )

            console.log(
                "DASHBOARD TRANSACTIONS:",
                transactionsData
            )


            setBalance(
                balanceData.balance ??
                balanceData.account?.balance ??
                0
            )


            setAccounts(
                accountsData.accounts || []
            )


            setTransactions(
                transactionsData.transactions || []
            )

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard."
            )

        } finally {

            setLoading(false)

        }
    }


    useEffect(() => {

        loadDashboard()

    }, [])


    function formatAmount(amount) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(amount || 0)

    }


    function formatDate(date) {

        if (!date) {
            return "N/A"
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        )

    }


    function formatTime(date) {

        if (!date) {
            return ""
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )

    }


    function getShortId(id) {

        if (!id) {
            return "N/A"
        }

        const value = String(id)

        return `${value.slice(0, 7)}...${value.slice(-5)}`

    }


    function getTransactionType(transaction) {

        if (transaction.type) {
            return transaction.type
        }

        return "TRANSFER"

    }


    function getTransactionIcon(transaction) {

        const type =
            getTransactionType(transaction)

        if (type === "CREDIT") {
            return ArrowDownLeft
        }

        if (type === "DEBIT") {
            return ArrowUpRight
        }

        return ArrowLeftRight

    }


    function getTransactionColor(transaction) {

        const type =
            getTransactionType(transaction)

        if (type === "CREDIT") {

            return {
                icon: "bg-emerald-50 text-emerald-600",
                amount: "text-emerald-600",
            }

        }

        return {
            icon: "bg-red-50 text-red-600",
            amount: "text-red-600",
        }

    }


    function getStatusClasses(status) {

        switch (status) {

            case "COMPLETED":
                return "bg-emerald-50 text-emerald-700"

            case "PENDING":
                return "bg-yellow-50 text-yellow-700"

            case "FAILED":
                return "bg-red-50 text-red-700"

            case "REVERSED":
                return "bg-orange-50 text-orange-700"

            default:
                return "bg-slate-50 text-slate-600"

        }

    }


    const completedTransactions =
        transactions.filter(
            (transaction) =>
                transaction.status === "COMPLETED"
        ).length


    const activeAccounts =
        accounts.filter(
            (account) =>
                account.status === "ACTIVE"
        ).length


    const recentTransactions =
        transactions.slice(0, 5)


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-red-700">
                            Dashboard unavailable
                        </p>

                        <p className="mt-1 text-sm leading-5 text-red-600">
                            {error}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={loadDashboard}
                        className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800"
                    >

                        <RefreshCw
                            size={14}
                        />

                        Retry

                    </button>

                </div>

            )}


            {/* ================================= */}
            {/* BALANCE HERO */}
            {/* ================================= */}

            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6 text-white shadow-xl shadow-blue-100 sm:p-8 lg:p-10">


                {/* Decorative circles */}

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />

                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5" />


                <div className="relative">


                    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">


                        {/* Balance */}

                        <div>

                            <div className="flex items-center gap-2">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">

                                    <WalletCards
                                        size={18}
                                    />

                                </div>

                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                                    Available Balance
                                </p>

                            </div>


                            {loading ? (

                                <div className="mt-4 h-12 w-52 animate-pulse rounded-xl bg-white/10" />

                            ) : (

                                <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">

                                    {formatAmount(
                                        balance
                                    )}

                                </h1>

                            )}


                            <div className="mt-4 flex items-center gap-2 text-xs text-blue-200 sm:text-sm">

                                <CheckCircle2
                                    size={15}
                                    className="text-emerald-300"
                                />

                                Secure account balance

                            </div>

                        </div>


                        {/* Quick Action */}

                        <Button
                            type="button"
                            onClick={() =>
                                navigate("/send-money")
                            }
                            className="w-full border border-white/20 bg-white/10 text-white shadow-none hover:bg-white/20 sm:w-auto"
                        >

                            <span className="flex items-center justify-center gap-2">

                                <Send
                                    size={18}
                                />

                                Send Money

                            </span>

                        </Button>

                    </div>

                </div>

            </section>


            {/* ================================= */}
            {/* STAT CARDS */}
            {/* ================================= */}

            <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">


                {/* Accounts */}

                <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                    <div className="flex items-start justify-between gap-3">

                        <div>

                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Accounts
                            </p>

                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {loading
                                    ? "—"
                                    : accounts.length}
                            </p>

                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">

                            <WalletCards
                                size={17}
                            />

                        </div>

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                        {activeAccounts} active
                    </p>

                </div>


                {/* Completed */}

                <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                    <div className="flex items-start justify-between gap-3">

                        <div>

                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Completed
                            </p>

                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {loading
                                    ? "—"
                                    : completedTransactions}
                            </p>

                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-105">

                            <CheckCircle2
                                size={17}
                            />

                        </div>

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                        Successful transfers
                    </p>

                </div>


                {/* Transactions */}

                <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">

                    <div className="flex items-start justify-between gap-3">

                        <div>

                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Transactions
                            </p>

                            <p className="mt-2 text-2xl font-bold text-slate-800">
                                {loading
                                    ? "—"
                                    : transactions.length}
                            </p>

                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-105">

                            <ArrowLeftRight
                                size={17}
                            />

                        </div>

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                        Total activity
                    </p>

                </div>


                {/* Status */}

                <div className="group col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-1 sm:p-5">

                    <div className="flex items-start justify-between gap-3">

                        <div>

                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Account Status
                            </p>

                            <div className="mt-3 flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                <span className="text-sm font-bold text-slate-700">
                                    {activeAccounts > 0
                                        ? "Active"
                                        : "No Active Account"}
                                </span>

                            </div>

                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                            <ShieldCheck
                                size={17}
                            />

                        </div>

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                        Banking access
                    </p>

                </div>

            </section>


            {/* ================================= */}
            {/* QUICK ACTIONS + RECENT */}
            {/* ================================= */}

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.85fr_1.5fr]">


                {/* ================================= */}
                {/* QUICK ACTIONS */}
                {/* ================================= */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                    <div>

                        <h2 className="text-lg font-bold text-slate-800">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Common banking actions
                        </p>

                    </div>


                    <div className="mt-5 space-y-3">


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/send-money")
                            }
                            className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 active:scale-[0.99]"
                        >

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-200 group-hover:scale-105">

                                <Send
                                    size={19}
                                />

                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-bold text-slate-800">
                                    Send Money
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Transfer money securely
                                </p>

                            </div>

                            <ChevronRight
                                size={18}
                                className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                            />

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/accounts")
                            }
                            className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition-all duration-200 hover:border-purple-200 hover:bg-purple-50 active:scale-[0.99]"
                        >

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform duration-200 group-hover:scale-105">

                                <WalletCards
                                    size={19}
                                />

                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-bold text-slate-800">
                                    Accounts
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Manage your accounts
                                </p>

                            </div>

                            <ChevronRight
                                size={18}
                                className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-purple-600"
                            />

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/funds")
                            }
                            className="group flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 active:scale-[0.99]"
                        >

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform duration-200 group-hover:scale-105">

                                <TrendingUp
                                    size={19}
                                />

                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="text-sm font-bold text-slate-800">
                                    Funds
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Manage account funding
                                </p>

                            </div>

                            <ChevronRight
                                size={18}
                                className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600"
                            />

                        </button>

                    </div>

                </div>


                {/* ================================= */}
                {/* RECENT TRANSACTIONS */}
                {/* ================================= */}

                <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">


                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                            <h2 className="text-lg font-bold text-slate-800">
                                Recent Transactions
                            </h2>

                            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                Your latest banking activity
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/transactions")
                            }
                            className="flex shrink-0 items-center gap-1 text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 sm:text-sm"
                        >

                            View All

                            <ChevronRight
                                size={15}
                            />

                        </button>

                    </div>


                    <div className="mt-5">


                        {loading && (

                            <div className="space-y-3">

                                {[1, 2, 3].map(
                                    (item) => (

                                        <div
                                            key={item}
                                            className="h-16 animate-pulse rounded-xl bg-slate-100"
                                        />

                                    )
                                )}

                            </div>

                        )}


                        {!loading &&
                            recentTransactions.length === 0 && (

                                <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-5 py-10 text-center">

                                    <ArrowLeftRight
                                        size={30}
                                        className="text-slate-300"
                                    />

                                    <p className="mt-3 text-sm font-bold text-slate-600">
                                        No transactions yet
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Your recent activity will appear here.
                                    </p>

                                </div>

                            )}


                        {!loading &&
                            recentTransactions.length > 0 && (

                                <div className="space-y-2">

                                    {recentTransactions.map(
                                        (transaction) => {

                                            const Icon =
                                                getTransactionIcon(
                                                    transaction
                                                )

                                            const colors =
                                                getTransactionColor(
                                                    transaction
                                                )

                                            const type =
                                                getTransactionType(
                                                    transaction
                                                )

                                            return (

                                                <button
                                                    type="button"
                                                    key={
                                                        transaction._id
                                                    }
                                                    onClick={() =>
                                                        navigate(
                                                            `/transactions/${transaction._id}`
                                                        )
                                                    }
                                                    className="group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200 hover:bg-slate-50 active:scale-[0.99]"
                                                >


                                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}>

                                                        <Icon
                                                            size={18}
                                                        />

                                                    </div>


                                                    <div className="min-w-0 flex-1">

                                                        <p className="truncate text-sm font-bold text-slate-700">

                                                            {type ===
                                                            "CREDIT"
                                                                ? "Money Received"
                                                                : "Money Sent"}

                                                        </p>

                                                        <div className="mt-1 flex items-center gap-2">

                                                            <span className="text-[11px] text-slate-400">
                                                                {formatDate(
                                                                    transaction.createdAt
                                                                )}
                                                            </span>

                                                            <span className="text-slate-300">
                                                                •
                                                            </span>

                                                            <span className="text-[11px] text-slate-400">
                                                                {formatTime(
                                                                    transaction.createdAt
                                                                )}
                                                            </span>

                                                        </div>

                                                    </div>


                                                    <div className="shrink-0 text-right">

                                                        <p className={`text-sm font-bold ${colors.amount}`}>

                                                            {type ===
                                                            "CREDIT"
                                                                ? "+"
                                                                : "-"}

                                                            {formatAmount(
                                                                transaction.amount
                                                            )}

                                                        </p>


                                                        <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ${getStatusClasses(
                                                            transaction.status
                                                        )}`}>

                                                            {
                                                                transaction.status
                                                            }

                                                        </span>

                                                    </div>


                                                    <Eye
                                                        size={16}
                                                        className="hidden shrink-0 text-slate-300 transition-colors group-hover:text-blue-600 sm:block"
                                                    />

                                                </button>

                                            )

                                        }
                                    )}

                                </div>

                            )}

                    </div>

                </div>

            </section>


            {/* ================================= */}
            {/* SECURITY FOOTER */}
            {/* ================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                        <ShieldCheck
                            size={19}
                        />

                    </div>


                    <div>

                        <h3 className="text-sm font-bold text-slate-800">
                            Secure Banking Dashboard
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                            Your account information and transactions
                            are loaded through your authenticated session.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    )
}


export default Dashboard