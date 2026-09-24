import { useEffect, useState } from "react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"

import {
    getMyAccounts,
    createAccount,
} from "../../services/user.service"

function UserAccounts() {

    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [showCreateForm, setShowCreateForm] = useState(false)

    const [formData, setFormData] = useState({
        currency: "INR",
    })

    const [creating, setCreating] = useState(false)
    const [success, setSuccess] = useState("")

    function handleChange(event) {

        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }


    async function handleSubmit(event) {

        event.preventDefault()

        try {

            setCreating(true)
            setError("")
            setSuccess("")

            const data = await createAccount(formData)

            console.log("CREATE ACCOUNT API:", data)

            setSuccess(
                data.message || "Account created successfully."
            )

            setFormData({
                currency: "INR",
            })

            setShowCreateForm(false)

            const accountsData = await getMyAccounts()

            setAccounts(accountsData.accounts)

        } catch (error) {

            console.error(
                "Create Account Error:",
                error.response?.data || error.message
            )

            setError(
                error.response?.data?.message ||
                "Failed to create account."
            )

        } finally {

            setCreating(false)

        }
    }


    useEffect(() => {

        async function loadAccounts() {

            try {

                setLoading(true)
                setError("")

                const accountsData = await getMyAccounts()

                console.log("ACCOUNTS API:", accountsData)

                setAccounts(accountsData.accounts)

            } catch (error) {

                console.error(
                    "Accounts API Error:",
                    error.response?.data || error.message
                )

                setError(
                    error.response?.data?.message ||
                    "Failed to load accounts."
                )

            } finally {

                setLoading(false)

            }

        }

        loadAccounts()

    }, [])


    return (
        <div className="space-y-6">

            {/* Page Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        My Accounts
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your bank accounts and view account details.
                    </p>

                </div>

                <div className="w-full sm:w-auto">

                    <Button onClick={() => setShowCreateForm(true)}>
                        Create Account
                    </Button>

                </div>

            </div>


            {/* Loading */}

            {loading && (

                <Card>

                    <p className="text-center text-sm text-slate-500">
                        Loading accounts...
                    </p>

                </Card>

            )}



            {!loading && error && (

                <Card>

                    <div className="text-center">

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



            {!loading && !error && accounts.length === 0 && (

                <Card>

                    <div className="py-6 text-center">

                        <h2 className="font-semibold text-slate-700">
                            No Accounts Found
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            You don't have any bank accounts yet.
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowCreateForm(true)}
                            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Create Your First Account
                        </button>

                    </div>

                </Card>

            )}

            {/* Account List */}

            {!loading && !error && accounts.length > 0 && (

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {accounts.map((account) => (

                        <Card key={account._id}>

                            {/* Account Header */}

                            <div className="flex items-start justify-between gap-4 border-b pb-4">

                                <div className="min-w-0">

                                    <p className="text-sm text-slate-500">
                                        Account ID
                                    </p>

                                    <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                                        {account._id}
                                    </p>

                                </div>

                                <span
                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                        account.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : account.status === "FROZEN"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {account.status}
                                </span>

                            </div>


                            {/* Account Information */}

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="rounded-lg bg-slate-50 p-4">

                                    <p className="text-sm text-slate-500">
                                        Currency
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-slate-800">
                                        {account.currency}
                                    </p>

                                </div>


                                <div className="rounded-lg bg-slate-50 p-4">

                                    <p className="text-sm text-slate-500">
                                        Status
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-slate-800">
                                        {account.status}
                                    </p>

                                </div>

                            </div>


                            {/* Account User */}

                            <div className="mt-4">

                                <p className="text-sm text-slate-500">
                                    User ID
                                </p>

                                <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                    {account.user}
                                </p>

                            </div>

                        </Card>

                    ))}

                </div>

            )}



            {showCreateForm && (

                <Card>

                    <div className="mb-5">

                        <h2 className="text-lg font-bold text-slate-800">
                            Create New Account
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Create a new bank account.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md"
                    >

                        <Input
                            label="Currency"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            placeholder="Enter currency"
                        />


                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                            <Button
                                type="submit"
                                disabled={creating}
                            >
                                {creating
                                    ? "Creating..."
                                    : "Create Account"
                                }
                            </Button>


                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                disabled={creating}
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </Card>

            )}



            

        </div>
    )
}

export default UserAccounts