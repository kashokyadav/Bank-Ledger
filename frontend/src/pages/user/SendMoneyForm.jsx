import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Card from "../../components/common/Card"
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
    const [transaction, setTransaction] = useState(null)

    useEffect(() => {
        async function fetchRecipient() {
            try {
                setLoading(true)
                setError("")

                const data = await getRecipientAccounts()

                const selectedRecipient = data.accounts?.find(
                    (account) => account._id === accountId
                )

                if (!selectedRecipient) {
                    setError("Recipient account not found.")
                    return
                }

                setRecipient(selectedRecipient)
            } catch (error) {
                console.error(
                    "Get Recipient Error:",
                    error.response?.data || error.message
                )

                setError(
                    error.response?.data?.message ||
                    "Failed to load recipient."
                )
            } finally {
                setLoading(false)
            }
        }

        fetchRecipient()
    }, [accountId])


    async function handleSendMoney(event) {
        event.preventDefault()

        if (!amount || Number(amount) <= 0) {
            setError("Please enter a valid amount.")
            return
        }

        try {
            setSending(true)
            setError("")
            setSuccess("")

            // Generate idempotency key automatically
            const idempotencyKey = crypto.randomUUID()

            const transactionData = {
                toAccount: accountId,
                amount: Number(amount),
                idempotencyKey: idempotencyKey,
            }

            console.log(
                "Creating Transaction:",
                transactionData
            )

            const data = await createTransaction(transactionData)

            console.log(
                "Transaction Response:",
                data
            )

            setTransaction(data.transaction)

            setAmount("")


        } catch (error) {
            console.error(
                "Create Transaction Error:",
                error.response?.data || error.message
            )

            setError(
                error.response?.data?.message ||
                "Transaction failed. Please try again."
            )
        } finally {
            setSending(false)
        }
    }


    function handleGoBack() {
        navigate("/send-money")
    }


    if (loading) {
        return (
            <Card>
                <p className="py-6 text-center text-slate-500">
                    Loading recipient...
                </p>
            </Card>
        )
    }


    if (error && !recipient) {
        return (
            <Card>
                <div className="space-y-4 py-6 text-center">

                    <p className="text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
                    >
                        Go Back
                    </button>

                </div>
            </Card>
        )
    }


    if (transaction) {
        return (
            <div className="mx-auto max-w-xl space-y-6">

                <Card>
                    <div className="space-y-6 text-center">

                        <div>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                                ✓
                            </div>

                            <h1 className="mt-4 text-2xl font-bold text-slate-800">
                                Transaction Successful
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Money has been sent successfully.
                            </p>
                        </div>


                        {/* Amount */}
                        <div>
                            <p className="text-sm text-slate-500">
                                Amount
                            </p>

                            <p className="mt-1 text-3xl font-bold text-slate-800">
                                ₹{Number(transaction.amount).toLocaleString("en-IN")}
                            </p>
                        </div>


                        {/* Transaction Details */}
                        <div className="space-y-4 rounded-xl bg-slate-50 p-4 text-left">

                            <div>
                                <p className="text-sm text-slate-500">
                                    To
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                    {recipient?.user?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Account
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                    ••••••{accountId.slice(-4)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Status
                                </p>

                                <p className="mt-1 font-semibold text-green-600">
                                    {transaction.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Transaction ID
                                </p>

                                <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                    {transaction._id}
                                </p>
                            </div>

                        </div>


                        {/* Buttons */}
                        <div className="flex flex-col gap-3 sm:flex-row">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/transactions/${transaction._id}`)
                                }
                                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                View Transaction
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/send-money")
                                }
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Back to Recipients
                            </button>

                        </div>

                    </div>
                </Card>

            </div>
        )
    }



    return (
        <div className="mx-auto max-w-xl space-y-6">

            {/* Header */}
            <div>
                <button
                    type="button"
                    onClick={handleGoBack}
                    className="mb-3 text-sm font-medium text-blue-600 hover:underline"
                >
                    ← Back to Recipients
                </button>

                <h1 className="text-2xl font-bold text-slate-800">
                    Send Money
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Enter the amount you want to send
                </p>
            </div>


            <Card>

                <form
                    onSubmit={handleSendMoney}
                    className="space-y-6"
                >

                    {/* Recipient */}
                    <div>
                        <p className="text-sm text-slate-500">
                            Sending to
                        </p>

                        <p className="mt-1 text-lg font-semibold text-slate-800">
                            {recipient?.user?.name}
                        </p>
                    </div>


                    {/* Account */}
                    <div>
                        <p className="text-sm text-slate-500">
                            Account No.
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            ••••••{accountId.slice(-4)}
                        </p>
                    </div>


                    {/* Amount */}
                    <div className="space-y-2">
                        <label
                            htmlFor="amount"
                            className="text-sm font-medium text-slate-700"
                        >
                            Amount
                        </label>

                        <input
                            id="amount"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(event) =>
                                setAmount(event.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            disabled={sending}
                            required
                        />
                    </div>


                    {/* Error */}
                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}


                    {/* Success */}
                    {success && (
                        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                            {success}
                        </p>
                    )}


                    {/* Buttons */}
                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={handleGoBack}
                            disabled={sending}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Go Back
                        </button>

                        <button
                            type="submit"
                            disabled={
                                sending ||
                                !amount ||
                                Number(amount) <= 0
                            }
                            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {sending ? "Sending..." : "Send Money"}
                        </button>

                    </div>

                </form>

            </Card>

        </div>
    )
}

export default SendMoneyForm