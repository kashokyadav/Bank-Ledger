import { useEffect, useState } from "react"
import Card from "../../components/common/Card"
import { useAuth } from "../../context/AuthContext"
import {
    getMyAccounts,
    getAccountBalance
} from "../../services/user.service"


function Profile() {
    const { user } = useAuth()

    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [selectedAccount, setSelectedAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [balanceLoading, setBalanceLoading] = useState(false)
    const [balanceError, setBalanceError] = useState("")


    async function handleCheckBalance(account) {
        setSelectedAccount(account)
        setBalance(null)
        setBalanceError("")
        setBalanceLoading(true)

        try {
            const data = await getAccountBalance(account._id)

            setBalance(data.balance)
        } catch (error) {
            setBalanceError(
                error.response?.data?.message ||
                "Failed to fetch balance."
            )
        } finally {
            setBalanceLoading(false)
        }
    }

    function handleBackToAccounts() {
        setSelectedAccount(null)
        setBalance(null)
        setBalanceError("")
    }


    useEffect(() => {
        async function fetchAccounts() {
            try {
                const data = await getMyAccounts()

                setAccounts(data.accounts || [])
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load accounts."
                )
            } finally {
                setLoading(false)
            }
        }

        fetchAccounts()
    }, [])

    if (loading) {
        return (
            <Card>
                <p className="py-6 text-center text-slate-500">
                    Loading profile...
                </p>
            </Card>
        )
    }

    if (error) {
        return (
            <Card>
                <p className="py-6 text-center text-red-600">
                    {error}
                </p>
            </Card>
        )
    }

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View your personal and account information.
                </p>
            </div>

            {/* Personal Information */}
            <Card>
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        Personal Information
                    </h2>

                    <p className="text-sm text-slate-500">
                        Your account information
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div>
                        <p className="text-sm text-slate-500">
                            Name
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {user?.name || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Email
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {user?.email || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Total Accounts
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {accounts.length}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Member Since
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {user?.createdAt
                                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "—"}
                        </p>
                    </div>

                </div>
            </Card>

            {/* Accounts */}
 

            {selectedAccount ? (
                <Card>
                    <div className="text-center">

                        <h2 className="text-lg font-bold text-slate-800">
                            Account Balance
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Account ••••••{selectedAccount._id.slice(-4)}
                        </p>

                        {balanceLoading ? (
                            <p className="mt-8 text-slate-500">
                                Loading balance...
                            </p>
                        ) : balanceError ? (
                            <p className="mt-8 text-red-600">
                                {balanceError}
                            </p>
                        ) : (
                            <p className="mt-8 text-4xl font-bold text-slate-800">
                                ₹ {Number(balance).toFixed(2)}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={handleBackToAccounts}
                            className="mt-8 rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
                        >
                            Back
                        </button>

                    </div>
                </Card>
            ) : (
                <Card>

                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-slate-800">
                            My Accounts
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your bank accounts
                        </p>
                    </div>

                    {accounts.length === 0 ? (
                        <div className="py-6 text-center">
                            <p className="font-semibold text-slate-700">
                                No Accounts Found
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Your accounts will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">

                            {accounts.map((account) => (
                                <div
                                    key={account._id}
                                    className="rounded-xl border border-slate-200 p-4"
                                >

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Account
                                            </p>

                                            <p className="mt-1 font-semibold text-slate-800">
                                                ••••••{account._id.slice(-4)}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Currency: {account.currency}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-start gap-3 sm:items-end">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    account.status === "ACTIVE"
                                                        ? "bg-green-100 text-green-700"
                                                        : account.status === "FROZEN"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {account.status}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => handleCheckBalance(account)}
                                                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                Check Balance
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </Card>
            )}



        </div>
    )
}

export default Profile