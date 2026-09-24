import { useEffect, useState } from "react"

import {
    WalletCards,
    Plus,
    CheckCircle,
    AlertCircle,
    Loader2,
    Copy,
    ShieldCheck,
    X,
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

            const accountsData =
                await getMyAccounts()

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


    useEffect(() => {

        loadAccounts()

    }, [])


    function getShortAccountId(id) {

        if (!id) {
            return "N/A"
        }

        return `${id.slice(0, 8)}...${id.slice(-6)}`
    }


    async function copyAccountId(id) {

        try {

            await navigator.clipboard.writeText(id)

            setSuccess(
                "Account ID copied to clipboard."
            )

            setError("")

        } catch {

            setError(
                "Unable to copy account ID."
            )

            setSuccess("")

        }
    }


    function openCreateForm() {

        setError("")

        setSuccess("")

        setShowCreateForm(true)
    }


    function closeCreateForm() {

        if (creating) {
            return
        }

        setShowCreateForm(false)

        setError("")
    }


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm sm:h-12 sm:w-12">

                        <WalletCards
                            size={22}
                            strokeWidth={2}
                        />

                    </div>


                    <div className="min-w-0">

                        <h1 className="truncate text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            My Accounts
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your bank accounts and balances.
                        </p>

                    </div>

                </div>


                <Button
                    type="button"
                    onClick={openCreateForm}
                    className="w-full sm:w-auto"
                >

                    <span className="flex items-center justify-center gap-2">

                        <Plus size={18} />

                        Create Account

                    </span>

                </Button>

            </div>


            {/* ================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ================================= */}

            {success && (

                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">

                    <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-sm font-medium leading-5 text-emerald-700">
                        {success}
                    </p>

                </div>

            )}


            {/* ================================= */}
            {/* ERROR MESSAGE */}
            {/* ================================= */}

            {error && !loading && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div className="min-w-0">

                        <p className="text-sm font-semibold text-red-700">
                            Something went wrong
                        </p>

                        <p className="mt-1 break-words text-sm leading-5 text-red-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* LOADING SKELETON */}
            {/* ================================= */}

            {loading && (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">

                    {[1, 2].map((item) => (

                        <div
                            key={item}
                            className="h-[360px] animate-pulse rounded-2xl border border-slate-200 bg-white"
                        />

                    ))}

                </div>

            )}


            {/* ================================= */}
            {/* EMPTY STATE */}
            {/* ================================= */}

            {!loading &&
                !error &&
                accounts.length === 0 && (

                    <Card>

                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:px-8 sm:py-16">

                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">

                                <WalletCards
                                    size={36}
                                />

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
                                onClick={openCreateForm}
                                className="mt-6 w-full sm:w-auto"
                            >

                                <span className="flex items-center justify-center gap-2">

                                    <Plus size={18} />

                                    Create Your First Account

                                </span>

                            </Button>

                        </div>

                    </Card>

                )}


            {/* ================================= */}
            {/* ACCOUNT CARDS */}
            {/* ================================= */}

            {!loading &&
                !error &&
                accounts.length > 0 && (

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">

                        {accounts.map((account) => (

                            <div
                                key={account._id}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                            >


                                {/* ============================== */}
                                {/* BANK CARD HEADER */}
                                {/* ============================== */}

                                <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-5 text-white sm:p-6">


                                    {/* Decorative circles */}

                                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />

                                    <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110" />


                                    {/* Card Content */}

                                    <div className="relative flex h-full flex-col justify-between">


                                        {/* Top */}

                                        <div className="flex items-start justify-between gap-4">

                                            <div>

                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
                                                    BANK-LEDGER
                                                </p>

                                                <p className="mt-2 text-sm text-blue-100">
                                                    Bank Account
                                                </p>

                                            </div>


                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur transition-transform duration-300 group-hover:rotate-6">

                                                <ShieldCheck
                                                    size={21}
                                                />

                                            </div>

                                        </div>


                                        {/* Bottom */}

                                        <div className="mt-10">

                                            <div className="flex items-end justify-between gap-3">

                                                <div className="min-w-0">

                                                    <p className="text-[11px] font-medium uppercase tracking-wider text-blue-200">
                                                        Account ID
                                                    </p>

                                                    <div className="mt-1 flex items-center gap-2">

                                                        <p className="break-all font-mono text-sm font-semibold text-white">
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
                                                            className="shrink-0 rounded-lg p-2 text-blue-100 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
                                                            title="Copy account ID"
                                                        >

                                                            <Copy
                                                                size={15}
                                                            />

                                                        </button>

                                                    </div>

                                                </div>


                                                <div className="shrink-0 text-right">

                                                    <p className="text-[11px] uppercase tracking-wider text-blue-200">
                                                        Currency
                                                    </p>

                                                    <p className="mt-1 text-lg font-bold">
                                                        {account.currency}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* ============================== */}
                                {/* ACCOUNT DETAILS */}
                                {/* ============================== */}

                                <div className="p-5 sm:p-6">


                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">


                                        {/* Currency */}

                                        <div className="rounded-2xl bg-slate-50 p-4 transition-colors duration-200 group-hover:bg-blue-50/60">

                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                Currency
                                            </p>

                                            <p className="mt-2 text-lg font-bold text-slate-800">
                                                {account.currency}
                                            </p>

                                        </div>


                                        {/* Status */}

                                        <div className="rounded-2xl bg-slate-50 p-4 transition-colors duration-200 group-hover:bg-blue-50/60">

                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                Status
                                            </p>


                                            <div className="mt-2 flex items-center gap-2">

                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${
                                                        account.status === "ACTIVE"
                                                            ? "bg-emerald-500"
                                                            : account.status === "FROZEN"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    }`}
                                                />

                                                <span className="truncate text-sm font-bold text-slate-800">
                                                    {account.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Account Reference */}

                                    <div className="mt-5 border-t border-slate-100 pt-5">

                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            Account Reference
                                        </p>

                                        <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-500">
                                            {account._id}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


            {/* ================================= */}
            {/* CREATE ACCOUNT OVERLAY */}
            {/* ================================= */}

            {showCreateForm && (

                <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">


                    {/* Modal */}

                    <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl">


                        {/* Modal Header */}

                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">

                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                                    <Plus
                                        size={21}
                                    />

                                </div>


                                <div className="min-w-0">

                                    <h2 className="text-lg font-bold text-slate-800">
                                        Create New Account
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Open another BANK-LEDGER account.
                                    </p>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={closeCreateForm}
                                disabled={creating}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Close create account"
                            >

                                <X
                                    size={20}
                                />

                            </button>

                        </div>


                        {/* Modal Body */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-6"
                        >

                            <Input
                                label="Currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                placeholder="INR"
                            />


                            <div className="mt-3 rounded-xl bg-blue-50 p-3">

                                <p className="text-xs leading-5 text-blue-700">

                                    Currently supported currency:
                                    <span className="ml-1 font-bold">
                                        INR
                                    </span>

                                </p>

                            </div>


                            {/* Buttons */}

                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeCreateForm}
                                    disabled={creating}
                                    className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                >
                                    Cancel
                                </button>


                                <Button
                                    type="submit"
                                    disabled={creating}
                                    className="w-full sm:w-auto"
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

                                            <Plus
                                                size={18}
                                            />

                                            Create Account

                                        </span>

                                    )}

                                </Button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    )
}


export default UserAccounts