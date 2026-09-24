import { useEffect, useState } from "react"
import {
    WalletCards,
    Plus,
    CheckCircle,
    AlertCircle,
    Loader2,
    Copy,
    ShieldCheck,
} from "lucide-react"

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

            console.log(
                "CREATE ACCOUNT API:",
                data
            )

            setSuccess(
                data.message ||
                "Account created successfully."
            )

            setFormData({
                currency: "INR",
            })

            setShowCreateForm(false)

            const accountsData = await getMyAccounts()

            setAccounts(
                accountsData.accounts
            )

        } catch (error) {

            console.error(
                "Create Account Error:",
                error.response?.data ||
                error.message
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

                const accountsData =
                    await getMyAccounts()

                console.log(
                    "ACCOUNTS API:",
                    accountsData
                )

                setAccounts(
                    accountsData.accounts
                )

            } catch (error) {

                console.error(
                    "Accounts API Error:",
                    error.response?.data ||
                    error.message
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


    function getShortAccountId(id) {

        if (!id) return "N/A"

        return `${id.slice(0, 8)}...${id.slice(-6)}`
    }


    async function copyAccountId(id) {

        try {

            await navigator.clipboard.writeText(id)

            setSuccess(
                "Account ID copied to clipboard."
            )

        } catch {

            setError(
                "Unable to copy account ID."
            )

        }
    }


    return (

        <div className="space-y-8">


            {/* PAGE HEADER */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

                            <WalletCards size={24} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                                My Accounts
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage your bank accounts and balances.
                            </p>

                        </div>

                    </div>

                </div>


                <Button
                    type="button"
                    onClick={() => {
                        setShowCreateForm(true)
                        setError("")
                        setSuccess("")
                    }}
                >

                    <span className="flex items-center gap-2">

                        <Plus size={18} />

                        Create Account

                    </span>

                </Button>

            </div>


            {/* SUCCESS MESSAGE */}

            {success && (

                <div className="animate-[fadeIn_0.3s_ease-out] flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">

                    <CheckCircle
                        size={20}
                        className="mt-0.5 shrink-0"
                    />

                    <span className="font-medium">
                        {success}
                    </span>

                </div>

            )}


            {/* ERROR MESSAGE */}

            {error && !loading && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                    <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0"
                    />

                    <div>

                        <p className="font-semibold">
                            Something went wrong
                        </p>

                        <p className="mt-1">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* LOADING */}

            {loading && (

                <div className="grid gap-6 md:grid-cols-2">

                    {[1, 2].map((item) => (

                        <div
                            key={item}
                            className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
                        />

                    ))}

                </div>

            )}


            {/* EMPTY STATE */}

            {!loading &&
                !error &&
                accounts.length === 0 && (

                    <Card>

                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">

                                <WalletCards size={36} />

                            </div>

                            <h2 className="mt-6 text-xl font-bold text-slate-800">
                                No Accounts Yet
                            </h2>

                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Create your first BANK-LEDGER account
                                to start managing your money.
                            </p>

                            <Button
                                type="button"
                                onClick={() => setShowCreateForm(true)}
                                className="mt-6"
                            >

                                <span className="flex items-center gap-2">

                                    <Plus size={18} />

                                    Create Your First Account

                                </span>

                            </Button>

                        </div>

                    </Card>

                )}


            {/* ACCOUNT CARDS */}

            {!loading &&
                !error &&
                accounts.length > 0 && (

                    <div className="grid gap-6 md:grid-cols-2">

                        {accounts.map((account) => (

                            <div
                                key={account._id}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                            >

                                {/* Account Top */}

                                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-6 text-white">

                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

                                    <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5" />


                                    <div className="relative">

                                        <div className="flex items-start justify-between">

                                            <div>

                                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                                                    BANK-LEDGER
                                                </p>

                                                <p className="mt-2 text-sm text-blue-100">
                                                    Bank Account
                                                </p>

                                            </div>


                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">

                                                <ShieldCheck
                                                    size={21}
                                                />

                                            </div>

                                        </div>


                                        <div className="mt-8">

                                            <p className="text-xs text-blue-200">
                                                Account ID
                                            </p>

                                            <div className="mt-1 flex items-center gap-2">

                                                <p className="break-all font-mono text-sm font-semibold">

                                                    {getShortAccountId(
                                                        account._id
                                                    )}

                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        copyAccountId(
                                                            account._id
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-blue-100 transition hover:bg-white/10 hover:text-white"
                                                    title="Copy account ID"
                                                >

                                                    <Copy size={15} />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Account Details */}

                                <div className="p-6">

                                    <div className="grid grid-cols-2 gap-4">

                                        <div className="rounded-2xl bg-slate-50 p-4 transition-colors group-hover:bg-blue-50/60">

                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Currency
                                            </p>

                                            <p className="mt-2 text-lg font-bold text-slate-800">
                                                {account.currency}
                                            </p>

                                        </div>


                                        <div className="rounded-2xl bg-slate-50 p-4 transition-colors group-hover:bg-blue-50/60">

                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Status
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">

                                                <span
                                                    className={`h-2 w-2 rounded-full ${
                                                        account.status === "ACTIVE"
                                                            ? "bg-emerald-500"
                                                            : account.status === "FROZEN"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    }`}
                                                />

                                                <span className="text-sm font-bold text-slate-800">
                                                    {account.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="mt-5 border-t border-slate-100 pt-5">

                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Account Reference
                                        </p>

                                        <p className="mt-2 break-all font-mono text-xs text-slate-500">
                                            {account._id}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


            {/* CREATE ACCOUNT */}

            {showCreateForm && (

                <div className="animate-[fadeIn_0.25s_ease-out]">

                    <Card>

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                                        <Plus size={21} />

                                    </div>

                                    <div>

                                        <h2 className="text-lg font-bold text-slate-800">
                                            Create New Account
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Open another account in BANK-LEDGER.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowCreateForm(false)
                                }
                                disabled={creating}
                                className="self-end rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 sm:self-auto"
                            >
                                Close
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 max-w-md"
                        >

                            <Input
                                label="Currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                placeholder="INR"
                            />


                            <p className="mt-2 text-xs leading-5 text-slate-400">
                                Currently supported currency:
                                <span className="ml-1 font-semibold text-slate-600">
                                    INR
                                </span>
                            </p>


                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                                <Button
                                    type="submit"
                                    disabled={creating}
                                    className="sm:min-w-40"
                                >

                                    {creating ? (

                                        <span className="flex items-center justify-center gap-2">

                                            <Loader2
                                                size={18}
                                                className="animate-spin"
                                            />

                                            Creating...

                                        </span>

                                    ) : (

                                        <span className="flex items-center justify-center gap-2">

                                            <Plus size={18} />

                                            Create Account

                                        </span>

                                    )}

                                </Button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowCreateForm(false)
                                    }
                                    disabled={creating}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </Card>

                </div>

            )}

        </div>
    )
}


export default UserAccounts