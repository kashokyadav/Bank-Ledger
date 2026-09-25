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
    RefreshCw,
} from "lucide-react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"

import {
    getMyAccounts,
    createAccount,
} from "../../services/user.service"


function UserAccounts() {

    // =========================================
    // PAGE STATE
    // =========================================

    // Stores all accounts belonging to the logged-in user.
    const [accounts, setAccounts] = useState([])

    // Controls the initial account loading state.
    const [loading, setLoading] = useState(true)

    // Stores API or UI error messages.
    const [error, setError] = useState("")

    // Controls the create-account modal.
    const [showCreateForm, setShowCreateForm] = useState(false)

    // Create-account form data.
    const [formData, setFormData] = useState({
        currency: "INR",
    })

    // Controls the create-account loading state.
    const [creating, setCreating] = useState(false)

    // Stores successful action messages.
    const [success, setSuccess] = useState("")


    // =========================================
    // FORM HANDLER
    // =========================================

    // Updates the create-account form.
    function handleChange(event) {

        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value.toUpperCase(),
        }))
    }


    // =========================================
    // CREATE ACCOUNT
    // =========================================

    async function handleSubmit(event) {

        // Prevent normal browser form submission.
        event.preventDefault()

        try {

            // Start loading state.
            setCreating(true)

            // Clear previous messages.
            setError("")
            setSuccess("")

            // Create the account through the existing API service.
            const data = await createAccount(formData)

            // Keep API debugging information available during development.
            console.log("CREATE ACCOUNT API:", data)

            // Show success message from backend when available.
            setSuccess(
                data.message ||
                "Account created successfully."
            )

            // Reset the form.
            setFormData({
                currency: "INR",
            })

            // Close the modal after successful creation.
            setShowCreateForm(false)

            // Refresh the account list.
            const accountsData = await getMyAccounts()

            setAccounts(accountsData.accounts || [])

        } catch (error) {

            // Log useful backend information during development.
            console.error(
                "Create Account Error:",
                error.response?.data ||
                error.message
            )

            // Show backend error when available.
            setError(
                error.response?.data?.message ||
                "Failed to create account. Please try again."
            )

        } finally {

            // Stop loading state.
            setCreating(false)
        }
    }


    // =========================================
    // LOAD ACCOUNTS
    // =========================================

    async function loadAccounts() {

        try {

            // Start loading state.
            setLoading(true)

            // Clear previous loading error.
            setError("")

            // Request the user's accounts.
            const accountsData = await getMyAccounts()

            // Keep API debugging information available during development.
            console.log("ACCOUNTS API:", accountsData)

            // Safely update the account list.
            setAccounts(accountsData.accounts || [])

        } catch (error) {

            // Log useful backend information during development.
            console.error(
                "Accounts API Error:",
                error.response?.data ||
                error.message
            )

            // Show backend error when available.
            setError(
                error.response?.data?.message ||
                "Failed to load accounts. Please try again."
            )

        } finally {

            // Stop loading state.
            setLoading(false)
        }
    }


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        // Load accounts when the page opens.
        loadAccounts()

    }, [])


    // =========================================
    // ACCOUNT ID HELPERS
    // =========================================

    function getShortAccountId(id) {

        // Handle missing account IDs safely.
        if (!id) {
            return "N/A"
        }

        // Display a shorter version while keeping the full ID available below.
        return `${id.slice(0, 8)}...${id.slice(-6)}`
    }


    // =========================================
    // COPY ACCOUNT ID
    // =========================================

    async function copyAccountId(id) {

        try {

            // Copy the complete account ID to the clipboard.
            await navigator.clipboard.writeText(id)

            // Show successful copy feedback.
            setSuccess("Account ID copied to clipboard.")

            // Clear any old error.
            setError("")

        } catch {

            // Show copy failure feedback.
            setError("Unable to copy account ID.")

            // Clear old success message.
            setSuccess("")
        }
    }


    // =========================================
    // CREATE MODAL CONTROLS
    // =========================================

    function openCreateForm() {

        // Clear previous messages before opening the modal.
        setError("")
        setSuccess("")

        // Open create-account modal.
        setShowCreateForm(true)
    }


    function closeCreateForm() {

        // Do not allow closing while account creation is running.
        if (creating) {
            return
        }

        // Close the modal.
        setShowCreateForm(false)

        // Clear modal-related errors.
        setError("")
    }


    // =========================================
    // PAGE UI
    // =========================================

    return (

        <div className="w-full space-y-5 sm:space-y-6 lg:space-y-7">

            {/* ========================================= */}
            {/* PAGE HEADER */}
            {/* ========================================= */}

            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* PAGE TITLE */}
                <div className="flex min-w-0 items-center gap-3">

                    {/* PAGE ICON */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">

                        <WalletCards
                            size={22}
                            strokeWidth={2.2}
                        />

                    </div>

                    {/* PAGE TITLE CONTENT */}
                    <div className="min-w-0">

                        <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            My Accounts
                        </h1>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            Manage your bank accounts and balances.
                        </p>

                    </div>

                </div>


                {/* CREATE ACCOUNT BUTTON */}
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

            </section>


            {/* ========================================= */}
            {/* SUCCESS MESSAGE */}
            {/* ========================================= */}

            {success && (

                <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm"
                >

                    <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="min-w-0 break-words text-sm font-medium leading-5 text-emerald-700">
                        {success}
                    </p>

                </div>

            )}


            {/* ========================================= */}
            {/* ERROR MESSAGE */}
            {/* ========================================= */}

            {error && !loading && (

                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm"
                >

                    <div className="flex items-start gap-3">

                        {/* ERROR ICON */}
                        <AlertCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-red-600"
                        />

                        {/* ERROR CONTENT */}
                        <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-red-700">
                                Something went wrong
                            </p>

                            <p className="mt-1 break-words text-sm leading-5 text-red-600">
                                {error}
                            </p>

                        </div>

                        {/* RETRY BUTTON */}
                        <button
                            type="button"
                            onClick={loadAccounts}
                            disabled={loading}
                            className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-700 transition hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            <RefreshCw size={14} />

                            <span className="hidden sm:inline">
                                Retry
                            </span>

                        </button>

                    </div>

                </div>

            )}


            {/* ========================================= */}
            {/* LOADING SKELETON */}
            {/* ========================================= */}

            {loading && (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">

                    {[1, 2].map((item) => (

                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >

                            {/* BANK CARD SKELETON */}
                            <div className="h-56 animate-pulse bg-slate-200" />

                            {/* DETAILS SKELETON */}
                            <div className="space-y-4 p-5 sm:p-6">

                                <div className="grid grid-cols-2 gap-3">

                                    <div className="h-20 animate-pulse rounded-xl bg-slate-100" />

                                    <div className="h-20 animate-pulse rounded-xl bg-slate-100" />

                                </div>

                                <div className="h-14 animate-pulse rounded-xl bg-slate-100" />

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* ========================================= */}
            {/* EMPTY STATE */}
            {/* ========================================= */}

            {!loading &&
                !error &&
                accounts.length === 0 && (

                    <Card>

                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center sm:px-8 sm:py-16">

                            {/* EMPTY STATE ICON */}
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-blue-50 text-blue-600">

                                <WalletCards size={36} />

                            </div>

                            {/* EMPTY STATE TITLE */}
                            <h2 className="mt-6 text-xl font-bold text-slate-900">
                                No Accounts Yet
                            </h2>

                            {/* EMPTY STATE DESCRIPTION */}
                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Create your first BANK-LEDGER account
                                to start managing your money.
                            </p>

                            {/* CREATE FIRST ACCOUNT */}
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


            {/* ========================================= */}
            {/* ACCOUNT CARDS */}
            {/* ========================================= */}

            {!loading &&
                !error &&
                accounts.length > 0 && (

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">

                        {accounts.map((account) => (

                            <article
                                key={account._id}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                            >

                                {/* ================================= */}
                                {/* BANK CARD */}
                                {/* ================================= */}

                                <div className="relative min-h-[225px] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5 text-white sm:p-6">

                                    {/* DECORATIVE BACKGROUND */}
                                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />

                                    <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110" />

                                    {/* CARD CONTENT */}
                                    <div className="relative flex min-h-[185px] flex-col justify-between">

                                        {/* CARD TOP */}
                                        <div className="flex items-start justify-between gap-4">

                                            <div>

                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
                                                    BANK-LEDGER
                                                </p>

                                                <p className="mt-2 text-sm font-medium text-blue-100">
                                                    Bank Account
                                                </p>

                                            </div>

                                            {/* SECURITY ICON */}
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur">

                                                <ShieldCheck size={21} />

                                            </div>

                                        </div>


                                        {/* CARD BOTTOM */}
                                        <div className="mt-10">

                                            <div className="flex items-end justify-between gap-4">

                                                {/* ACCOUNT ID */}
                                                <div className="min-w-0">

                                                    <p className="text-[11px] font-medium uppercase tracking-wider text-blue-200">
                                                        Account ID
                                                    </p>

                                                    <div className="mt-1 flex min-w-0 items-center gap-2">

                                                        <p className="min-w-0 break-all font-mono text-sm font-semibold text-white">
                                                            {getShortAccountId(account._id)}
                                                        </p>

                                                        {/* COPY BUTTON */}
                                                        <button
                                                            type="button"
                                                            onClick={() => copyAccountId(account._id)}
                                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-blue-100 transition hover:bg-white/10 hover:text-white active:scale-90"
                                                            title="Copy account ID"
                                                            aria-label="Copy account ID"
                                                        >

                                                            <Copy size={15} />

                                                        </button>

                                                    </div>

                                                </div>


                                                {/* CURRENCY */}
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


                                {/* ================================= */}
                                {/* ACCOUNT DETAILS */}
                                {/* ================================= */}

                                <div className="p-5 sm:p-6">

                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">

                                        {/* CURRENCY */}
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50">

                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                Currency
                                            </p>

                                            <p className="mt-2 text-lg font-bold text-slate-900">
                                                {account.currency}
                                            </p>

                                        </div>


                                        {/* STATUS */}
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50">

                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                Status
                                            </p>

                                            <div className="mt-2 flex items-center gap-2">

                                                {/* STATUS INDICATOR */}
                                                <span
                                                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                                                        account.status === "ACTIVE"
                                                            ? "bg-emerald-500"
                                                            : account.status === "FROZEN"
                                                            ? "bg-amber-500"
                                                            : "bg-red-500"
                                                    }`}
                                                />

                                                <span className="truncate text-sm font-bold text-slate-900">
                                                    {account.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* FULL ACCOUNT REFERENCE */}
                                    <div className="mt-5 border-t border-slate-200 pt-5">

                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                            Account Reference
                                        </p>

                                        <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-500">
                                            {account._id}
                                        </p>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                )}


            {/* ========================================= */}
            {/* CREATE ACCOUNT MODAL */}
            {/* ========================================= */}

            {showCreateForm && (

                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-account-title"
                >

                    {/* MODAL */}
                    <div className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl">

                        {/* ================================= */}
                        {/* MODAL HEADER */}
                        {/* ================================= */}

                        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">

                            {/* MODAL TITLE */}
                            <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                                    <Plus size={21} />

                                </div>

                                <div className="min-w-0">

                                    <h2
                                        id="create-account-title"
                                        className="text-lg font-bold text-slate-900"
                                    >
                                        Create New Account
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Open another BANK-LEDGER account.
                                    </p>

                                </div>

                            </div>


                            {/* CLOSE BUTTON */}
                            <button
                                type="button"
                                onClick={closeCreateForm}
                                disabled={creating}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Close create account dialog"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* ================================= */}
                        {/* MODAL BODY */}
                        {/* ================================= */}

                        <form
                            onSubmit={handleSubmit}
                            className="overflow-y-auto p-5 sm:p-6"
                        >

                            {/* CURRENCY INPUT */}
                            <Input
                                label="Currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                placeholder="INR"
                            />


                            {/* SUPPORTED CURRENCY INFORMATION */}
                            <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3">

                                <p className="text-xs leading-5 text-blue-700">

                                    Currently supported currency:

                                    <span className="ml-1 font-bold">
                                        INR
                                    </span>

                                </p>

                            </div>


                            {/* MODAL ACTIONS */}
                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                {/* CANCEL */}
                                <button
                                    type="button"
                                    onClick={closeCreateForm}
                                    disabled={creating}
                                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                >
                                    Cancel
                                </button>


                                {/* CREATE */}
                                <Button
                                    type="submit"
                                    disabled={creating}
                                    className="min-h-12 w-full sm:w-auto"
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

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    )
}


export default UserAccounts