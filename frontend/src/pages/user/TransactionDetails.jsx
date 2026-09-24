import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Card from "../../components/common/Card"

import { getTransactionById } from "../../services/user.service"


function UserTransactionDetails() {

    const { id } = useParams()

    const [transaction, setTransaction] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect(() => {

        async function loadTransaction() {

            try {

                setLoading(true)
                setError("")

                const data = await getTransactionById(id)

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

        loadTransaction()

    }, [id])


    if (loading) {

        return (
            <Card>

                <p className="py-6 text-center text-sm text-slate-500">
                    Loading transaction details...
                </p>

            </Card>
        )

    }


    if (error) {

        return (
            <Card>

                <div className="py-6 text-center">

                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>

                    <Link
                        to="/transactions"
                        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Back to Transactions
                    </Link>

                </div>

            </Card>
        )

    }


    if (!transaction) {

        return (
            <Card>

                <p className="py-6 text-center text-sm text-slate-500">
                    Transaction not found.
                </p>

            </Card>
        )

    }


    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <Link
                    to="/transactions"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    ← Back to Transactions
                </Link>

                <h1 className="mt-3 text-2xl font-bold text-slate-800">
                    Transaction Details
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View complete transaction information.
                </p>

            </div>


            {/* Details */}

            <Card>

                <div className="space-y-6">

                    {/* Transaction ID */}

                    <div>

                        <p className="text-sm text-slate-500">
                            Transaction ID
                        </p>

                        <p className="mt-1 break-all font-semibold text-slate-800">
                            {transaction._id}
                        </p>

                    </div>


                    {/* Status */}

                    <div>

                        <p className="text-sm text-slate-500">
                            Status
                        </p>

                        <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
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

                    <div>

                        <p className="text-sm text-slate-500">
                            Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-800">
                            ₹{Number(transaction.amount).toLocaleString("en-IN")}
                        </p>

                    </div>


                    {/* Accounts */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div className="rounded-lg bg-slate-50 p-4">

                            <p className="text-sm text-slate-500">
                                From Account
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {transaction.fromAccount._id}
                            </p>

                        </div>


                        <div className="rounded-lg bg-slate-50 p-4">

                            <p className="text-sm text-slate-500">
                                To Account
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {transaction.toAccount._id}
                            </p>

                        </div>

                    </div>


                    {/* Date */}

                    <div>

                        <p className="text-sm text-slate-500">
                            Created At
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                            {new Date(
                                transaction.createdAt
                            ).toLocaleString("en-IN")}
                        </p>

                    </div>

                </div>

            </Card>

        </div>
    )
}


export default UserTransactionDetails