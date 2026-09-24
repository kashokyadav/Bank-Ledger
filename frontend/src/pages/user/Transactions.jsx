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
} from "lucide-react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"

import { getMyTransactions } from "../../services/user.service"


function UserTransactions() {

    const navigate = useNavigate()

    const [transactions, setTransactions] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    async function loadTransactions() {

        try {

            setLoading(true)

            setError("")

            const data = await getMyTransactions()

            console.log(
                "TRANSACTIONS API:",
                data
            )

            setTransactions(
                data.transactions || []
            )

        } catch (error) {

            console.error(
                "Transactions API Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Failed to load transactions."
            )

        } finally {

            setLoading(false)

        }
    }


    useEffect(() => {

        loadTransactions()

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


    function getTransactionType(transaction) {

        const userAccountId =
            transaction.userAccountId ||
            transaction.accountId

        if (
            userAccountId &&
            String(transaction.fromAccount?._id) ===
            String(userAccountId)
        ) {
            return "DEBIT"
        }

        if (
            userAccountId &&
            String(transaction.toAccount?._id) ===
            String(userAccountId)
        ) {
            return "CREDIT"
        }

        return transaction.type || "TRANSFER"

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


    function getStatusIcon(status) {

        switch (status) {

            case "COMPLETED":
                return CheckCircle2

            case "FAILED":
                return XCircle

            case "REVERSED":
                return RotateCcw

            case "PENDING":
                return Clock3

            default:
                return Clock3

        }

    }


    function getStatusClasses(status) {

        switch (status) {

            case "COMPLETED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200"

            case "FAILED":
                return "bg-red-50 text-red-700 border-red-200"

            case "REVERSED":
                return "bg-orange-50 text-orange-700 border-orange-200"

            case "PENDING":
                return "bg-yellow-50 text-yellow-700 border-yellow-200"

            default:
                return "bg-slate-50 text-slate-600 border-slate-200"

        }

    }


    function getTypeClasses(type) {

        if (type === "CREDIT") {

            return {
                container:
                    "bg-emerald-50 text-emerald-600",
                amount:
                    "text-emerald-600",
            }

        }

        return {
            container:
                "bg-red-50 text-red-600",
            amount:
                "text-red-600",
        }

    }


    function getOtherAccount(transaction) {

        const type =
            getTransactionType(transaction)

        if (type === "CREDIT") {

            return (
                transaction.fromAccount?._id ||
                transaction.fromAccount ||
                "System"
            )

        }

        return (
            transaction.toAccount?._id ||
            transaction.toAccount ||
            "Unknown"
        )

    }


    function getShortId(id) {

        if (!id) {
            return "N/A"
        }

        const value = String(id)

        return `${value.slice(0, 8)}...${value.slice(-6)}`

    }


    function openTransaction(transactionId) {

        navigate(
            `/transactions/${transactionId}`
        )

    }


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm sm:h-12 sm:w-12">

                        <ArrowLeftRight
                            size={22}
                        />

                    </div>


                    <div className="min-w-0">

                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            Transactions
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View and manage your transaction history.
                        </p>

                    </div>

                </div>


                <Button
                    type="button"
                    onClick={() => navigate("/send-money")}
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <Send
                            size={18}
                        />

                        Send Money

                    </span>

                </Button>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && !loading && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div>

                        <p className="text-sm font-semibold text-red-700">
                            Unable to load transactions
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* SUMMARY */}
            {/* ================================= */}

            {!loading && !error && (

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Total
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                                <ArrowLeftRight
                                    size={17}
                                />

                            </div>

                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-800">
                            {transactions.length}
                        </p>

                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Completed
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <CheckCircle2
                                    size={17}
                                />

                            </div>

                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-800">

                            {
                                transactions.filter(
                                    (transaction) =>
                                        transaction.status ===
                                        "COMPLETED"
                                ).length
                            }

                        </p>

                    </div>


                    <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:col-span-1 sm:p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Pending
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">

                                <Clock3
                                    size={17}
                                />

                            </div>

                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-800">

                            {
                                transactions.filter(
                                    (transaction) =>
                                        transaction.status ===
                                        "PENDING"
                                ).length
                            }

                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {loading && (

                <div className="space-y-3">

                    {[1, 2, 3, 4, 5].map(
                        (item) => (

                            <div
                                key={item}
                                className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white"
                            />

                        )
                    )}

                </div>

            )}


            {/* ================================= */}
            {/* EMPTY */}
            {/* ================================= */}

            {!loading &&
                !error &&
                transactions.length === 0 && (

                    <Card>

                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:px-8 sm:py-16">

                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">

                                <WalletCards
                                    size={36}
                                />

                            </div>


                            <h2 className="mt-6 text-xl font-bold text-slate-800">
                                No Transactions Yet
                            </h2>


                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Your completed and pending transactions
                                will appear here.
                            </p>


                            <Button
                                type="button"
                                onClick={() =>
                                    navigate("/send-money")
                                }
                                className="mt-6 w-full sm:w-auto"
                            >

                                <span className="flex items-center justify-center gap-2">

                                    <Send
                                        size={18}
                                    />

                                    Send Your First Payment

                                </span>

                            </Button>

                        </div>

                    </Card>

                )}


            {/* ================================= */}
            {/* TRANSACTIONS */}
            {/* ================================= */}

            {!loading &&
                !error &&
                transactions.length > 0 && (

                    <div className="space-y-3">


                        {/* DESKTOP HEADER */}

                        <div className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 lg:grid lg:grid-cols-[1.5fr_1.2fr_1fr_1fr_40px] lg:items-center lg:gap-4">

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


                        {transactions.map(
                            (transaction) => {

                                const type =
                                    getTransactionType(
                                        transaction
                                    )

                                const Icon =
                                    getTransactionIcon(
                                        transaction
                                    )

                                const StatusIcon =
                                    getStatusIcon(
                                        transaction.status
                                    )

                                const typeClasses =
                                    getTypeClasses(
                                        type
                                    )

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

                                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40 sm:p-5">


                                            {/* MOBILE / TABLET */}

                                            <div className="lg:hidden">


                                                <div className="flex items-start justify-between gap-4">


                                                    <div className="flex min-w-0 items-center gap-3">

                                                        <div
                                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${typeClasses.container} transition-transform duration-300 group-hover:scale-105`}
                                                        >

                                                            <Icon
                                                                size={20}
                                                            />

                                                        </div>


                                                        <div className="min-w-0">

                                                            <p className="text-sm font-bold text-slate-800">

                                                                {type ===
                                                                "CREDIT"
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


                                                    <p
                                                        className={`shrink-0 text-sm font-bold sm:text-base ${typeClasses.amount}`}
                                                    >

                                                        {type ===
                                                        "CREDIT"
                                                            ? "+"
                                                            : "-"}

                                                        {formatAmount(
                                                            transaction.amount
                                                        )}

                                                    </p>

                                                </div>


                                                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">


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

                                                                <StatusIcon
                                                                    size={12}
                                                                />

                                                                {
                                                                    transaction.status
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>


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


                                                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">

                                                    <div className="flex min-w-0 items-center gap-2">

                                                        <WalletCards
                                                            size={15}
                                                            className="shrink-0 text-slate-400"
                                                        />

                                                        <span className="truncate text-xs text-slate-500">

                                                            {type ===
                                                            "CREDIT"
                                                                ? "From"
                                                                : "To"}

                                                            :{" "}

                                                            <span className="font-mono">
                                                                {getShortId(
                                                                    getOtherAccount(
                                                                        transaction
                                                                    )
                                                                )}
                                                            </span>

                                                        </span>

                                                    </div>


                                                    <Eye
                                                        size={16}
                                                        className="shrink-0 text-slate-400 transition-colors group-hover:text-blue-600"
                                                    />

                                                </div>

                                            </div>


                                            {/* DESKTOP */}

                                            <div className="hidden lg:grid lg:grid-cols-[1.5fr_1.2fr_1fr_1fr_40px] lg:items-center lg:gap-4">


                                                <div className="flex min-w-0 items-center gap-3">

                                                    <div
                                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${typeClasses.container}`}
                                                    >

                                                        <Icon
                                                            size={20}
                                                        />

                                                    </div>


                                                    <div className="min-w-0">

                                                        <p className="truncate text-sm font-bold text-slate-800">

                                                            {type ===
                                                            "CREDIT"
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


                                                <div className="min-w-0">

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">

                                                        {type ===
                                                        "CREDIT"
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


                                                <div>

                                                    <p
                                                        className={`text-sm font-bold ${typeClasses.amount}`}
                                                    >

                                                        {type ===
                                                        "CREDIT"
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

                                                        <StatusIcon
                                                            size={11}
                                                        />

                                                        {
                                                            transaction.status
                                                        }

                                                    </span>

                                                </div>


                                                <Eye
                                                    size={18}
                                                    className="text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-600"
                                                />

                                            </div>

                                        </div>

                                    </button>

                                )

                            }
                        )}

                    </div>

                )}

        </div>
    )
}


export default UserTransactions