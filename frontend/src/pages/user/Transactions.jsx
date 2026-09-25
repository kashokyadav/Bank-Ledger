import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    ArrowLeftRight,
    ArrowDownLeft,
    ArrowUpRight,
    Send,
    Eye,
    Clock3,
    CheckCircle2,
    XCircle,
    RotateCcw,
    WalletCards,
    AlertCircle,
    RefreshCw,
} from "lucide-react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"

import { getMyTransactions } from "../../services/user.service"


function UserTransactions() {

    const navigate = useNavigate()

    // =========================================
    // PAGE STATE
    // =========================================

    // Stores all transactions belonging to the user.
    const [transactions, setTransactions] = useState([])

    // Controls the loading state.
    const [loading, setLoading] = useState(true)

    // Stores API error messages.
    const [error, setError] = useState("")


    // =========================================
    // LOAD TRANSACTIONS
    // =========================================

    async function loadTransactions() {

        try {

            // Start loading.
            setLoading(true)

            // Clear previous error.
            setError("")

            // Request transactions from the backend.
            const data = await getMyTransactions()

            // Keep API response available during development.
            console.log("TRANSACTIONS API:", data)

            // Safely update the transaction list.
            setTransactions(data.transactions || [])

        } catch (error) {

            // Log backend information for debugging.
            console.error(
                "Transactions API Error:",
                error.response?.data ||
                error.message
            )

            // Display backend message when available.
            setError(
                error.response?.data?.message ||
                "Failed to load transactions. Please try again."
            )

        } finally {

            // Stop loading.
            setLoading(false)
        }
    }


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        // Load transactions when the page opens.
        loadTransactions()

    }, [])


    // =========================================
    // FORMAT AMOUNT
    // =========================================

    function formatAmount(amount) {

        // Format amount using Indian currency.
        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(amount || 0)
    }


    // =========================================
    // FORMAT DATE
    // =========================================

    function formatDate(date) {

        // Handle missing dates safely.
        if (!date) {
            return "N/A"
        }

        // Format date for Indian users.
        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        )
    }


    // =========================================
    // FORMAT TIME
    // =========================================

    function formatTime(date) {

        // Handle missing dates.
        if (!date) {
            return ""
        }

        // Format transaction time.
        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )
    }


    // =========================================
    // TRANSACTION TYPE
    // =========================================

    function getTransactionType(transaction) {

        // Get the logged-in user's account ID.
        const userAccountId =
            transaction.userAccountId ||
            transaction.accountId

        // If the user's account sent the money,
        // this transaction is a debit.
        if (
            userAccountId &&
            String(transaction.fromAccount?._id) ===
            String(userAccountId)
        ) {
            return "DEBIT"
        }

        // If the user's account received the money,
        // this transaction is a credit.
        if (
            userAccountId &&
            String(transaction.toAccount?._id) ===
            String(userAccountId)
        ) {
            return "CREDIT"
        }

        // Use the backend type as a fallback.
        return transaction.type || "TRANSFER"
    }


    // =========================================
    // TRANSACTION ICON
    // =========================================

    function getTransactionIcon(transaction) {

        // Determine transaction direction.
        const type = getTransactionType(transaction)

        // Credit means money received.
        if (type === "CREDIT") {
            return ArrowDownLeft
        }

        // Debit means money sent.
        if (type === "DEBIT") {
            return ArrowUpRight
        }

        // Transfer fallback.
        return ArrowLeftRight
    }


    // =========================================
    // STATUS ICON
    // =========================================

    function getStatusIcon(status) {

        switch (status) {

            // Completed transaction.
            case "COMPLETED":
                return CheckCircle2

            // Failed transaction.
            case "FAILED":
                return XCircle

            // Reversed transaction.
            case "REVERSED":
                return RotateCcw

            // Pending transaction.
            case "PENDING":
                return Clock3

            // Unknown status fallback.
            default:
                return Clock3
        }
    }


    // =========================================
    // STATUS COLORS
    // =========================================

    function getStatusClasses(status) {

        switch (status) {

            // Successful transaction.
            case "COMPLETED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200"

            // Failed transaction.
            case "FAILED":
                return "bg-red-50 text-red-700 border-red-200"

            // Reversed transaction.
            case "REVERSED":
                return "bg-orange-50 text-orange-700 border-orange-200"

            // Pending transaction.
            case "PENDING":
                return "bg-amber-50 text-amber-700 border-amber-200"

            // Unknown status.
            default:
                return "bg-slate-50 text-slate-600 border-slate-200"
        }
    }


    // =========================================
    // TRANSACTION TYPE COLORS
    // =========================================

    function getTypeClasses(type) {

        // Credit styling.
        if (type === "CREDIT") {

            return {
                container:
                    "bg-emerald-50 text-emerald-600",
                amount:
                    "text-emerald-600",
            }
        }

        // Debit / transfer styling.
        return {
            container:
                "bg-red-50 text-red-600",
            amount:
                "text-red-600",
        }
    }


    // =========================================
    // OTHER ACCOUNT
    // =========================================

    function getOtherAccount(transaction) {

        // Determine transaction direction.
        const type = getTransactionType(transaction)

        // For credits, show the sender.
        if (type === "CREDIT") {

            return (
                transaction.fromAccount?._id ||
                transaction.fromAccount ||
                "System"
            )
        }

        // For debits, show the receiver.
        return (
            transaction.toAccount?._id ||
            transaction.toAccount ||
            "Unknown"
        )
    }


    // =========================================
    // SHORT TRANSACTION ID
    // =========================================

    function getShortId(id) {

        // Handle missing IDs.
        if (!id) {
            return "N/A"
        }

        // Convert ID to string.
        const value = String(id)

        // Show a readable shortened ID.
        return `${value.slice(0, 8)}...${value.slice(-6)}`
    }


    // =========================================
    // OPEN TRANSACTION DETAILS
    // =========================================

    function openTransaction(transactionId) {

        // Navigate to the transaction details page.
        navigate(`/transactions/${transactionId}`)
    }


    // =========================================
    // SUMMARY COUNTS
    // =========================================

    // Calculate completed transaction count.
    const completedCount = transactions.filter(
        (transaction) =>
            transaction.status === "COMPLETED"
    ).length

    // Calculate pending transaction count.
    const pendingCount = transactions.filter(
        (transaction) =>
            transaction.status === "PENDING"
    ).length


    // =========================================
    // PAGE UI
    // =========================================

    return (

        <div className="w-full space-y-5 sm:space-y-6 lg:space-y-7">

            {/* ========================================= */}
            {/* PAGE HEADER */}
            {/* ========================================= */}

            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* PAGE TITLE */}
                <div className="flex min-w-0 items-center gap-3">

                    {/* PAGE ICON */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">

                        <ArrowLeftRight
                            size={22}
                            strokeWidth={2.2}
                        />

                    </div>

                    {/* TITLE */}
                    <div className="min-w-0">

                        <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Transactions
                        </h1>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            View your complete transaction history.
                        </p>

                    </div>

                </div>


                {/* SEND MONEY */}
                <Button
                    type="button"
                    onClick={() => navigate("/send-money")}
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <Send size={18} />

                        Send Money

                    </span>

                </Button>

            </section>


            {/* ========================================= */}
            {/* ERROR MESSAGE */}
            {/* ========================================= */}

            {error && !loading && (

                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm"
                >

                    <div className="flex items-start gap-3">

                        {/* ERROR ICON */}
                        <AlertCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-red-600"
                        />

                        {/* ERROR CONTENT */}
                        <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-red-700">
                                Unable to load transactions
                            </p>

                            <p className="mt-1 break-words text-sm leading-5 text-red-600">
                                {error}
                            </p>

                        </div>

                        {/* RETRY */}
                        <button
                            type="button"
                            onClick={loadTransactions}
                            disabled={loading}
                            className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-700 transition hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            <RefreshCw size={14} />

                            <span className="hidden sm:inline">
                                Retry
                            </span>

                        </button>

                    </div>

                </div>

            )}


            {/* ========================================= */}
            {/* SUMMARY CARDS */}
            {/* ========================================= */}

            {!loading && !error && (

                <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

                    {/* TOTAL */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:rounded-2xl sm:p-5">

                        <div className="flex items-center justify-between gap-3">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Total
                            </p>

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                                <ArrowLeftRight size={17} />

                            </div>

                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {transactions.length}
                        </p>

                    </div>


                    {/* COMPLETED */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:rounded-2xl sm:p-5">

                        <div className="flex items-center justify-between gap-3">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Completed
                            </p>

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <CheckCircle2 size={17} />

                            </div>

                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {completedCount}
                        </p>

                    </div>


                    {/* PENDING */}
                    <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-amber-200 hover:shadow-md sm:col-span-1 sm:rounded-2xl sm:p-5">

                        <div className="flex items-center justify-between gap-3">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Pending
                            </p>

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">

                                <Clock3 size={17} />

                            </div>

                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-900">
                            {pendingCount}
                        </p>

                    </div>

                </section>

            )}


            {/* ========================================= */}
            {/* LOADING SKELETON */}
            {/* ========================================= */}

            {loading && (

                <div className="space-y-3">

                    {[1, 2, 3, 4, 5].map((item) => (

                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                        >

                            <div className="flex items-center gap-4">

                                {/* ICON SKELETON */}
                                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200" />

                                {/* TEXT SKELETON */}
                                <div className="min-w-0 flex-1 space-y-2">

                                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                                    <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />

                                </div>

                                {/* AMOUNT SKELETON */}
                                <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* ========================================= */}
            {/* EMPTY STATE */}
            {/* ========================================= */}

            {!loading &&
                !error &&
                transactions.length === 0 && (

                    <Card>

                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:px-8 sm:py-16">

                            {/* EMPTY ICON */}
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-blue-50 text-blue-600">

                                <WalletCards size={36} />

                            </div>

                            {/* EMPTY TITLE */}
                            <h2 className="mt-6 text-xl font-bold text-slate-900">
                                No Transactions Yet
                            </h2>

                            {/* EMPTY DESCRIPTION */}
                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Your completed and pending transactions
                                will appear here.
                            </p>

                            {/* FIRST PAYMENT */}
                            <Button
                                type="button"
                                onClick={() => navigate("/send-money")}
                                className="mt-6 w-full sm:w-auto"
                            >

                                <span className="flex items-center justify-center gap-2">

                                    <Send size={18} />

                                    Send Your First Payment

                                </span>

                            </Button>

                        </div>

                    </Card>

                )}


            {/* ========================================= */}
            {/* TRANSACTION LIST */}
            {/* ========================================= */}

            {!loading &&
                !error &&
                transactions.length > 0 && (

                    <section className="space-y-3">

                        {/* DESKTOP TABLE HEADER */}
                        <div className="hidden rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 lg:grid lg:grid-cols-[1.5fr_1.2fr_1fr_1fr_40px] lg:items-center lg:gap-4">

                            <span>
                                Transaction
                            </span>

                            <span>
                                Account
                            </span>

                            <span>
                                Date
                            </span>

                            <span>
                                Amount
                            </span>

                            <span />

                        </div>


                        {/* TRANSACTIONS */}
                        {transactions.map((transaction) => {

                            // Determine transaction direction.
                            const type =
                                getTransactionType(transaction)

                            // Select direction icon.
                            const Icon =
                                getTransactionIcon(transaction)

                            // Select status icon.
                            const StatusIcon =
                                getStatusIcon(transaction.status)

                            // Select direction styling.
                            const typeClasses =
                                getTypeClasses(type)


                            return (

                                <button
                                    type="button"
                                    key={transaction._id}
                                    onClick={() =>
                                        openTransaction(
                                            transaction._id
                                        )
                                    }
                                    className="group w-full text-left"
                                >

                                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40 sm:p-5">

                                        {/* ================================= */}
                                        {/* MOBILE / TABLET */}
                                        {/* ================================= */}

                                        <div className="lg:hidden">

                                            {/* TOP ROW */}
                                            <div className="flex items-start justify-between gap-4">

                                                {/* TRANSACTION INFORMATION */}
                                                <div className="flex min-w-0 items-center gap-3">

                                                    <div
                                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${typeClasses.container} transition-transform duration-300 group-hover:scale-105`}
                                                    >

                                                        <Icon size={20} />

                                                    </div>


                                                    <div className="min-w-0">

                                                        <p className="text-sm font-bold text-slate-900">

                                                            {type === "CREDIT"
                                                                ? "Money Received"
                                                                : "Money Sent"}

                                                        </p>

                                                        <p className="mt-1 font-mono text-xs text-slate-400">

                                                            {getShortId(
                                                                transaction._id
                                                            )}

                                                        </p>

                                                    </div>

                                                </div>


                                                {/* AMOUNT */}
                                                <p
                                                    className={`shrink-0 text-sm font-bold sm:text-base ${typeClasses.amount}`}
                                                >

                                                    {type === "CREDIT"
                                                        ? "+"
                                                        : "-"}

                                                    {formatAmount(
                                                        transaction.amount
                                                    )}

                                                </p>

                                            </div>


                                            {/* STATUS + DATE */}
                                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">

                                                {/* STATUS */}
                                                <div>

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        Status
                                                    </p>

                                                    <div className="mt-2">

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStatusClasses(
                                                                transaction.status
                                                            )}`}
                                                        >

                                                            <StatusIcon size={12} />

                                                            {transaction.status}

                                                        </span>

                                                    </div>

                                                </div>


                                                {/* DATE */}
                                                <div className="text-right">

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        Date
                                                    </p>

                                                    <p className="mt-2 text-xs font-semibold text-slate-700">
                                                        {formatDate(
                                                            transaction.createdAt
                                                        )}
                                                    </p>

                                                    <p className="mt-0.5 text-[11px] text-slate-400">
                                                        {formatTime(
                                                            transaction.createdAt
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* OTHER ACCOUNT */}
                                            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">

                                                <div className="flex min-w-0 items-center gap-2">

                                                    <WalletCards
                                                        size={15}
                                                        className="shrink-0 text-slate-400"
                                                    />

                                                    <span className="truncate text-xs text-slate-500">

                                                        {type === "CREDIT"
                                                            ? "From"
                                                            : "To"}

                                                        :{" "}

                                                        <span className="font-mono font-medium text-slate-600">

                                                            {getShortId(
                                                                getOtherAccount(
                                                                    transaction
                                                                )
                                                            )}

                                                        </span>

                                                    </span>

                                                </div>


                                                {/* DETAILS INDICATOR */}
                                                <Eye
                                                    size={16}
                                                    className="shrink-0 text-slate-400 transition-colors group-hover:text-blue-600"
                                                />

                                            </div>

                                        </div>


                                        {/* ================================= */}
                                        {/* DESKTOP */}
                                        {/* ================================= */}

                                        <div className="hidden lg:grid lg:grid-cols-[1.5fr_1.2fr_1fr_1fr_40px] lg:items-center lg:gap-4">

                                            {/* TRANSACTION */}
                                            <div className="flex min-w-0 items-center gap-3">

                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${typeClasses.container}`}
                                                >

                                                    <Icon size={20} />

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="truncate text-sm font-bold text-slate-900">

                                                        {type === "CREDIT"
                                                            ? "Money Received"
                                                            : "Money Sent"}

                                                    </p>

                                                    <p className="mt-1 font-mono text-xs text-slate-400">

                                                        {getShortId(
                                                            transaction._id
                                                        )}

                                                    </p>

                                                </div>

                                            </div>


                                            {/* OTHER ACCOUNT */}
                                            <div className="min-w-0">

                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">

                                                    {type === "CREDIT"
                                                        ? "From"
                                                        : "To"}

                                                </p>

                                                <p className="mt-1 truncate font-mono text-xs font-semibold text-slate-600">

                                                    {getShortId(
                                                        getOtherAccount(
                                                            transaction
                                                        )
                                                    )}

                                                </p>

                                            </div>


                                            {/* DATE */}
                                            <div>

                                                <p className="text-sm font-semibold text-slate-700">
                                                    {formatDate(
                                                        transaction.createdAt
                                                    )}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {formatTime(
                                                        transaction.createdAt
                                                    )}
                                                </p>

                                            </div>


                                            {/* AMOUNT + STATUS */}
                                            <div>

                                                <p
                                                    className={`text-sm font-bold ${typeClasses.amount}`}
                                                >

                                                    {type === "CREDIT"
                                                        ? "+"
                                                        : "-"}

                                                    {formatAmount(
                                                        transaction.amount
                                                    )}

                                                </p>


                                                <span
                                                    className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${getStatusClasses(
                                                        transaction.status
                                                    )}`}
                                                >

                                                    <StatusIcon size={11} />

                                                    {transaction.status}

                                                </span>

                                            </div>


                                            {/* VIEW INDICATOR */}
                                            <Eye
                                                size={18}
                                                className="text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-600"
                                            />

                                        </div>

                                    </div>

                                </button>

                            )
                        })}

                    </section>

                )}

        </div>
    )
}


export default UserTransactions