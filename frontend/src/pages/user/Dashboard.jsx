import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    WalletCards,
    ArrowLeftRight,
    Send,
    TrendingUp,
    CheckCircle2,
    ArrowDownLeft,
    ArrowUpRight,
    Eye,
    ChevronRight,
    ShieldCheck,
    AlertCircle,
    RefreshCw,
} from "lucide-react"

import Button from "../../components/common/Button"

import {
    getMyBalance,
    getMyAccounts,
    getMyTransactions,
} from "../../services/user.service"


/* =========================================================
   DASHBOARD COMPONENT
   Phase 1:
   - Responsive UI
   - Production-friendly spacing
   - Clear borders
   - Better mobile/tablet/desktop layout
   - Loading states
   - Error handling
   ========================================================= */

function Dashboard() {

    /* =====================================================
       NAVIGATION
       Used for moving between dashboard sections.
       ===================================================== */

    const navigate = useNavigate()


    /* =====================================================
       STATE
       ===================================================== */

    // Stores the current account balance.
    const [balance, setBalance] = useState(0)

    // Stores all user accounts.
    const [accounts, setAccounts] = useState([])

    // Stores user's transactions.
    const [transactions, setTransactions] = useState([])

    // Controls dashboard loading state.
    const [loading, setLoading] = useState(true)

    // Stores dashboard/API error message.
    const [error, setError] = useState("")


    /* =====================================================
       LOAD DASHBOARD DATA
       Fetches balance, accounts and transactions together.
       ===================================================== */

    async function loadDashboard() {

        try {

            // Start loading state.
            setLoading(true)

            // Clear previous error.
            setError("")


            /* -------------------------------------------------
               Load all dashboard information in parallel.

               Promise.all makes the requests run together
               instead of waiting for one request at a time.
               ------------------------------------------------- */

            const [
                balanceData,
                accountsData,
                transactionsData,
            ] = await Promise.all([
                getMyBalance(),
                getMyAccounts(),
                getMyTransactions(),
            ])


            /* -------------------------------------------------
               Debug logs.

               These are useful during development.
               ------------------------------------------------- */

            console.log(
                "DASHBOARD BALANCE:",
                balanceData
            )

            console.log(
                "DASHBOARD ACCOUNTS:",
                accountsData
            )

            console.log(
                "DASHBOARD TRANSACTIONS:",
                transactionsData
            )


            /* -------------------------------------------------
               Set balance.

               Supports both possible response structures:
               balanceData.balance
               balanceData.account.balance
               ------------------------------------------------- */

            setBalance(
                balanceData.balance ??
                balanceData.account?.balance ??
                0
            )


            /* -------------------------------------------------
               Store account data.
               ------------------------------------------------- */

            setAccounts(
                accountsData.accounts || []
            )


            /* -------------------------------------------------
               Store transaction data.
               ------------------------------------------------- */

            setTransactions(
                transactionsData.transactions || []
            )

        } catch (error) {

            /* -------------------------------------------------
               Log the actual API error for development.
               ------------------------------------------------- */

            console.error(
                "Dashboard Error:",
                error.response?.data ||
                error.message
            )


            /* -------------------------------------------------
               Display a user-friendly error message.
               ------------------------------------------------- */

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard."
            )

        } finally {

            // Stop loading state whether request succeeds
            // or fails.
            setLoading(false)

        }
    }


    /* =====================================================
       LOAD DASHBOARD WHEN COMPONENT MOUNTS
       ===================================================== */

    useEffect(() => {

        loadDashboard()

    }, [])


    /* =====================================================
       FORMAT CURRENCY
       Converts number into Indian Rupee format.
       ===================================================== */

    function formatAmount(amount) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(amount || 0)

    }


    /* =====================================================
       FORMAT DATE
       Example:
       25 Sep 2026
       ===================================================== */

    function formatDate(date) {

        if (!date) {
            return "N/A"
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        )

    }


    /* =====================================================
       FORMAT TIME
       Example:
       09:42 PM
       ===================================================== */

    function formatTime(date) {

        if (!date) {
            return ""
        }

        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        )

    }


    /* =====================================================
       SHORT TRANSACTION ID
       Keeps long MongoDB IDs readable.
       ===================================================== */

    function getShortId(id) {

        if (!id) {
            return "N/A"
        }

        const value = String(id)

        return `${value.slice(0, 7)}...${value.slice(-5)}`

    }


    /* =====================================================
       TRANSACTION TYPE
       ===================================================== */

    function getTransactionType(transaction) {

        if (transaction.type) {
            return transaction.type
        }

        return "TRANSFER"

    }


    /* =====================================================
       TRANSACTION ICON
       ===================================================== */

    function getTransactionIcon(transaction) {

        const type =
            getTransactionType(transaction)

        if (type === "CREDIT") {
            return ArrowDownLeft
        }

        if (type === "DEBIT") {
            return ArrowUpRight
        }

        return ArrowLeftRight

    }


    /* =====================================================
       TRANSACTION COLORS
       Credit = Green
       Debit  = Red
       ===================================================== */

    function getTransactionColor(transaction) {

        const type =
            getTransactionType(transaction)

        if (type === "CREDIT") {

            return {
                icon: "bg-emerald-50 text-emerald-600",
                amount: "text-emerald-600",
            }

        }

        return {
            icon: "bg-red-50 text-red-600",
            amount: "text-red-600",
        }

    }


    /* =====================================================
       TRANSACTION STATUS COLORS
       ===================================================== */

    function getStatusClasses(status) {

        switch (status) {

            case "COMPLETED":
                return "bg-emerald-50 text-emerald-700"

            case "PENDING":
                return "bg-amber-50 text-amber-700"

            case "FAILED":
                return "bg-red-50 text-red-700"

            case "REVERSED":
                return "bg-orange-50 text-orange-700"

            default:
                return "bg-slate-50 text-slate-600"

        }

    }


    /* =====================================================
       DASHBOARD STATISTICS
       ===================================================== */

    // Number of successfully completed transactions.
    const completedTransactions =
        transactions.filter(
            (transaction) =>
                transaction.status === "COMPLETED"
        ).length


    // Number of active accounts.
    const activeAccounts =
        accounts.filter(
            (account) =>
                account.status === "ACTIVE"
        ).length


    // Only show the latest five transactions.
    const recentTransactions =
        transactions.slice(0, 5)


    /* =====================================================
       RENDER
       ===================================================== */

    return (

        <div className="w-full space-y-5 sm:space-y-6 lg:space-y-7">


            {/* =================================================
                ERROR MESSAGE
                ================================================= */}

            {error && (

                <div
                    className="
                        flex flex-col gap-3
                        rounded-xl
                        border border-red-200
                        bg-red-50
                        p-4
                        shadow-sm
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        sm:p-5
                    "
                >

                    {/* Error information */}

                    <div className="flex min-w-0 items-start gap-3">

                        <AlertCircle
                            size={19}
                            className="
                                mt-0.5
                                shrink-0
                                text-red-600
                            "
                        />

                        <div className="min-w-0">

                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-red-700
                                "
                            >
                                Dashboard unavailable
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    leading-5
                                    text-red-600
                                "
                            >
                                {error}
                            </p>

                        </div>

                    </div>


                    {/* Retry button */}

                    <button
                        type="button"
                        onClick={loadDashboard}
                        className="
                            flex
                            min-h-10
                            w-full
                            shrink-0
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-red-200
                            bg-white
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-red-700
                            transition
                            hover:bg-red-100
                            active:scale-[0.98]
                            sm:w-auto
                        "
                    >

                        <RefreshCw
                            size={15}
                        />

                        Retry

                    </button>

                </div>

            )}


            {/* =================================================
                BALANCE HERO
                Main visual section of dashboard.
                ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-blue-900/30
                    bg-gradient-to-br
                    from-slate-950
                    via-blue-950
                    to-blue-700
                    p-5
                    text-white
                    shadow-lg
                    sm:rounded-3xl
                    sm:p-7
                    lg:p-8
                "
            >

                {/* Decorative background circle */}

                <div
                    className="
                        absolute
                        -right-20
                        -top-20
                        h-64
                        w-64
                        rounded-full
                        bg-white/5
                    "
                />


                {/* Decorative background circle */}

                <div
                    className="
                        absolute
                        -bottom-32
                        -left-20
                        h-72
                        w-72
                        rounded-full
                        bg-white/5
                    "
                />


                {/* Hero content */}

                <div className="relative">

                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                        "
                    >


                        {/* =================================================
                            BALANCE INFORMATION
                            ================================================= */}

                        <div className="min-w-0">

                            {/* Balance label */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white/10
                                    "
                                >

                                    <WalletCards
                                        size={18}
                                    />

                                </div>


                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-[0.16em]
                                        text-blue-200
                                    "
                                >
                                    Available Balance
                                </p>

                            </div>


                            {/* Balance amount */}

                            {loading ? (

                                <div
                                    className="
                                        mt-4
                                        h-10
                                        w-44
                                        animate-pulse
                                        rounded-lg
                                        bg-white/10
                                        sm:h-12
                                        sm:w-52
                                    "
                                />

                            ) : (

                                <h1
                                    className="
                                        mt-3
                                        break-words
                                        text-3xl
                                        font-extrabold
                                        tracking-tight
                                        sm:text-4xl
                                        lg:text-5xl
                                    "
                                >
                                    {formatAmount(balance)}
                                </h1>

                            )}


                            {/* Security status */}

                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    text-blue-200
                                    sm:text-sm
                                "
                            >

                                <CheckCircle2
                                    size={15}
                                    className="
                                        shrink-0
                                        text-emerald-300
                                    "
                                />

                                Secure account balance

                            </div>

                        </div>


                        {/* =================================================
                            SEND MONEY BUTTON
                            ================================================= */}

                        <Button
                            type="button"
                            onClick={() =>
                                navigate("/send-money")
                            }
                            className="
                                w-full
                                border
                                border-white/20
                                bg-white/10
                                text-white
                                shadow-none
                                hover:bg-white/20
                                sm:w-auto
                            "
                        >

                            <span
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                <Send
                                    size={18}
                                />

                                Send Money

                            </span>

                        </Button>

                    </div>

                </div>

            </section>


            {/* =================================================
                STATISTICS
                ================================================= */}

            <section
                className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:gap-4
                    lg:grid-cols-4
                    lg:gap-5
                "
            >


                {/* =================================================
                    ACCOUNTS CARD
                    ================================================= */}

                <div
                    className="
                        group
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        transition-shadow
                        duration-200
                        hover:shadow-md
                        sm:rounded-2xl
                        sm:p-5
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >

                        <div className="min-w-0">

                            <p
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                "
                            >
                                Accounts
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-2xl
                                    font-bold
                                    text-slate-800
                                "
                            >
                                {loading
                                    ? "—"
                                    : accounts.length}
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                            "
                        >

                            <WalletCards
                                size={17}
                            />

                        </div>

                    </div>


                    <p
                        className="
                            mt-3
                            text-xs
                            text-slate-400
                        "
                    >
                        {activeAccounts} active
                    </p>

                </div>


                {/* =================================================
                    COMPLETED TRANSACTIONS CARD
                    ================================================= */}

                <div
                    className="
                        group
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        transition-shadow
                        duration-200
                        hover:shadow-md
                        sm:rounded-2xl
                        sm:p-5
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >

                        <div className="min-w-0">

                            <p
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                "
                            >
                                Completed
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-2xl
                                    font-bold
                                    text-slate-800
                                "
                            >
                                {loading
                                    ? "—"
                                    : completedTransactions}
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-emerald-50
                                text-emerald-600
                            "
                        >

                            <CheckCircle2
                                size={17}
                            />

                        </div>

                    </div>


                    <p
                        className="
                            mt-3
                            text-xs
                            text-slate-400
                        "
                    >
                        Successful transfers
                    </p>

                </div>


                {/* =================================================
                    TRANSACTIONS CARD
                    ================================================= */}

                <div
                    className="
                        group
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        transition-shadow
                        duration-200
                        hover:shadow-md
                        sm:rounded-2xl
                        sm:p-5
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >

                        <div className="min-w-0">

                            <p
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                "
                            >
                                Transactions
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-2xl
                                    font-bold
                                    text-slate-800
                                "
                            >
                                {loading
                                    ? "—"
                                    : transactions.length}
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-purple-50
                                text-purple-600
                            "
                        >

                            <ArrowLeftRight
                                size={17}
                            />

                        </div>

                    </div>


                    <p
                        className="
                            mt-3
                            text-xs
                            text-slate-400
                        "
                    >
                        Total activity
                    </p>

                </div>


                {/* =================================================
                    ACCOUNT STATUS CARD
                    ================================================= */}

                <div
                    className="
                        group
                        col-span-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        transition-shadow
                        duration-200
                        hover:shadow-md
                        sm:col-span-1
                        sm:rounded-2xl
                        sm:p-5
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >

                        <div className="min-w-0">

                            <p
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                "
                            >
                                Account Status
                            </p>


                            <div
                                className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <span
                                    className={`
                                        h-2.5
                                        w-2.5
                                        shrink-0
                                        rounded-full
                                        ${
                                            activeAccounts > 0
                                                ? "bg-emerald-500"
                                                : "bg-slate-300"
                                        }
                                    `}
                                />

                                <span
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-700
                                    "
                                >
                                    {activeAccounts > 0
                                        ? "Active"
                                        : "No Active Account"}
                                </span>

                            </div>

                        </div>


                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-emerald-50
                                text-emerald-600
                            "
                        >

                            <ShieldCheck
                                size={17}
                            />

                        </div>

                    </div>


                    <p
                        className="
                            mt-3
                            text-xs
                            text-slate-400
                        "
                    >
                        Banking access
                    </p>

                </div>

            </section>


            {/* =================================================
                QUICK ACTIONS + RECENT TRANSACTIONS
                ================================================= */}

            <section
                className="
                    grid
                    grid-cols-1
                    gap-5
                    lg:grid-cols-[0.85fr_1.5fr]
                    lg:gap-6
                "
            >


                {/* =================================================
                    QUICK ACTIONS
                    ================================================= */}

                <div
                    className="
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        sm:rounded-2xl
                        sm:p-6
                    "
                >

                    {/* Section heading */}

                    <div>

                        <h2
                            className="
                                text-lg
                                font-bold
                                text-slate-800
                            "
                        >
                            Quick Actions
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                                sm:text-sm
                            "
                        >
                            Common banking actions
                        </p>

                    </div>


                    {/* Action buttons */}

                    <div
                        className="
                            mt-5
                            space-y-3
                        "
                    >


                        {/* Send Money */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/send-money")
                            }
                            className="
                                group
                                flex
                                min-h-16
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-3.5
                                text-left
                                transition-colors
                                duration-200
                                hover:border-blue-200
                                hover:bg-blue-50
                                active:scale-[0.99]
                                sm:p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-blue-100
                                    text-blue-600
                                "
                            >

                                <Send
                                    size={19}
                                />

                            </div>


                            <div
                                className="
                                    min-w-0
                                    flex-1
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                    "
                                >
                                    Send Money
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Transfer money securely
                                </p>

                            </div>


                            <ChevronRight
                                size={18}
                                className="
                                    shrink-0
                                    text-slate-300
                                    transition-colors
                                    group-hover:text-blue-600
                                "
                            />

                        </button>


                        {/* Accounts */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/accounts")
                            }
                            className="
                                group
                                flex
                                min-h-16
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-3.5
                                text-left
                                transition-colors
                                duration-200
                                hover:border-purple-200
                                hover:bg-purple-50
                                active:scale-[0.99]
                                sm:p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-purple-100
                                    text-purple-600
                                "
                            >

                                <WalletCards
                                    size={19}
                                />

                            </div>


                            <div
                                className="
                                    min-w-0
                                    flex-1
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                    "
                                >
                                    Accounts
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Manage your accounts
                                </p>

                            </div>


                            <ChevronRight
                                size={18}
                                className="
                                    shrink-0
                                    text-slate-300
                                    transition-colors
                                    group-hover:text-purple-600
                                "
                            />

                        </button>


                        {/* Funds */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/funds")
                            }
                            className="
                                group
                                flex
                                min-h-16
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-3.5
                                text-left
                                transition-colors
                                duration-200
                                hover:border-emerald-200
                                hover:bg-emerald-50
                                active:scale-[0.99]
                                sm:p-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-emerald-100
                                    text-emerald-600
                                "
                            >

                                <TrendingUp
                                    size={19}
                                />

                            </div>


                            <div
                                className="
                                    min-w-0
                                    flex-1
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-slate-800
                                    "
                                >
                                    Funds
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Manage account funding
                                </p>

                            </div>


                            <ChevronRight
                                size={18}
                                className="
                                    shrink-0
                                    text-slate-300
                                    transition-colors
                                    group-hover:text-emerald-600
                                "
                            />

                        </button>

                    </div>

                </div>


                {/* =================================================
                    RECENT TRANSACTIONS
                    ================================================= */}

                <div
                    className="
                        min-w-0
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        sm:rounded-2xl
                        sm:p-6
                    "
                >

                    {/* Heading */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >

                        <div className="min-w-0">

                            <h2
                                className="
                                    text-lg
                                    font-bold
                                    text-slate-800
                                "
                            >
                                Recent Transactions
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                    sm:text-sm
                                "
                            >
                                Your latest banking activity
                            </p>

                        </div>


                        {/* View all */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/transactions")
                            }
                            className="
                                flex
                                min-h-10
                                shrink-0
                                items-center
                                gap-1
                                rounded-lg
                                px-2
                                text-xs
                                font-bold
                                text-blue-600
                                transition-colors
                                hover:bg-blue-50
                                hover:text-blue-700
                                sm:text-sm
                            "
                        >

                            View All

                            <ChevronRight
                                size={15}
                            />

                        </button>

                    </div>


                    {/* Transactions area */}

                    <div className="mt-5">


                        {/* =================================================
                            LOADING SKELETON
                            ================================================= */}

                        {loading && (

                            <div
                                className="
                                    space-y-3
                                "
                            >

                                {[1, 2, 3].map(
                                    (item) => (

                                        <div
                                            key={item}
                                            className="
                                                h-16
                                                animate-pulse
                                                rounded-xl
                                                bg-slate-100
                                            "
                                        />

                                    )
                                )}

                            </div>

                        )}


                        {/* =================================================
                            EMPTY STATE
                            ================================================= */}

                        {!loading &&
                            recentTransactions.length === 0 && (

                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-dashed
                                        border-slate-200
                                        bg-slate-50
                                        px-5
                                        py-10
                                        text-center
                                    "
                                >

                                    <ArrowLeftRight
                                        size={30}
                                        className="
                                            text-slate-300
                                        "
                                    />

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            font-bold
                                            text-slate-600
                                        "
                                    >
                                        No transactions yet
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            max-w-xs
                                            text-xs
                                            leading-5
                                            text-slate-400
                                        "
                                    >
                                        Your recent banking activity
                                        will appear here.
                                    </p>

                                </div>

                            )}


                        {/* =================================================
                            TRANSACTION LIST
                            ================================================= */}

                        {!loading &&
                            recentTransactions.length > 0 && (

                                <div
                                    className="
                                        space-y-2.5
                                    "
                                >

                                    {recentTransactions.map(
                                        (transaction) => {

                                            /* ---------------------------------
                                               Get transaction information.
                                               --------------------------------- */

                                            const Icon =
                                                getTransactionIcon(
                                                    transaction
                                                )

                                            const colors =
                                                getTransactionColor(
                                                    transaction
                                                )

                                            const type =
                                                getTransactionType(
                                                    transaction
                                                )


                                            return (

                                                <button
                                                    type="button"
                                                    key={
                                                        transaction._id
                                                    }
                                                    onClick={() =>
                                                        navigate(
                                                            `/transactions/${transaction._id}`
                                                        )
                                                    }
                                                    className="
                                                        group
                                                        flex
                                                        w-full
                                                        items-center
                                                        gap-3
                                                        rounded-xl
                                                        border
                                                        border-slate-100
                                                        bg-white
                                                        p-3.5
                                                        text-left
                                                        transition-colors
                                                        duration-200
                                                        hover:border-blue-100
                                                        hover:bg-slate-50
                                                        active:scale-[0.99]
                                                        sm:p-4
                                                    "
                                                >


                                                    {/* Transaction icon */}

                                                    <div
                                                        className={`
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            ${colors.icon}
                                                        `}
                                                    >

                                                        <Icon
                                                            size={18}
                                                        />

                                                    </div>


                                                    {/* Transaction information */}

                                                    <div
                                                        className="
                                                            min-w-0
                                                            flex-1
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                truncate
                                                                text-sm
                                                                font-bold
                                                                text-slate-700
                                                            "
                                                        >

                                                            {type ===
                                                            "CREDIT"
                                                                ? "Money Received"
                                                                : "Money Sent"}

                                                        </p>


                                                        <div
                                                            className="
                                                                mt-1
                                                                flex
                                                                min-w-0
                                                                items-center
                                                                gap-2
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    truncate
                                                                    text-[11px]
                                                                    text-slate-400
                                                                "
                                                            >
                                                                {formatDate(
                                                                    transaction.createdAt
                                                                )}
                                                            </span>

                                                            <span
                                                                className="
                                                                    shrink-0
                                                                    text-slate-300
                                                                "
                                                            >
                                                                •
                                                            </span>

                                                            <span
                                                                className="
                                                                    shrink-0
                                                                    text-[11px]
                                                                    text-slate-400
                                                                "
                                                            >
                                                                {formatTime(
                                                                    transaction.createdAt
                                                                )}
                                                            </span>

                                                        </div>

                                                    </div>


                                                    {/* Amount + status */}

                                                    <div
                                                        className="
                                                            w-auto
                                                            shrink-0
                                                            text-right
                                                        "
                                                    >

                                                        <p
                                                            className={`
                                                                whitespace-nowrap
                                                                text-sm
                                                                font-bold
                                                                sm:text-base
                                                                ${colors.amount}
                                                            `}
                                                        >

                                                            {type ===
                                                            "CREDIT"
                                                                ? "+"
                                                                : "-"}

                                                            {formatAmount(
                                                                transaction.amount
                                                            )}

                                                        </p>


                                                        {/* Status badge */}

                                                        <span
                                                            className={`
                                                                mt-1
                                                                inline-flex
                                                                max-w-full
                                                                rounded-full
                                                                px-2
                                                                py-0.5
                                                                text-[9px]
                                                                font-bold
                                                                ${getStatusClasses(
                                                                    transaction.status
                                                                )}
                                                            `}
                                                        >

                                                            {
                                                                transaction.status
                                                            }

                                                        </span>

                                                    </div>


                                                    {/* View icon
                                                        Hidden on very small
                                                        screens to preserve space. */}

                                                    <Eye
                                                        size={16}
                                                        className="
                                                            hidden
                                                            shrink-0
                                                            text-slate-300
                                                            transition-colors
                                                            group-hover:text-blue-600
                                                            sm:block
                                                        "
                                                    />

                                                </button>

                                            )

                                        }
                                    )}

                                </div>

                            )}

                    </div>

                </div>

            </section>


            {/* =================================================
                SECURITY FOOTER
                ================================================= */}

            <section
                className="
                    rounded-xl
                    border
                    border-blue-100
                    bg-blue-50/60
                    p-4
                    shadow-sm
                    sm:rounded-2xl
                    sm:p-5
                "
            >

                <div
                    className="
                        flex
                        items-start
                        gap-3
                    "
                >

                    {/* Security icon */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-white
                            text-blue-600
                            shadow-sm
                        "
                    >

                        <ShieldCheck
                            size={19}
                        />

                    </div>


                    {/* Security message */}

                    <div className="min-w-0">

                        <h3
                            className="
                                text-sm
                                font-bold
                                text-slate-800
                            "
                        >
                            Secure Banking Dashboard
                        </h3>

                        <p
                            className="
                                mt-1
                                text-xs
                                leading-5
                                text-slate-500
                                sm:text-sm
                            "
                        >
                            Your account information and
                            transactions are loaded through
                            your authenticated session.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    )

}


/* =========================================================
   EXPORT
   ========================================================= */

export default Dashboard