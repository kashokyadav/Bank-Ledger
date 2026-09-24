import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
    ArrowLeft,
    ArrowDownLeft,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    XCircle,
    RotateCcw,
    Copy,
    WalletCards,
    CalendarDays,
    Hash,
    ShieldCheck,
    AlertCircle,
    Send,
} from "lucide-react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"

import {
    getTransactionById,
} from "../../services/user.service"


function TransactionDetails() {

    const navigate = useNavigate()

    const { id } = useParams()

    const [transaction, setTransaction] = useState(null)

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    const [copied, setCopied] = useState(false)


    async function loadTransaction() {

        try {

            setLoading(true)

            setError("")

            const data =
                await getTransactionById(id)

            console.log(
                "TRANSACTION DETAILS API:",
                data
            )

            setTransaction(
                data.transaction
            )

        } catch (error) {

            console.error(
                "Transaction Details Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Failed to load transaction details."
            )

        } finally {

            setLoading(false)

        }
    }


    useEffect(() => {

        if (id) {
            loadTransaction()
        }

    }, [id])


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
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        )

    }


    function formatTime(date) {

        if (!date) {
            return "N/A"
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }
        )

    }


    function getTransactionType(transaction) {

        if (!transaction) {
            return "TRANSFER"
        }

        if (transaction.type) {
            return transaction.type
        }

        return "TRANSFER"

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
                return "border-emerald-200 bg-emerald-50 text-emerald-700"

            case "FAILED":
                return "border-red-200 bg-red-50 text-red-700"

            case "REVERSED":
                return "border-orange-200 bg-orange-50 text-orange-700"

            case "PENDING":
                return "border-yellow-200 bg-yellow-50 text-yellow-700"

            default:
                return "border-slate-200 bg-slate-50 text-slate-600"

        }

    }


    function getStatusDescription(status) {

        switch (status) {

            case "COMPLETED":
                return "This transaction has been completed successfully."

            case "PENDING":
                return "This transaction is currently being processed."

            case "FAILED":
                return "This transaction was not completed."

            case "REVERSED":
                return "This transaction has been reversed."

            default:
                return "Transaction status information."

        }

    }


    async function copyTransactionId() {

        if (!transaction?._id) {
            return
        }

        try {

            await navigator.clipboard.writeText(
                transaction._id
            )

            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            )

        }
    }


    function getAccountId(account) {

        if (!account) {
            return "N/A"
        }

        if (typeof account === "string") {
            return account
        }

        return account._id || "N/A"

    }


    function getAccountName(account) {

        if (!account) {
            return ""
        }

        if (
            typeof account === "object" &&
            account.user
        ) {

            return (
                account.user.name ||
                account.user.email ||
                ""
            )

        }

        return ""

    }


    if (loading) {

        return (

            <div className="space-y-6 sm:space-y-7">

                <div className="h-8 w-36 animate-pulse rounded-lg bg-slate-200" />

                <div className="h-[330px] animate-pulse rounded-3xl bg-slate-200" />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />

                    <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />

                </div>

            </div>

        )

    }


    if (error || !transaction) {

        return (

            <div className="space-y-6">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/transactions")
                    }
                    className="group flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
                >

                    <ArrowLeft
                        size={18}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    />

                    Back to Transactions

                </button>


                <Card>

                    <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:py-16">

                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600">

                            <AlertCircle
                                size={36}
                            />

                        </div>


                        <h2 className="mt-6 text-xl font-bold text-slate-800">
                            Transaction Not Found
                        </h2>


                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {error ||
                                "We could not find this transaction."}
                        </p>


                        <Button
                            type="button"
                            onClick={() =>
                                navigate("/transactions")
                            }
                            className="mt-6"
                        >
                            Back to Transactions
                        </Button>

                    </div>

                </Card>

            </div>

        )
    }


    const status =
        transaction.status || "PENDING"

    const StatusIcon =
        getStatusIcon(status)

    const transactionType =
        getTransactionType(transaction)

    const isCredit =
        transactionType === "CREDIT"

    const amountColor =
        isCredit
            ? "text-emerald-600"
            : "text-red-600"

    const amountPrefix =
        isCredit ? "+" : "-"


    const fromAccount =
        getAccountId(
            transaction.fromAccount
        )

    const toAccount =
        getAccountId(
            transaction.toAccount
        )


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* BACK */}
            {/* ================================= */}

            <button
                type="button"
                onClick={() =>
                    navigate("/transactions")
                }
                className="group flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-blue-600"
            >

                <ArrowLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                />

                Back to Transactions

            </button>


            {/* ================================= */}
            {/* HERO */}
            {/* ================================= */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


                {/* Hero Header */}

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10">


                    {/* Decorative shapes */}

                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                    <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/5" />


                    <div className="relative flex flex-col items-center text-center">


                        {/* Transaction icon */}

                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur sm:h-20 sm:w-20 ${
                            isCredit
                                ? "bg-emerald-400/20 text-emerald-200"
                                : "bg-red-400/20 text-red-200"
                        }`}>

                            {isCredit ? (

                                <ArrowDownLeft
                                    size={34}
                                />

                            ) : (

                                <ArrowUpRight
                                    size={34}
                                />

                            )}

                        </div>


                        {/* Type */}

                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">

                            {isCredit
                                ? "Money Received"
                                : "Money Sent"}

                        </p>


                        {/* Amount */}

                        <h1 className="mt-2 break-words text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">

                            <span className={
                                isCredit
                                    ? "text-emerald-300"
                                    : "text-white"
                            }>

                                {amountPrefix}

                            </span>

                            {formatAmount(
                                transaction.amount
                            )}

                        </h1>


                        {/* Status */}

                        <div className="mt-5">

                            <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                                    status
                                )}`}
                            >

                                <StatusIcon
                                    size={14}
                                />

                                {status}

                            </span>

                        </div>


                        <p className="mt-4 max-w-lg text-sm leading-6 text-blue-100">

                            {getStatusDescription(
                                status
                            )}

                        </p>

                    </div>

                </div>


                {/* Hero Bottom */}

                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">


                    <div className="p-5 text-center sm:p-6">

                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Transaction Type
                        </p>

                        <p className="mt-2 text-sm font-bold text-slate-800">
                            {transactionType}
                        </p>

                    </div>


                    <div className="p-5 text-center sm:p-6">

                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Date
                        </p>

                        <p className="mt-2 text-sm font-bold text-slate-800">
                            {formatDate(
                                transaction.createdAt
                            )}
                        </p>

                    </div>


                    <div className="p-5 text-center sm:p-6">

                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Time
                        </p>

                        <p className="mt-2 text-sm font-bold text-slate-800">
                            {formatTime(
                                transaction.createdAt
                            )}
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* ACCOUNTS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                {/* FROM */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">

                            <ArrowUpRight
                                size={20}
                            />

                        </div>

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                From Account
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-800">
                                Sender
                            </p>

                        </div>

                    </div>


                    <div className="mt-5 rounded-xl bg-slate-50 p-4">

                        {getAccountName(
                            transaction.fromAccount
                        ) && (

                            <p className="mb-2 text-sm font-semibold text-slate-700">

                                {getAccountName(
                                    transaction.fromAccount
                                )}

                            </p>

                        )}

                        <p className="break-all font-mono text-xs leading-5 text-slate-500">
                            {fromAccount}
                        </p>

                    </div>

                </div>


                {/* TO */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                            <ArrowDownLeft
                                size={20}
                            />

                        </div>

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                To Account
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-800">
                                Receiver
                            </p>

                        </div>

                    </div>


                    <div className="mt-5 rounded-xl bg-slate-50 p-4">

                        {getAccountName(
                            transaction.toAccount
                        ) && (

                            <p className="mb-2 text-sm font-semibold text-slate-700">

                                {getAccountName(
                                    transaction.toAccount
                                )}

                            </p>

                        )}

                        <p className="break-all font-mono text-xs leading-5 text-slate-500">
                            {toAccount}
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* TRANSACTION INFORMATION */}
            {/* ================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">


                <div className="border-b border-slate-100 p-5 sm:p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                            <ShieldCheck
                                size={19}
                            />

                        </div>

                        <div>

                            <h2 className="text-base font-bold text-slate-800">
                                Transaction Information
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Complete transaction reference details
                            </p>

                        </div>

                    </div>

                </div>


                <div className="divide-y divide-slate-100">


                    {/* Transaction ID */}

                    <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                        <div className="flex items-center gap-3">

                            <Hash
                                size={18}
                                className="shrink-0 text-slate-400"
                            />

                            <div>

                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Transaction ID
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {transaction._id}
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={copyTransactionId}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
                        >

                            <Copy
                                size={15}
                            />

                            {copied
                                ? "Copied"
                                : "Copy ID"}

                        </button>

                    </div>


                    {/* Date */}

                    <div className="flex items-center gap-3 p-5 sm:p-6">

                        <CalendarDays
                            size={18}
                            className="shrink-0 text-slate-400"
                        />

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Created
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-700">

                                {formatDate(
                                    transaction.createdAt
                                )}

                                {" • "}

                                {formatTime(
                                    transaction.createdAt
                                )}

                            </p>

                        </div>

                    </div>


                    {/* Amount */}

                    <div className="flex items-center gap-3 p-5 sm:p-6">

                        <WalletCards
                            size={18}
                            className="shrink-0 text-slate-400"
                        />

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Amount
                            </p>

                            <p className={`mt-1 text-lg font-bold ${amountColor}`}>

                                {amountPrefix}

                                {formatAmount(
                                    transaction.amount
                                )}

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* ACTIONS */}
            {/* ================================= */}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">

                <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                        navigate("/transactions")
                    }
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <ArrowLeft
                            size={17}
                        />

                        All Transactions

                    </span>

                </Button>


                <Button
                    type="button"
                    onClick={() =>
                        navigate("/send-money")
                    }
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <Send
                            size={17}
                        />

                        Send Money

                    </span>

                </Button>

            </div>

        </div>
    )
}


export default TransactionDetails