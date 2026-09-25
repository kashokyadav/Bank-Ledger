import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    Send,
    WalletCards,
    Search,
    ArrowRight,
    UserRound,
    ShieldCheck,
    AlertCircle,
    RefreshCw,
    Users,
} from "lucide-react"

import { getRecipientAccounts } from "../../services/user.service"


function SendMoney() {

    const navigate = useNavigate()

    // =========================================
    // PAGE STATE
    // =========================================

    // Stores all available recipient accounts.
    const [recipients, setRecipients] = useState([])

    // Controls the initial loading state.
    const [loading, setLoading] = useState(true)

    // Stores recipient API errors.
    const [error, setError] = useState("")

    // Stores the search input.
    const [search, setSearch] = useState("")


    // =========================================
    // LOAD RECIPIENTS
    // =========================================

    async function loadRecipients() {

        try {

            // Start loading.
            setLoading(true)

            // Clear previous error.
            setError("")

            // Request recipient accounts.
            const data = await getRecipientAccounts()

            // Keep API response available during development.
            console.log("RECIPIENTS API:", data)

            // Support both possible backend response names.
            setRecipients(
                data.accounts ||
                data.recipients ||
                []
            )

        } catch (error) {

            // Log backend information for debugging.
            console.error(
                "Recipients API Error:",
                error.response?.data ||
                error.message
            )

            // Display backend error when available.
            setError(
                error.response?.data?.message ||
                "Failed to load recipient accounts."
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

        // Load recipients when page opens.
        loadRecipients()

    }, [])


    // =========================================
    // USER INFORMATION HELPERS
    // =========================================

    function getUserName(account) {

        // Prefer user's name and fall back to email.
        return (
            account.user?.name ||
            account.user?.email ||
            "Bank User"
        )
    }


    function getUserEmail(account) {

        // Display email when available.
        return (
            account.user?.email ||
            "Personal Account"
        )
    }


    // =========================================
    // ACCOUNT ID HELPER
    // =========================================

    function getShortId(id) {

        // Handle missing IDs.
        if (!id) {
            return "N/A"
        }

        // Convert the ID to string.
        const value = String(id)

        // Display a shorter readable ID.
        return `${value.slice(0, 8)}...${value.slice(-6)}`
    }


    // =========================================
    // SEARCH RECIPIENTS
    // =========================================

    const filteredRecipients =
        recipients.filter((account) => {

            // Normalize search text.
            const query =
                search.toLowerCase().trim()

            // Show all recipients when search is empty.
            if (!query) {
                return true
            }

            // Search by user name.
            const name =
                getUserName(account)
                    .toLowerCase()

            // Search by email.
            const email =
                getUserEmail(account)
                    .toLowerCase()

            // Search by account ID.
            const accountId =
                String(account._id || "")
                    .toLowerCase()

            // Return matching accounts.
            return (
                name.includes(query) ||
                email.includes(query) ||
                accountId.includes(query)
            )
        })


    // =========================================
    // PAGE UI
    // =========================================

    return (

        <div className="w-full space-y-5 sm:space-y-6 lg:space-y-7">

            {/* ========================================= */}
            {/* PAGE HEADER */}
            {/* ========================================= */}

            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* TITLE */}
                <div className="flex min-w-0 items-center gap-3">

                    {/* PAGE ICON */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">

                        <Send
                            size={22}
                            strokeWidth={2.2}
                        />

                    </div>

                    {/* TITLE CONTENT */}
                    <div className="min-w-0">

                        <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Send Money
                        </h1>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                            Choose a recipient to start a transfer.
                        </p>

                    </div>

                </div>

            </section>


            {/* ========================================= */}
            {/* SECURITY BANNER */}
            {/* ========================================= */}

            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:rounded-2xl sm:p-5">

                {/* SECURITY ICON */}
                <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                />

                {/* SECURITY MESSAGE */}
                <div className="min-w-0">

                    <p className="text-sm font-semibold text-blue-800">
                        Secure transfer
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700 sm:text-sm">
                        Select the recipient carefully before
                        entering the transfer amount.
                    </p>

                </div>

            </div>


            {/* ========================================= */}
            {/* ERROR MESSAGE */}
            {/* ========================================= */}

            {error && (

                <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm sm:rounded-2xl sm:p-5"
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
                                Unable to load recipients
                            </p>

                            <p className="mt-1 break-words text-sm leading-5 text-red-600">
                                {error}
                            </p>

                        </div>

                    </div>


                    {/* RETRY BUTTON */}
                    <button
                        type="button"
                        onClick={loadRecipients}
                        disabled={loading}
                        className="mt-4 flex min-h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <RefreshCw size={14} />

                        Try Again

                    </button>

                </div>

            )}


            {/* ========================================= */}
            {/* SEARCH SECTION */}
            {/* ========================================= */}

            {!error && (

                <section className="space-y-3">

                    {/* SEARCH LABEL */}
                    <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-2">

                            <Users
                                size={16}
                                className="text-slate-400"
                            />

                            <p className="text-sm font-semibold text-slate-700">
                                Select Recipient
                            </p>

                        </div>

                        {/* RESULT COUNT */}
                        {!loading && (
                            <span className="text-xs font-medium text-slate-400">
                                {filteredRecipients.length} available
                            </span>
                        )}

                    </div>


                    {/* SEARCH INPUT */}
                    <div className="relative">

                        {/* SEARCH ICON */}
                        <Search
                            size={19}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search by name, email or account ID..."
                            aria-label="Search recipient"
                            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pl-11 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:rounded-2xl"
                        />

                    </div>

                </section>

            )}


            {/* ========================================= */}
            {/* LOADING SKELETON */}
            {/* ========================================= */}

            {loading && (

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                        >

                            {/* TOP SKELETON */}
                            <div className="flex items-center gap-4">

                                <div className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-slate-200" />

                                <div className="min-w-0 flex-1 space-y-2">

                                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                                    <div className="h-3 w-44 animate-pulse rounded bg-slate-100" />

                                </div>

                                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />

                            </div>


                            {/* ACCOUNT SKELETON */}
                            <div className="mt-6 h-16 animate-pulse rounded-xl bg-slate-100" />

                            {/* BOTTOM SKELETON */}
                            <div className="mt-4 flex justify-between">

                                <div className="h-8 w-14 animate-pulse rounded-lg bg-slate-100" />

                                <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-100" />

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* ========================================= */}
            {/* NO RECIPIENTS / NO SEARCH RESULTS */}
            {/* ========================================= */}

            {!loading &&
                !error &&
                filteredRecipients.length === 0 && (

                    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-8 sm:py-16">

                        {/* EMPTY ICON */}
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-400">

                            {search ? (
                                <Search size={34} />
                            ) : (
                                <UserRound size={34} />
                            )}

                        </div>


                        {/* EMPTY TITLE */}
                        <h2 className="mt-6 text-xl font-bold text-slate-900">

                            {search
                                ? "No Recipients Found"
                                : "No Recipients Available"}

                        </h2>


                        {/* EMPTY DESCRIPTION */}
                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                            {search
                                ? "Try a different name, email or account ID."
                                : "There are currently no accounts available for transfer."}

                        </p>


                        {/* CLEAR SEARCH */}
                        {search && (

                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="mt-5 min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95"
                            >
                                Clear Search
                            </button>

                        )}

                    </div>

                )}


            {/* ========================================= */}
            {/* RECIPIENT CARDS */}
            {/* ========================================= */}

            {!loading &&
                !error &&
                filteredRecipients.length > 0 && (

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">

                        {filteredRecipients.map((account) => (

                            <button
                                type="button"
                                key={account._id}
                                onClick={() =>
                                    navigate(
                                        `/send-money/${account._id}`
                                    )
                                }
                                className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >

                                {/* ================================= */}
                                {/* RECIPIENT CARD */}
                                {/* ================================= */}

                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40 sm:p-6">

                                    {/* ================================= */}
                                    {/* RECIPIENT HEADER */}
                                    {/* ================================= */}

                                    <div className="flex items-center gap-4">

                                        {/* USER AVATAR */}
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105 sm:h-13 sm:w-13">

                                            <UserRound size={22} />

                                        </div>


                                        {/* USER INFORMATION */}
                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-base font-bold text-slate-900">
                                                {getUserName(account)}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-slate-500">
                                                {getUserEmail(account)}
                                            </p>

                                        </div>


                                        {/* ARROW */}
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                                            />

                                        </div>

                                    </div>


                                    {/* ================================= */}
                                    {/* ACCOUNT INFORMATION */}
                                    {/* ================================= */}

                                    <div className="mt-6">

                                        <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                                            {/* ACCOUNT LABEL */}
                                            <div className="flex min-w-0 items-center gap-2">

                                                <WalletCards
                                                    size={16}
                                                    className="shrink-0 text-slate-400"
                                                />

                                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                    Account
                                                </span>

                                            </div>


                                            {/* ACCOUNT ID */}
                                            <span className="min-w-0 break-all font-mono text-xs font-semibold text-slate-600 sm:text-right">
                                                {getShortId(account._id)}
                                            </span>

                                        </div>


                                        {/* ================================= */}
                                        {/* CURRENCY + ACTION */}
                                        {/* ================================= */}

                                        <div className="mt-4 flex items-center justify-between gap-3">

                                            {/* CURRENCY */}
                                            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
                                                {account.currency || "INR"}
                                            </span>


                                            {/* SELECT ACTION */}
                                            <span className="rounded-lg px-3 py-2 text-xs font-bold text-blue-600 transition group-hover:bg-blue-50">
                                                Select recipient →
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </button>

                        ))}

                    </div>

                )}

        </div>
    )
}


export default SendMoney    