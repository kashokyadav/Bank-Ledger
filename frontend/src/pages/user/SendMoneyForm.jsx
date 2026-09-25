import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
    ArrowLeft,
    Send,
    WalletCards,
    UserRound,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    Loader2,
    IndianRupee,
    RefreshCw,
} from "lucide-react"

import Button from "../../components/common/Button"

import {
    getRecipientAccounts,
    createTransaction,
} from "../../services/user.service"


function SendMoneyForm() {

    const navigate = useNavigate()

    // Get the recipient account ID from the URL.
    const { accountId } = useParams()


    // =========================================
    // PAGE STATE
    // =========================================

    // Stores the selected recipient.
    const [recipient, setRecipient] = useState(null)

    // Stores the transfer amount.
    const [amount, setAmount] = useState("")

    // Controls recipient loading.
    const [loading, setLoading] = useState(true)

    // Controls transfer processing.
    const [sending, setSending] = useState(false)

    // Stores error messages.
    const [error, setError] = useState("")

    // Stores successful transfer messages.
    const [success, setSuccess] = useState("")


    // =========================================
    // LOAD RECIPIENT
    // =========================================

    async function loadRecipient() {

        try {

            // Start loading.
            setLoading(true)

            // Clear previous error.
            setError("")

            // Load available recipient accounts.
            const data = await getRecipientAccounts()

            // Support both backend response names.
            const accounts =
                data.accounts ||
                data.recipients ||
                []

            // Find the account selected from the URL.
            const selected =
                accounts.find(
                    (account) =>
                        String(account._id) ===
                        String(accountId)
                )

            // Handle invalid recipient ID.
            if (!selected) {

                setError(
                    "Recipient account could not be found."
                )

                return
            }

            // Store selected recipient.
            setRecipient(selected)

        } catch (error) {

            // Log backend information for debugging.
            console.error(
                "Recipient Error:",
                error.response?.data ||
                error.message
            )

            // Show backend error when available.
            setError(
                error.response?.data?.message ||
                "Failed to load recipient."
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

        // Only load when a valid account ID exists.
        if (accountId) {
            loadRecipient()
        }

    }, [accountId])


    // =========================================
    // USER INFORMATION
    // =========================================

    function getUserName() {

        // Prefer recipient name, then email.
        return (
            recipient?.user?.name ||
            recipient?.user?.email ||
            "Bank User"
        )
    }


    function getUserEmail() {

        // Display recipient email when available.
        return (
            recipient?.user?.email ||
            "Personal Account"
        )
    }


    // =========================================
    // SHORT ACCOUNT ID
    // =========================================

    function getShortId(id) {

        // Handle missing ID.
        if (!id) {
            return "N/A"
        }

        // Convert ID to string.
        const value = String(id)

        // Display shortened account ID.
        return `${value.slice(0, 8)}...${value.slice(-6)}`
    }


    // =========================================
    // AMOUNT INPUT
    // =========================================

    function handleAmountChange(event) {

        // Get entered value.
        const value = event.target.value

        // Allow empty value or a number with up to 2 decimals.
        if (
            value === "" ||
            /^\d*\.?\d{0,2}$/.test(value)
        ) {

            setAmount(value)

            // Clear old amount error while typing.
            if (error) {
                setError("")
            }
        }
    }


    // =========================================
    // SEND MONEY
    // =========================================

    async function handleSubmit(event) {

        // Prevent normal form submission.
        event.preventDefault()

        // Clear previous messages.
        setError("")
        setSuccess("")


        // Convert amount to number.
        const numericAmount =
            Number(amount)


        // Validate amount.
        if (
            !numericAmount ||
            numericAmount <= 0
        ) {

            setError(
                "Please enter a valid amount."
            )

            return
        }


        try {

            // Start transfer processing.
            setSending(true)

            // Create transaction.
            const data =
                await createTransaction({
                    toAccount: accountId,
                    amount: numericAmount,

                    // Unique key prevents accidental duplicate transfers.
                    idempotencyKey:
                        crypto.randomUUID(),
                })


            // Keep API response available during development.
            console.log(
                "TRANSFER API:",
                data
            )


            // Show success message.
            setSuccess(
                data.message ||
                "Money sent successfully."
            )

            // Clear amount after successful transfer.
            setAmount("")

        } catch (error) {

            // Log backend information for debugging.
            console.error(
                "Transfer Error:",
                error.response?.data ||
                error.message
            )

            // Show backend error.
            setError(
                error.response?.data?.message ||
                "Transfer failed. Please try again."
            )

        } finally {

            // Stop transfer processing.
            setSending(false)
        }
    }


    // =========================================
    // LOADING STATE
    // =========================================

    if (loading) {

        return (

            <div className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6">

                {/* HEADER SKELETON */}
                <div className="h-7 w-40 animate-pulse rounded-lg bg-slate-200 sm:h-8" />

                {/* MAIN CARD SKELETON */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    {/* BLUE HEADER */}
                    <div className="h-48 animate-pulse bg-slate-200 sm:h-52" />

                    {/* FORM AREA */}
                    <div className="space-y-5 p-5 sm:p-8">

                        <div className="h-20 animate-pulse rounded-xl bg-slate-100" />

                        <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

                        <div className="h-14 animate-pulse rounded-xl bg-slate-100" />

                        <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

                    </div>

                </div>

            </div>

        )
    }


    // =========================================
    // RECIPIENT ERROR STATE
    // =========================================

    if (error && !recipient) {

        return (

            <div className="mx-auto w-full max-w-2xl space-y-5 sm:space-y-6">

                {/* BACK BUTTON */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/send-money")
                    }
                    className="group flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
                >

                    <ArrowLeft
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                    />

                    Back to Recipients

                </button>


                {/* ERROR CARD */}
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center sm:p-8">

                    {/* ERROR ICON */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">

                        <AlertCircle size={32} />

                    </div>


                    {/* TITLE */}
                    <h2 className="mt-5 text-lg font-bold text-red-700">
                        Recipient Not Available
                    </h2>


                    {/* ERROR */}
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600">
                        {error}
                    </p>


                    {/* ACTIONS */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">

                        {/* RETRY */}
                        <button
                            type="button"
                            onClick={loadRecipient}
                            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.98]"
                        >

                            <RefreshCw size={16} />

                            Try Again

                        </button>


                        {/* BACK */}
                        <Button
                            type="button"
                            onClick={() =>
                                navigate("/send-money")
                            }
                        >
                            Back to Recipients
                        </Button>

                    </div>

                </div>

            </div>

        )
    }


    // =========================================
    // MAIN PAGE
    // =========================================

    return (

        <div className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6">

            {/* ========================================= */}
            {/* BACK */}
            {/* ========================================= */}

            <button
                type="button"
                onClick={() =>
                    navigate("/send-money")
                }
                className="group flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
            >

                <ArrowLeft
                    size={18}
                    className="transition-transform group-hover:-translate-x-1"
                />

                Back to Recipients

            </button>


            {/* ========================================= */}
            {/* PAGE HEADER */}
            {/* ========================================= */}

            <div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Send Money
                </h1>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                    Review the recipient and enter the amount.
                </p>

            </div>


            {/* ========================================= */}
            {/* MAIN TRANSFER CARD */}
            {/* ========================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

                {/* ================================= */}
                {/* RECIPIENT HEADER */}
                {/* ================================= */}

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5 text-white sm:p-8">

                    {/* DECORATIVE CIRCLE */}
                    <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10" />

                    {/* RECIPIENT CONTENT */}
                    <div className="relative">

                        <div className="flex items-center gap-4">

                            {/* USER ICON */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-blue-100 backdrop-blur">

                                <UserRound size={25} />

                            </div>


                            {/* USER INFORMATION */}
                            <div className="min-w-0">

                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
                                    Sending to
                                </p>

                                <p className="mt-1 truncate text-lg font-bold">
                                    {getUserName()}
                                </p>

                                <p className="mt-1 truncate text-xs text-blue-200">
                                    {getUserEmail()}
                                </p>

                            </div>

                        </div>


                        {/* ACCOUNT INFORMATION */}
                        <div className="mt-5 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-2">

                                <WalletCards
                                    size={15}
                                    className="text-blue-200"
                                />

                                <span className="text-xs text-blue-200">
                                    Recipient Account
                                </span>

                            </div>

                            <span className="break-all font-mono text-xs font-semibold text-white sm:text-right">
                                {getShortId(
                                    recipient?._id
                                )}
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* TRANSFER FORM */}
                {/* ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="p-5 sm:p-8"
                >

                    {/* ================================= */}
                    {/* SUCCESS MESSAGE */}
                    {/* ================================= */}

                    {success && (

                        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                            <div className="flex items-start gap-3">

                                {/* SUCCESS ICON */}
                                <CheckCircle2
                                    size={21}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                />

                                {/* SUCCESS TEXT */}
                                <div className="min-w-0">

                                    <p className="font-bold text-emerald-700">
                                        Transfer Successful
                                    </p>

                                    <p className="mt-1 break-words text-sm leading-5 text-emerald-600">
                                        {success}
                                    </p>

                                </div>

                            </div>


                            {/* SUCCESS ACTIONS */}
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                                {/* VIEW TRANSACTIONS */}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/transactions"
                                        )
                                    }
                                    className="w-full sm:w-auto"
                                >
                                    View Transactions
                                </Button>


                                {/* SEND AGAIN */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSuccess("")
                                    }
                                    className="min-h-11 w-full rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.98] sm:w-auto"
                                >
                                    Send Again
                                </button>

                            </div>

                        </div>

                    )}


                    {/* ================================= */}
                    {/* TRANSFER ERROR */}
                    {/* ================================= */}

                    {error && (

                        <div
                            role="alert"
                            className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                        >

                            {/* ERROR ICON */}
                            <AlertCircle
                                size={19}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            {/* ERROR TEXT */}
                            <p className="break-words text-sm leading-5 text-red-700">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* ================================= */}
                    {/* AMOUNT */}
                    {/* ================================= */}

                    <div>

                        <label
                            htmlFor="amount"
                            className="text-sm font-bold text-slate-700"
                        >
                            Transfer Amount
                        </label>


                        {/* AMOUNT INPUT */}
                        <div className="relative mt-2">

                            {/* RUPEE ICON */}
                            <IndianRupee
                                size={21}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="amount"
                                name="amount"
                                type="text"
                                inputMode="decimal"
                                autoComplete="off"
                                value={amount}
                                onChange={
                                    handleAmountChange
                                }
                                placeholder="0.00"
                                disabled={sending}
                                aria-describedby="amount-help"
                                className="min-h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-2xl font-bold text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 sm:text-3xl"
                            />

                        </div>


                        <p
                            id="amount-help"
                            className="mt-2 text-xs text-slate-400"
                        >
                            Enter the amount you want to transfer.
                        </p>

                    </div>


                    {/* ================================= */}
                    {/* TRANSFER PREVIEW */}
                    {/* ================================= */}

                    {amount &&
                        Number(amount) > 0 && (

                            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                                <div className="flex items-center justify-between gap-4">

                                    <span className="text-sm font-medium text-slate-500">
                                        You are sending
                                    </span>

                                    <span className="text-lg font-bold text-slate-900">
                                        ₹{Number(amount).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>

                                </div>

                                <div className="mt-3 flex items-center justify-between gap-4 border-t border-slate-200 pt-3">

                                    <span className="text-sm font-medium text-slate-500">
                                        Recipient
                                    </span>

                                    <span className="max-w-[60%] truncate text-sm font-semibold text-slate-700">
                                        {getUserName()}
                                    </span>

                                </div>

                            </div>

                        )}


                    {/* ================================= */}
                    {/* SECURITY INFORMATION */}
                    {/* ================================= */}

                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        {/* SECURITY ICON */}
                        <ShieldCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-blue-600"
                        />

                        {/* SECURITY TEXT */}
                        <div className="min-w-0">

                            <p className="text-sm font-semibold text-blue-800">
                                Secure transaction
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-700">
                                Your transfer is processed securely
                                and recorded in the ledger.
                            </p>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* SUBMIT BUTTON */}
                    {/* ================================= */}

                    <Button
                        type="submit"
                        disabled={
                            sending ||
                            !amount ||
                            Number(amount) <= 0
                        }
                        className="mt-7 min-h-12 w-full py-3.5"
                    >

                        {sending ? (

                            <span className="flex items-center justify-center gap-2">

                                <Loader2
                                    size={19}
                                    className="animate-spin"
                                />

                                Processing Transfer...

                            </span>

                        ) : (

                            <span className="flex items-center justify-center gap-2">

                                <Send size={18} />

                                Send {amount
                                    ? `₹${amount}`
                                    : "Money"}

                            </span>

                        )}

                    </Button>


                    {/* FOOTNOTE */}
                    <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                        Please verify the recipient before confirming the transfer.
                    </p>

                </form>

            </div>

        </div>
    )
}


export default SendMoneyForm