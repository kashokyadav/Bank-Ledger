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
    CalendarDays,
    Hash,
    ShieldCheck,
    AlertCircle,
    Send,
    WalletCards,
    RefreshCw,
} from "lucide-react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"

import {
    getTransactionById,
} from "../../services/user.service"


function TransactionDetails() {

    // --------------------------------------------------
    // ROUTER
    // --------------------------------------------------

    const navigate = useNavigate()
    const { id } = useParams()


    // --------------------------------------------------
    // STATE
    // --------------------------------------------------

    const [transaction, setTransaction] = useState(null)

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")

    const [copied, setCopied] = useState(false)


    // --------------------------------------------------
    // LOAD TRANSACTION
    // --------------------------------------------------

    async function loadTransaction() {

        try {

            // Show loading state while API request is running.
            setLoading(true)

            // Clear previous error.
            setError("")


            // Get transaction details from backend.
            const data = await getTransactionById(id)


            // Store transaction data.
            setTransaction(data.transaction)


        } catch (error) {

            // Log API error for development/debugging.
            console.error(
                "Transaction Details Error:",
                error.response?.data || error.message
            )


            // Show backend error message when available.
            setError(
                error.response?.data?.message ||
                "Failed to load transaction details."
            )

        } finally {

            // Stop loading state.
            setLoading(false)

        }
    }


    // --------------------------------------------------
    // LOAD WHEN ID CHANGES
    // --------------------------------------------------

    useEffect(() => {

        // Only call API when transaction ID exists.
        if (id) {
            loadTransaction()
        }

    }, [id])


    // --------------------------------------------------
    // FORMAT AMOUNT
    // --------------------------------------------------

    function formatAmount(amount) {

        // Format amount using Indian Rupee format.
        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(amount || 0)

    }


    // --------------------------------------------------
    // FORMAT DATE
    // --------------------------------------------------

    function formatDate(date) {

        // Handle missing date.
        if (!date) {
            return "N/A"
        }


        // Convert date into readable Indian format.
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


    // --------------------------------------------------
    // FORMAT TIME
    // --------------------------------------------------

    function formatTime(date) {

        // Handle missing date.
        if (!date) {
            return "N/A"
        }


        // Convert time into readable format.
        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }
        )

    }


    // --------------------------------------------------
    // TRANSACTION TYPE
    // --------------------------------------------------

    function getTransactionType(transaction) {

        // Default transaction type.
        if (!transaction) {
            return "TRANSFER"
        }


        // Use backend transaction type when available.
        if (transaction.type) {
            return transaction.type
        }


        // Default fallback.
        return "TRANSFER"

    }


    // --------------------------------------------------
    // STATUS ICON
    // --------------------------------------------------

    function getStatusIcon(status) {

        // Select icon based on transaction status.
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


    // --------------------------------------------------
    // STATUS COLOR
    // --------------------------------------------------

    function getStatusClasses(status) {

        // Select colors based on transaction status.
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


    // --------------------------------------------------
    // STATUS DESCRIPTION
    // --------------------------------------------------

    function getStatusDescription(status) {

        // Display helpful status information.
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


    // --------------------------------------------------
    // COPY TRANSACTION ID
    // --------------------------------------------------

    async function copyTransactionId() {

        // Stop if transaction ID does not exist.
        if (!transaction?._id) {
            return
        }


        try {

            // Copy transaction ID to clipboard.
            await navigator.clipboard.writeText(
                transaction._id
            )


            // Show copied state.
            setCopied(true)


            // Reset copied state after 2 seconds.
            setTimeout(() => {
                setCopied(false)
            }, 2000)

        } catch (error) {

            // Log clipboard error.
            console.error(
                "Copy failed:",
                error
            )

        }
    }


    // --------------------------------------------------
    // GET ACCOUNT ID
    // --------------------------------------------------

    function getAccountId(account) {

        // Handle missing account.
        if (!account) {
            return "N/A"
        }


        // Account can be returned directly as a string.
        if (typeof account === "string") {
            return account
        }


        // Account can also be returned as an object.
        return account._id || "N/A"

    }


    // --------------------------------------------------
    // GET ACCOUNT NAME
    // --------------------------------------------------

    function getAccountName(account) {

        // Handle missing account.
        if (!account) {
            return ""
        }


        // Get user name/email when account is populated.
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


    // --------------------------------------------------
    // LOADING STATE
    // --------------------------------------------------

    if (loading) {

        return (

            <div className="w-full space-y-5 sm:space-y-6">

                {/* Back button skeleton */}
                <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />


                {/* Main hero skeleton */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="h-[330px] animate-pulse bg-slate-200" />

                    <div className="grid grid-cols-1 sm:grid-cols-3">

                        <div className="h-24 animate-pulse border-b border-slate-100 bg-white sm:border-b-0 sm:border-r" />

                        <div className="h-24 animate-pulse border-b border-slate-100 bg-white sm:border-b-0 sm:border-r" />

                        <div className="h-24 animate-pulse bg-white" />

                    </div>

                </div>


                {/* Account skeletons */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-200" />

                    <div className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-slate-200" />

                </div>


                {/* Information skeleton */}
                <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-200" />

            </div>

        )
    }


    // --------------------------------------------------
    // ERROR STATE
    // --------------------------------------------------

    if (error || !transaction) {

        return (

            <div className="w-full space-y-5 sm:space-y-6">

                {/* Back navigation */}
                <button
                    type="button"
                    onClick={() => navigate("/transactions")}
                    className="group flex min-h-10 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
                >

                    <ArrowLeft
                        size={18}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    />

                    Back to Transactions

                </button>


                {/* Error card */}
                <Card>

                    <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:py-16">

                        {/* Error icon */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-100 bg-red-50 text-red-600">

                            <AlertCircle size={36} />

                        </div>


                        <h2 className="mt-6 text-xl font-bold text-slate-900">
                            Transaction Not Found
                        </h2>


                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {error ||
                                "We could not find this transaction."}
                        </p>


                        {/* Error actions */}
                        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

                            <Button
                                type="button"
                                onClick={loadTransaction}
                                variant="secondary"
                                className="w-full sm:w-auto"
                            >

                                <span className="flex items-center justify-center gap-2">

                                    <RefreshCw size={16} />

                                    Try Again

                                </span>

                            </Button>


                            <Button
                                type="button"
                                onClick={() => navigate("/transactions")}
                                className="w-full sm:w-auto"
                            >

                                Back to Transactions

                            </Button>

                        </div>

                    </div>

                </Card>

            </div>

        )
    }


    // --------------------------------------------------
    // TRANSACTION DATA
    // --------------------------------------------------

    const status =
        transaction.status || "PENDING"


    const StatusIcon =
        getStatusIcon(status)


    const transactionType =
        getTransactionType(transaction)


    // Check whether this is a credit transaction.
    const isCredit =
        transactionType === "CREDIT"


    // Select amount color.
    const amountColor =
        isCredit
            ? "text-emerald-600"
            : "text-red-600"


    // Select amount prefix.
    const amountPrefix =
        isCredit
            ? "+"
            : "-"


    // Get sender account ID.
    const fromAccount =
        getAccountId(
            transaction.fromAccount
        )


    // Get receiver account ID.
    const toAccount =
        getAccountId(
            transaction.toAccount
        )


    // --------------------------------------------------
    // MAIN UI
    // --------------------------------------------------

    return (

        <div className="w-full space-y-5 sm:space-y-6 lg:space-y-7">

            {/* ========================================= */}
            {/* BACK NAVIGATION */}
            {/* ========================================= */}

            <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="group flex min-h-10 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-slate-500 transition-colors duration-200 hover:text-blue-600"
            >

                <ArrowLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                />

                Back to Transactions

            </button>


            {/* ========================================= */}
            {/* TRANSACTION HERO */}
            {/* ========================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

                {/* Hero header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">

                    {/* Decorative background circle */}
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                    {/* Decorative background circle */}
                    <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/5" />


                    {/* Hero content */}
                    <div className="relative flex flex-col items-center text-center">

                        {/* Transaction direction icon */}
                        <div
                            className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 backdrop-blur sm:h-20 sm:w-20 ${
                                isCredit
                                    ? "bg-emerald-400/20 text-emerald-200"
                                    : "bg-red-400/20 text-red-200"
                            }`}
                        >

                            {isCredit ? (
                                <ArrowDownLeft size={34} />
                            ) : (
                                <ArrowUpRight size={34} />
                            )}

                        </div>


                        {/* Transaction label */}
                        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-xs">

                            {isCredit
                                ? "Money Received"
                                : "Money Sent"}

                        </p>


                        {/* Transaction amount */}
                        <h1 className="mt-2 break-words text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">

                            <span
                                className={
                                    isCredit
                                        ? "text-emerald-300"
                                        : "text-white"
                                }
                            >
                                {amountPrefix}
                            </span>

                            {formatAmount(
                                transaction.amount
                            )}

                        </h1>


                        {/* Status badge */}
                        <div className="mt-5">

                            <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                                    status
                                )}`}
                            >

                                <StatusIcon size={14} />

                                {status}

                            </span>

                        </div>


                        {/* Status description */}
                        <p className="mt-4 max-w-lg text-sm leading-6 text-blue-100">

                            {getStatusDescription(status)}

                        </p>

                    </div>

                </div>


                {/* Hero summary */}
                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                    {/* Transaction type */}
                    <div className="p-5 text-center sm:p-6">

                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Transaction Type
                        </p>

                        <p className="mt-2 text-sm font-bold text-slate-800">
                            {transactionType}
                        </p>

                    </div>


                    {/* Date */}
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


                    {/* Time */}
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


            {/* ========================================= */}
            {/* FROM / TO ACCOUNTS */}
            {/* ========================================= */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* FROM ACCOUNT */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">

                    <div className="flex items-center gap-3">

                        {/* Icon */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600">

                            <ArrowUpRight size={20} />

                        </div>


                        <div className="min-w-0">

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                From Account
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-800">
                                Sender
                            </p>

                        </div>

                    </div>


                    {/* Account information */}
                    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">

                        {getAccountName(
                            transaction.fromAccount
                        ) && (

                            <p className="mb-2 break-words text-sm font-semibold text-slate-700">

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


                {/* TO ACCOUNT */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">

                    <div className="flex items-center gap-3">

                        {/* Icon */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">

                            <ArrowDownLeft size={20} />

                        </div>


                        <div className="min-w-0">

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                To Account
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-800">
                                Receiver
                            </p>

                        </div>

                    </div>


                    {/* Account information */}
                    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">

                        {getAccountName(
                            transaction.toAccount
                        ) && (

                            <p className="mb-2 break-words text-sm font-semibold text-slate-700">

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


            {/* ========================================= */}
            {/* TRANSACTION INFORMATION */}
            {/* ========================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Section header */}
                <div className="border-b border-slate-100 p-5 sm:p-6">

                    <div className="flex items-center gap-3">

                        {/* Security icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">

                            <ShieldCheck size={19} />

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


                {/* Information rows */}
                <div className="divide-y divide-slate-100">

                    {/* TRANSACTION ID */}
                    <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                        <div className="flex min-w-0 items-start gap-3">

                            <Hash
                                size={18}
                                className="mt-0.5 shrink-0 text-slate-400"
                            />

                            <div className="min-w-0">

                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Transaction ID
                                </p>

                                <p className="mt-1 break-all font-mono text-sm font-semibold leading-6 text-slate-700">
                                    {transaction._id}
                                </p>

                            </div>

                        </div>


                        {/* Copy button */}
                        <button
                            type="button"
                            onClick={copyTransactionId}
                            className="flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
                        >

                            <Copy size={15} />

                            {copied
                                ? "Copied"
                                : "Copy ID"}

                        </button>

                    </div>


                    {/* CREATED DATE */}
                    <div className="flex items-start gap-3 p-5 sm:p-6">

                        <CalendarDays
                            size={18}
                            className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Created
                            </p>

                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-700">

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


                    {/* AMOUNT */}
                    <div className="flex items-start gap-3 p-5 sm:p-6">

                        <WalletCards
                            size={18}
                            className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Amount
                            </p>

                            <p
                                className={`mt-1 text-lg font-bold ${amountColor}`}
                            >

                                {amountPrefix}

                                {formatAmount(
                                    transaction.amount
                                )}

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ========================================= */}
            {/* ACTIONS */}
            {/* ========================================= */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                {/* Back button */}
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/transactions")}
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <ArrowLeft size={17} />

                        All Transactions

                    </span>

                </Button>


                {/* Send money button */}
                <Button
                    type="button"
                    onClick={() => navigate("/send-money")}
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <Send size={17} />

                        Send Money

                    </span>

                </Button>

            </div>

        </div>
    )
}


export default TransactionDetails