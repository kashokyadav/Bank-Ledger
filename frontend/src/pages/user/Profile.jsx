import { useEffect, useState } from "react"

import {
    UserRound,
    Mail,
    CalendarDays,
    WalletCards,
    ShieldCheck,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    Loader2,
    CreditCard,
    RefreshCw,
} from "lucide-react"

import Card from "../../components/common/Card"

import {
    getMyAccounts,
    getAccountBalance,
} from "../../services/user.service"

import { useAuth } from "../../context/AuthContext"


// =====================================================
// PROFILE PAGE
// =====================================================

function Profile() {

    // Get authenticated user from AuthContext.
    const { user } = useAuth()


    // =================================================
    // STATE
    // =================================================

    // Store all user accounts.
    const [accounts, setAccounts] = useState([])

    // Main accounts loading state.
    const [loading, setLoading] = useState(true)

    // Store which account is currently checking balance.
    const [balanceLoading, setBalanceLoading] = useState(null)

    // Store visibility state for each account balance.
    const [visibleBalances, setVisibleBalances] = useState({})

    // Store loaded balances by account ID.
    const [balances, setBalances] = useState({})

    // Main accounts error.
    const [error, setError] = useState("")

    // Individual balance error.
    const [balanceError, setBalanceError] = useState("")


    // =================================================
    // LOAD ACCOUNTS
    // =================================================

    async function loadAccounts() {

        try {

            // Start loading.
            setLoading(true)

            // Clear previous error.
            setError("")


            // Request user's accounts from backend.
            const data = await getMyAccounts()


            // Store returned accounts.
            setAccounts(
                data.accounts || []
            )

        } catch (error) {

            // Log error for development/debugging.
            console.error(
                "Profile Accounts Error:",
                error.response?.data ||
                error.message
            )


            // Show backend error when available.
            setError(
                error.response?.data?.message ||
                "Failed to load accounts."
            )

        } finally {

            // Stop loading.
            setLoading(false)

        }
    }


    // =================================================
    // LOAD ACCOUNTS ON PAGE OPEN
    // =================================================

    useEffect(() => {

        // Load account information when profile opens.
        loadAccounts()

    }, [])


    // =================================================
    // CHECK ACCOUNT BALANCE
    // =================================================

    async function handleCheckBalance(accountId) {

        try {

            // Show loading state only for selected account.
            setBalanceLoading(accountId)

            // Clear previous balance error.
            setBalanceError("")


            // Request balance from backend.
            const data = await getAccountBalance(
                accountId
            )


            // Store balance using account ID.
            setBalances(
                (previous) => ({
                    ...previous,
                    [accountId]:
                        data.balance ??
                        data.account?.balance ??
                        0,
                })
            )


            // Automatically reveal balance after loading.
            setVisibleBalances(
                (previous) => ({
                    ...previous,
                    [accountId]: true,
                })
            )

        } catch (error) {

            // Log balance error.
            console.error(
                "Balance Error:",
                error.response?.data ||
                error.message
            )


            // Show balance error.
            setBalanceError(
                error.response?.data?.message ||
                "Failed to load account balance."
            )

        } finally {

            // Stop balance loading.
            setBalanceLoading(null)

        }
    }


    // =================================================
    // TOGGLE BALANCE VISIBILITY
    // =================================================

    function toggleBalance(accountId) {

        // Toggle visibility for selected account.
        setVisibleBalances(
            (previous) => ({
                ...previous,
                [accountId]:
                    !previous[accountId],
            })
        )
    }


    // =================================================
    // FORMAT BALANCE
    // =================================================

    function formatBalance(balance) {

        // Format number using Indian Rupee format.
        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(balance || 0)
    }


    // =================================================
    // FORMAT DATE
    // =================================================

    function formatDate(date) {

        // Handle missing date.
        if (!date) {
            return "N/A"
        }


        // Convert date into readable format.
        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        )
    }


    // =================================================
    // ACCOUNT SUMMARY
    // =================================================

    // Count only active accounts.
    const activeAccounts =
        accounts.filter(
            (account) =>
                account.status === "ACTIVE"
        ).length


    // =================================================
    // RENDER
    // =================================================

    return (

        <div className="w-full space-y-5 sm:space-y-6 lg:space-y-7">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="flex items-start gap-3">

                {/* Page icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-12 sm:w-12">

                    <UserRound
                        size={22}
                    />

                </div>


                {/* Page title */}
                <div className="min-w-0">

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Profile
                    </h1>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        View your personal and account information.
                    </p>

                </div>

            </div>


            {/* =================================================
                PROFILE HERO
            ================================================= */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

                {/* Profile banner */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 px-5 py-7 text-white sm:px-7 sm:py-9">

                    {/* Decorative background circle */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                    {/* Decorative background circle */}
                    <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/5" />


                    {/* User information */}
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* Avatar */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-blue-100 shadow-lg backdrop-blur sm:h-24 sm:w-24">

                            <UserRound
                                size={38}
                                strokeWidth={1.8}
                            />

                        </div>


                        {/* User details */}
                        <div className="min-w-0">

                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
                                Personal Profile
                            </p>

                            <h2 className="mt-1 truncate text-2xl font-extrabold sm:text-3xl">
                                {user?.name || "User"}
                            </h2>

                            <p className="mt-1 truncate text-sm text-blue-100">
                                {user?.email || "No email available"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Profile information */}
                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                    {/* Email */}
                    <div className="p-5 sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">

                                <Mail size={18} />

                            </div>


                            <div className="min-w-0">

                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                                    {user?.email || "N/A"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Member since */}
                    <div className="p-5 sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">

                                <CalendarDays size={18} />

                            </div>


                            <div className="min-w-0">

                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Member Since
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {formatDate(user?.createdAt)}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Accounts */}
                    <div className="p-5 sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600">

                                <WalletCards size={18} />

                            </div>


                            <div>

                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Accounts
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {accounts.length} Total
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                ACCOUNT SUMMARY
            ================================================= */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

                {/* Total accounts */}
                <SummaryCard
                    title="Total Accounts"
                    value={accounts.length}
                    icon={
                        <WalletCards size={18} />
                    }
                    iconClassName="bg-blue-50 text-blue-600 border-blue-100"
                />


                {/* Active accounts */}
                <SummaryCard
                    title="Active Accounts"
                    value={activeAccounts}
                    valueClassName="text-emerald-600"
                    icon={
                        <CheckCircle2 size={18} />
                    }
                    iconClassName="bg-emerald-50 text-emerald-600 border-emerald-100"
                />


                {/* Account status */}
                <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-1 sm:p-5">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Account Status
                    </p>

                    <div className="mt-3 flex items-center gap-2">

                        <span
                            className={`
                                h-2.5
                                w-2.5
                                rounded-full
                                ${
                                    activeAccounts > 0
                                        ? "bg-emerald-500"
                                        : "bg-slate-300"
                                }
                            `}
                        />

                        <span className="truncate text-sm font-bold text-slate-700">
                            {activeAccounts > 0
                                ? "Active"
                                : "No Active Account"}
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================================
                ACCOUNT ERROR
            ================================================= */}

            {error && (

                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                >

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />


                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-red-700">
                            Unable to load accounts
                        </p>

                        <p className="mt-1 break-words text-sm leading-5 text-red-600">
                            {error}
                        </p>


                        {/* Retry button */}
                        <button
                            type="button"
                            onClick={loadAccounts}
                            className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
                        >

                            <RefreshCw size={14} />

                            Try Again

                        </button>

                    </div>

                </div>

            )}


            {/* =================================================
                BALANCE ERROR
            ================================================= */}

            {balanceError && (

                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                >

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />


                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-bold text-red-700">
                            Unable to check balance
                        </p>

                        <p className="mt-1 break-words text-sm text-red-600">
                            {balanceError}
                        </p>

                    </div>

                </div>

            )}


            {/* =================================================
                ACCOUNTS SECTION
            ================================================= */}

            <section>

                {/* Section heading */}
                <div className="mb-4 flex items-center justify-between gap-3">

                    <div className="min-w-0">

                        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                            Your Accounts
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                            Check the balance and status of each account.
                        </p>

                    </div>


                    <WalletCards
                        size={22}
                        className="shrink-0 text-slate-300"
                    />

                </div>


                {/* =============================================
                    LOADING SKELETON
                ============================================== */}

                {loading && (

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {[1, 2].map(
                            (item) => (

                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                                >

                                    {/* Header skeleton */}
                                    <div className="h-44 animate-pulse bg-slate-200" />

                                    {/* Body skeleton */}
                                    <div className="space-y-4 p-5">

                                        <div className="grid grid-cols-2 gap-3">

                                            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

                                            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

                                        </div>

                                        <div className="h-14 animate-pulse rounded-xl bg-slate-100" />

                                        <div className="h-11 animate-pulse rounded-xl bg-slate-100" />

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}


                {/* =============================================
                    EMPTY STATE
                ============================================== */}

                {!loading &&
                    accounts.length === 0 && (

                        <Card>

                            <div className="flex flex-col items-center justify-center px-5 py-12 text-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">

                                    <WalletCards size={30} />

                                </div>


                                <h3 className="mt-5 text-lg font-bold text-slate-800">
                                    No Accounts
                                </h3>


                                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                    You don't have any accounts yet.
                                </p>

                            </div>

                        </Card>

                    )}


                {/* =============================================
                    ACCOUNT CARDS
                ============================================== */}

                {!loading &&
                    accounts.length > 0 && (

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            {accounts.map(
                                (account) => {

                                    // Get account ID.
                                    const accountId =
                                        account._id


                                    // Check whether balance is visible.
                                    const isVisible =
                                        visibleBalances[
                                            accountId
                                        ]


                                    // Get loaded balance.
                                    const balance =
                                        balances[
                                            accountId
                                        ]


                                    // Determine account status color.
                                    const statusColor =
                                        account.status ===
                                        "ACTIVE"
                                            ? "bg-emerald-500"
                                            : account.status ===
                                              "FROZEN"
                                            ? "bg-amber-500"
                                            : "bg-red-500"


                                    return (

                                        <article
                                            key={accountId}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                                        >

                                            {/* =================================
                                                ACCOUNT CARD HEADER
                                            ================================= */}

                                            <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-5 text-white sm:p-6">

                                                {/* Decorative circle */}
                                                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />


                                                {/* Header content */}
                                                <div className="relative flex items-start justify-between gap-4">

                                                    <div className="min-w-0">

                                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">
                                                            BANK-LEDGER
                                                        </p>

                                                        <p className="mt-2 text-sm font-semibold">
                                                            {account.currency ||
                                                                "INR"}{" "}
                                                            Account
                                                        </p>

                                                    </div>


                                                    {/* Card icon */}
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">

                                                        <CreditCard size={20} />

                                                    </div>

                                                </div>


                                                {/* =================================
                                                    BALANCE
                                                ================================= */}

                                                <div className="relative mt-7">

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                                                        Available Balance
                                                    </p>


                                                    <div className="mt-1 flex min-w-0 items-center gap-2">

                                                        <p className="min-w-0 truncate text-2xl font-extrabold tracking-tight sm:text-3xl">

                                                            {isVisible
                                                                ? formatBalance(
                                                                    balance
                                                                )
                                                                : "••••••"}

                                                        </p>


                                                        {/* Balance visibility */}
                                                        {balances[
                                                            accountId
                                                        ] !==
                                                            undefined && (

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    toggleBalance(
                                                                        accountId
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-blue-100 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                                                                aria-label={
                                                                    isVisible
                                                                        ? "Hide balance"
                                                                        : "Show balance"
                                                                }
                                                            >

                                                                {isVisible ? (

                                                                    <EyeOff
                                                                        size={17}
                                                                    />

                                                                ) : (

                                                                    <Eye
                                                                        size={17}
                                                                    />

                                                                )}

                                                            </button>

                                                        )}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* =================================
                                                ACCOUNT BODY
                                            ================================= */}

                                            <div className="p-5 sm:p-6">

                                                {/* Status + currency */}
                                                <div className="grid grid-cols-2 gap-3">

                                                    {/* Status */}
                                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                            Status
                                                        </p>


                                                        <div className="mt-2 flex items-center gap-2">

                                                            <span
                                                                className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusColor}`}
                                                            />

                                                            <span className="truncate text-xs font-bold text-slate-700">
                                                                {account.status}
                                                            </span>

                                                        </div>

                                                    </div>


                                                    {/* Currency */}
                                                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                            Currency
                                                        </p>

                                                        <p className="mt-2 text-sm font-bold text-slate-700">
                                                            {account.currency ||
                                                                "INR"}
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Account ID */}
                                                <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        Account ID
                                                    </p>

                                                    <p className="mt-1 break-all font-mono text-[11px] leading-5 text-slate-500">
                                                        {accountId}
                                                    </p>

                                                </div>


                                                {/* Check balance button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCheckBalance(
                                                            accountId
                                                        )
                                                    }
                                                    disabled={
                                                        balanceLoading ===
                                                        accountId
                                                    }
                                                    className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                                >

                                                    {balanceLoading ===
                                                    accountId ? (

                                                        <>
                                                            <Loader2
                                                                size={17}
                                                                className="animate-spin"
                                                            />

                                                            Checking Balance...
                                                        </>

                                                    ) : (

                                                        <>
                                                            <Eye
                                                                size={17}
                                                            />

                                                            Check Balance
                                                        </>

                                                    )}

                                                </button>

                                            </div>

                                        </article>

                                    )
                                }
                            )}

                        </div>

                    )}

            </section>


            {/* =================================================
                SECURITY INFORMATION
            ================================================= */}

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                {/* Security icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">

                    <ShieldCheck size={19} />

                </div>


                {/* Security text */}
                <div className="min-w-0">

                    <h3 className="text-sm font-bold text-slate-800">
                        Your account information is protected
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Account balances are loaded securely from your
                        authenticated banking session.
                    </p>

                </div>

            </div>

        </div>
    )
}


// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
    title,
    value,
    icon,
    iconClassName,
    valueClassName = "text-slate-800",
}) {

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {title}
                    </p>

                    <p
                        className={`mt-2 text-2xl font-bold ${valueClassName}`}
                    >
                        {value}
                    </p>

                </div>


                {/* Summary icon */}
                <div
                    className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        ${iconClassName}
                    `}
                >
                    {icon}
                </div>

            </div>

        </div>
    )
}


export default Profile