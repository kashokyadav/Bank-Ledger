import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Card from "../../components/common/Card"
import { getMyTransactions } from "../../services/user.service"


function UserTransactions() {

    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()


    useEffect(() => {

        async function loadTransactions() {

            try {

                setLoading(true)
                setError("")

                const transactionsData = await getMyTransactions()

                console.log(
                    "TRANSACTIONS API:",
                    transactionsData
                )

                setTransactions(
                    transactionsData.transactions
                )

            } catch (error) {

                console.error(
                    "Transactions API Error:",
                    error.response?.data || error.message
                )

                setError(
                    error.response?.data?.message ||
                    "Failed to load transactions."
                )

            } finally {

                setLoading(false)

            }

        }

        loadTransactions()

    }, [])


    return (
        <div className="space-y-6">

            {/* Page Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        My Transactions
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View your transaction history and manage transfers.
                    </p>

                </div>


                {/* Make Transfer */}

                <div className="w-full sm:w-auto">

                    <button
                        type="button"
                        onClick={() => navigate("/send-money")}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                        Make Transfer
                    </button>

                </div>

            </div>


            {/* Loading */}

            {loading && (

                <Card>

                    <p className="py-6 text-center text-sm text-slate-500">
                        Loading transactions...
                    </p>

                </Card>

            )}


            {/* Error State */}

            {!loading && error && (

                <Card>

                    <div className="py-6 text-center">

                        <p className="text-sm font-medium text-red-600">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            Try Again
                        </button>

                    </div>

                </Card>

            )}


            {/* Empty State */}

            {!loading && !error && transactions.length === 0 && (

                <Card>

                    <div className="py-6 text-center">

                        <p className="font-semibold text-slate-700">
                            No Transactions Found
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Your transaction history will appear here.
                        </p>

                    </div>

                </Card>

            )}


            {/* Transaction History */}

            {!loading && !error && transactions.length > 0 && (

                <Card>

                    <div className="mb-5">

                        <h2 className="text-lg font-bold text-slate-800">
                            Transaction History
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your latest account activity.
                        </p>

                    </div>


                    <div className="space-y-4">

                        {transactions.map((transaction) => (

                            <div
                                key={transaction._id}
                                className="rounded-xl border border-slate-200 p-4"
                            >

                                {/* Transaction Header */}

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="min-w-0">

                                        <p className="text-sm text-slate-500">
                                            Transaction ID
                                        </p>

                                        <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                                            {transaction._id}
                                        </p>

                                    </div>


                                    {/* Status */}

                                    <span
                                        className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                            transaction.status === "COMPLETED"
                                                ? "bg-green-100 text-green-700"
                                                : transaction.status === "FAILED"
                                                ? "bg-red-100 text-red-700"
                                                : transaction.status === "REVERSED"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {transaction.status}
                                    </span>

                                </div>


                                {/* Amount */}

                                <div className="mt-5">

                                    <p className="text-sm text-slate-500">
                                        Amount
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-slate-800">
                                        ₹{Number(transaction.amount).toLocaleString("en-IN")}
                                    </p>

                                </div>


                                {/* Accounts */}

                                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    <div className="rounded-lg bg-slate-50 p-4">

                                        <p className="text-sm text-slate-500">
                                            From Account
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                            {transaction.fromAccount}
                                        </p>

                                    </div>


                                    <div className="rounded-lg bg-slate-50 p-4">

                                        <p className="text-sm text-slate-500">
                                            To Account
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                            {transaction.toAccount}
                                        </p>

                                    </div>

                                </div>


                                {/* Date */}

                                <div className="mt-4 border-t pt-4">

                                    <p className="text-sm text-slate-500">
                                        Date
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {new Date(
                                            transaction.createdAt
                                        ).toLocaleString("en-IN")}
                                    </p>

                                </div>


                                {/* View Details */}

                                <div className="mt-4 border-t pt-4">

                                    <Link
                                        to={`/transactions/${transaction._id}`}
                                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        View Transaction Details →
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                </Card>

            )}

        </div>
    )
}


export default UserTransactions