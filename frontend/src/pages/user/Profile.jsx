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
} from "lucide-react"

import Card from "../../components/common/Card"

import {
    getMyAccounts,
    getAccountBalance,
} from "../../services/user.service"

import { useAuth } from "../../context/AuthContext"


function Profile() {

    const { user } = useAuth()

    const [accounts, setAccounts] = useState([])

    const [loading, setLoading] = useState(true)

    const [balanceLoading, setBalanceLoading] = useState(null)

    const [visibleBalances, setVisibleBalances] = useState({})

    const [balances, setBalances] = useState({})

    const [error, setError] = useState("")

    const [balanceError, setBalanceError] = useState("")


    async function loadAccounts() {

        try {

            setLoading(true)

            setError("")

            const data =
                await getMyAccounts()

            setAccounts(
                data.accounts || []
            )

        } catch (error) {

            console.error(
                "Profile Accounts Error:",
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


    async function handleCheckBalance(accountId) {

        try {

            setBalanceLoading(accountId)

            setBalanceError("")


            const data =
                await getAccountBalance(
                    accountId
                )


            console.log(
                "ACCOUNT BALANCE:",
                data
            )


            setBalances(
                (previous) => ({
                    ...previous,
                    [accountId]:
                        data.balance ??
                        data.account?.balance ??
                        0,
                })
            )


            setVisibleBalances(
                (previous) => ({
                    ...previous,
                    [accountId]: true,
                })
            )

        } catch (error) {

            console.error(
                "Balance Error:",
                error.response?.data ||
                error.message
            )

            setBalanceError(
                error.response?.data?.message ||
                "Failed to load account balance."
            )

        } finally {

            setBalanceLoading(null)

        }
    }


    function toggleBalance(accountId) {

        setVisibleBalances(
            (previous) => ({
                ...previous,
                [accountId]:
                    !previous[accountId],
            })
        )
    }


    function formatBalance(balance) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
            }
        ).format(balance || 0)

    }


    function formatDate(date) {

        if (!date) {
            return "N/A"
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        )

    }


    const activeAccounts =
        accounts.filter(
            (account) =>
                account.status === "ACTIVE"
        ).length


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm sm:h-12 sm:w-12">

                    <UserRound
                        size={22}
                    />

                </div>


                <div className="min-w-0">

                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                        Profile
                    </h1>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                        View your personal and account information.
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* PROFILE HERO */}
            {/* ================================= */}

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


                {/* Blue Header */}

                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 px-5 py-8 text-white sm:px-8 sm:py-10">


                    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10" />

                    <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/5" />


                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">


                        {/* Avatar */}

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-blue-100 shadow-lg backdrop-blur sm:h-24 sm:w-24">

                            <UserRound
                                size={38}
                                strokeWidth={1.8}
                            />

                        </div>


                        {/* User */}

                        <div className="min-w-0">

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
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


                {/* Profile Information */}

                <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">


                    <div className="p-5 sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                                <Mail
                                    size={18}
                                />

                            </div>

                            <div className="min-w-0">

                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                                    {user?.email || "N/A"}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="p-5 sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <CalendarDays
                                    size={18}
                                />

                            </div>

                            <div>

                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Member Since
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {formatDate(
                                        user?.createdAt
                                    )}
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="p-5 sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

                                <WalletCards
                                    size={18}
                                />

                            </div>

                            <div>

                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Accounts
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {accounts.length} Total
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* ACCOUNT SUMMARY */}
            {/* ================================= */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">


                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Total Accounts
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-800">
                        {accounts.length}
                    </p>

                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Active
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                        {activeAccounts}
                    </p>

                </div>


                <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:col-span-1 sm:p-5">

                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Account Status
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                        <span className="text-sm font-bold text-slate-700">
                            {activeAccounts > 0
                                ? "Active"
                                : "No Active Account"}
                        </span>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div>

                        <p className="text-sm font-bold text-red-700">
                            Unable to load accounts
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* BALANCE ERROR */}
            {/* ================================= */}

            {balanceError && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <p className="text-sm text-red-700">
                        {balanceError}
                    </p>

                </div>

            )}


            {/* ================================= */}
            {/* ACCOUNT LIST HEADER */}
            {/* ================================= */}

            <div>

                <div className="mb-4 flex items-center justify-between gap-3">

                    <div>

                        <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                            Your Accounts
                        </h2>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Check the balance and status of each account.
                        </p>

                    </div>

                    <WalletCards
                        size={22}
                        className="shrink-0 text-slate-300"
                    />

                </div>


                {/* ================================= */}
                {/* LOADING */}
                {/* ================================= */}

                {loading && (

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {[1, 2].map(
                            (item) => (

                                <div
                                    key={item}
                                    className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
                                />

                            )
                        )}

                    </div>

                )}


                {/* ================================= */}
                {/* EMPTY */}
                {/* ================================= */}

                {!loading &&
                    accounts.length === 0 && (

                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">

                                <WalletCards
                                    size={30}
                                />

                            </div>

                            <h3 className="mt-5 text-lg font-bold text-slate-800">
                                No Accounts
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                You don't have any accounts yet.
                            </p>

                        </div>

                    )}


                {/* ================================= */}
                {/* ACCOUNTS */}
                {/* ================================= */}

                {!loading &&
                    accounts.length > 0 && (

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                            {accounts.map(
                                (account) => {

                                    const accountId =
                                        account._id

                                    const isVisible =
                                        visibleBalances[
                                            accountId
                                        ]

                                    const balance =
                                        balances[
                                            accountId
                                        ]


                                    return (

                                        <div
                                            key={accountId}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
                                        >


                                            {/* Card Header */}

                                            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 p-5 text-white sm:p-6">

                                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

                                                <div className="relative flex items-start justify-between gap-4">

                                                    <div>

                                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">
                                                            BANK-LEDGER
                                                        </p>

                                                        <p className="mt-2 text-sm font-semibold text-white">
                                                            {account.currency ||
                                                                "INR"}{" "}
                                                            Account
                                                        </p>

                                                    </div>


                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">

                                                        <CreditCard
                                                            size={20}
                                                        />

                                                    </div>

                                                </div>


                                                {/* Balance */}

                                                <div className="relative mt-8">

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                                                        Available Balance
                                                    </p>


                                                    <div className="mt-1 flex items-center gap-3">

                                                        <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">

                                                            {isVisible
                                                                ? formatBalance(
                                                                    balance
                                                                )
                                                                : "••••••"}

                                                        </p>


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
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-100 transition hover:bg-white/10 hover:text-white"
                                                                aria-label={
                                                                    isVisible
                                                                        ? "Hide balance"
                                                                        : "Show balance"
                                                                }
                                                            >

                                                                {isVisible ? (

                                                                    <EyeOff
                                                                        size={16}
                                                                    />

                                                                ) : (

                                                                    <Eye
                                                                        size={16}
                                                                    />

                                                                )}

                                                            </button>

                                                        )}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Card Body */}

                                            <div className="p-5 sm:p-6">


                                                <div className="grid grid-cols-2 gap-3">


                                                    {/* Status */}

                                                    <div className="rounded-xl bg-slate-50 p-3">

                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                            Status
                                                        </p>

                                                        <div className="mt-2 flex items-center gap-2">

                                                            <span
                                                                className={`h-2.5 w-2.5 rounded-full ${
                                                                    account.status ===
                                                                    "ACTIVE"
                                                                        ? "bg-emerald-500"
                                                                        : account.status ===
                                                                          "FROZEN"
                                                                        ? "bg-yellow-500"
                                                                        : "bg-red-500"
                                                                }`}
                                                            />

                                                            <span className="truncate text-xs font-bold text-slate-700">
                                                                {account.status}
                                                            </span>

                                                        </div>

                                                    </div>


                                                    {/* Currency */}

                                                    <div className="rounded-xl bg-slate-50 p-3">

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

                                                <div className="mt-4 rounded-xl bg-slate-50 p-3">

                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        Account ID
                                                    </p>

                                                    <p className="mt-1 break-all font-mono text-[11px] leading-5 text-slate-500">
                                                        {accountId}
                                                    </p>

                                                </div>


                                                {/* Balance Button */}

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
                                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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

                                        </div>

                                    )

                                }
                            )}

                        </div>

                    )}

            </div>


            {/* ================================= */}
            {/* SECURITY FOOTER */}
            {/* ================================= */}

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                    <ShieldCheck
                        size={19}
                    />

                </div>


                <div>

                    <h3 className="text-sm font-bold text-slate-800">
                        Your account information is protected
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Account balances are loaded securely from
                        your authenticated banking session.
                    </p>

                </div>

            </div>

        </div>
    )
}


export default Profile