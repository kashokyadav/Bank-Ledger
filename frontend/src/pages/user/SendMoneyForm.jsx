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
} from "lucide-react"

import Button from "../../components/common/Button"

import {
    getRecipientAccounts,
    createTransaction,
} from "../../services/user.service"


function SendMoneyForm() {

    const navigate = useNavigate()

    const { accountId } = useParams()

    const [recipient, setRecipient] = useState(null)

    const [amount, setAmount] = useState("")

    const [loading, setLoading] = useState(true)

    const [sending, setSending] = useState(false)

    const [error, setError] = useState("")

    const [success, setSuccess] = useState("")


    async function loadRecipient() {

        try {

            setLoading(true)

            setError("")

            const data =
                await getRecipientAccounts()

            const accounts =
                data.accounts ||
                data.recipients ||
                []

            const selected =
                accounts.find(
                    (account) =>
                        String(account._id) ===
                        String(accountId)
                )

            if (!selected) {

                setError(
                    "Recipient account could not be found."
                )

                return
            }

            setRecipient(selected)

        } catch (error) {

            console.error(
                "Recipient Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Failed to load recipient."
            )

        } finally {

            setLoading(false)

        }
    }


    useEffect(() => {

        if (accountId) {
            loadRecipient()
        }

    }, [accountId])


    function getUserName() {

        return (
            recipient?.user?.name ||
            recipient?.user?.email ||
            "Bank User"
        )

    }


    function getUserEmail() {

        return (
            recipient?.user?.email ||
            "Personal Account"
        )

    }


    function getShortId(id) {

        if (!id) {
            return "N/A"
        }

        const value = String(id)

        return `${value.slice(0, 8)}...${value.slice(-6)}`

    }


    function handleAmountChange(event) {

        const value =
            event.target.value

        if (
            value === "" ||
            /^\d*\.?\d{0,2}$/.test(value)
        ) {

            setAmount(value)

        }

    }


    async function handleSubmit(event) {

        event.preventDefault()

        setError("")
        setSuccess("")


        const numericAmount =
            Number(amount)


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

            setSending(true)


            const data =
                await createTransaction({
                    toAccount: accountId,
                    amount: numericAmount,
                    idempotencyKey:
                        crypto.randomUUID(),
                })


            console.log(
                "TRANSFER API:",
                data
            )


            setSuccess(
                data.message ||
                "Money sent successfully."
            )


            setAmount("")


        } catch (error) {

            console.error(
                "Transfer Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Transfer failed. Please try again."
            )

        } finally {

            setSending(false)

        }
    }


    if (loading) {

        return (

            <div className="space-y-6">

                <div className="h-8 w-40 animate-pulse rounded-lg bg-slate-200" />

                <div className="h-[500px] animate-pulse rounded-3xl bg-slate-200" />

            </div>

        )
    }


    if (error && !recipient) {

        return (

            <div className="space-y-6">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/send-money")
                    }
                    className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
                >

                    <ArrowLeft
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                    />

                    Back to Recipients

                </button>


                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                    <AlertCircle
                        size={36}
                        className="mx-auto text-red-600"
                    />

                    <h2 className="mt-4 text-lg font-bold text-red-700">
                        Recipient Not Available
                    </h2>

                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>

                    <Button
                        type="button"
                        onClick={() =>
                            navigate("/send-money")
                        }
                        className="mt-5"
                    >
                        Back to Recipients
                    </Button>

                </div>

            </div>

        )
    }


    return (

        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-7">


            {/* ================================= */}
            {/* BACK */}
            {/* ================================= */}

            <button
                type="button"
                onClick={() =>
                    navigate("/send-money")
                }
                className="group flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
            >

                <ArrowLeft
                    size={18}
                    className="transition-transform group-hover:-translate-x-1"
                />

                Back to Recipients

            </button>


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                    Send Money
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Review the recipient and enter the amount.
                </p>

            </div>


            {/* ================================= */}
            {/* MAIN CARD */}
            {/* ================================= */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


                {/* Recipient Header */}

                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-6 text-white sm:p-8">


                    <div className="flex items-center gap-4">


                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-100 backdrop-blur">

                            <UserRound
                                size={25}
                            />

                        </div>


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


                    <div className="mt-5 flex flex-col gap-2 rounded-xl bg-white/10 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">

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


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="p-5 sm:p-8"
                >


                    {/* Success */}

                    {success && (

                        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

                            <div className="flex items-start gap-3">

                                <CheckCircle2
                                    size={21}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                />

                                <div>

                                    <p className="font-bold text-emerald-700">
                                        Transfer Successful
                                    </p>

                                    <p className="mt-1 text-sm leading-5 text-emerald-600">
                                        {success}
                                    </p>

                                </div>

                            </div>


                            <div className="mt-4 flex flex-col gap-3 sm:flex-row">

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

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSuccess("")
                                    }
                                    className="w-full rounded-xl border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 sm:w-auto"
                                >
                                    Send Again
                                </button>

                            </div>

                        </div>

                    )}


                    {/* Error */}

                    {error && (

                        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">

                            <AlertCircle
                                size={19}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <p className="text-sm leading-5 text-red-700">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* Amount */}

                    <div>

                        <label
                            htmlFor="amount"
                            className="text-sm font-bold text-slate-700"
                        >
                            Amount
                        </label>


                        <div className="relative mt-2">

                            <IndianRupee
                                size={21}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="amount"
                                name="amount"
                                type="text"
                                inputMode="decimal"
                                value={amount}
                                onChange={
                                    handleAmountChange
                                }
                                placeholder="0.00"
                                disabled={sending}
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-2xl font-bold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                        <p className="mt-2 text-xs text-slate-400">
                            Enter the amount you want to transfer.
                        </p>

                    </div>


                    {/* Security */}

                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                        <ShieldCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-blue-600"
                        />

                        <div>

                            <p className="text-sm font-semibold text-blue-800">
                                Secure transaction
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-700">
                                Your transfer is processed securely
                                and recorded in the ledger.
                            </p>

                        </div>

                    </div>


                    {/* Submit */}

                    <Button
                        type="submit"
                        disabled={
                            sending ||
                            !amount ||
                            Number(amount) <= 0
                        }
                        className="mt-7 w-full py-3.5"
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

                                <Send
                                    size={18}
                                />

                                Send {amount
                                    ? `₹${amount}`
                                    : "Money"}

                            </span>

                        )}

                    </Button>


                    <p className="mt-3 text-center text-xs text-slate-400">
                        Please verify the recipient before confirming the transfer.
                    </p>

                </form>

            </div>

        </div>

    )
}


export default SendMoneyForm