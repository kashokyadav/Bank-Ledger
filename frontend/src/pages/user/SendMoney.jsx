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
} from "lucide-react"

import { getRecipientAccounts } from "../../services/user.service"


function SendMoney() {

    const navigate = useNavigate()

    const [recipients, setRecipients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")


    async function loadRecipients() {

        try {

            setLoading(true)
            setError("")

            const data = await getRecipientAccounts()

            console.log(
                "RECIPIENTS API:",
                data
            )

            setRecipients(
                data.accounts ||
                data.recipients ||
                []
            )

        } catch (error) {

            console.error(
                "Recipients API Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Failed to load recipient accounts."
            )

        } finally {

            setLoading(false)

        }

    }


    useEffect(() => {
        loadRecipients()
    }, [])


    function getUserName(account) {

        return (
            account.user?.name ||
            account.user?.email ||
            "Bank User"
        )

    }


    function getUserEmail(account) {

        return (
            account.user?.email ||
            "Personal Account"
        )

    }


    function getShortId(id) {

        if (!id) {
            return "N/A"
        }

        const value = String(id)

        return `${value.slice(0, 8)}...${value.slice(-6)}`

    }


    const filteredRecipients =
        recipients.filter((account) => {

            const query =
                search.toLowerCase().trim()

            if (!query) {
                return true
            }

            const name =
                getUserName(account)
                    .toLowerCase()

            const email =
                getUserEmail(account)
                    .toLowerCase()

            const accountId =
                String(account._id || "")
                    .toLowerCase()

            return (
                name.includes(query) ||
                email.includes(query) ||
                accountId.includes(query)
            )

        })


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* PAGE HEADER */}
            {/* ================================= */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-4">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-100
                            text-blue-600
                            shadow-sm
                            sm:h-14
                            sm:w-14
                        "
                    >
                        <Send size={23} />
                    </div>


                    <div className="min-w-0">

                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            Send Money
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Choose a recipient to start a transfer.
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* SECURITY BANNER */}
            {/* ================================= */}

            <div
                className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-blue-100
                    bg-blue-50
                    p-4
                    sm:p-5
                "
            >

                <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                />

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


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div
                    className="
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        sm:p-5
                    "
                >

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div className="min-w-0">

                        <p className="text-sm font-semibold text-red-700">
                            Unable to load recipients
                        </p>

                        <p className="mt-1 break-words text-sm leading-5 text-red-600">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={loadRecipients}
                            className="
                                mt-4
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-2
                                py-1
                                text-xs
                                font-bold
                                text-red-700
                                transition
                                hover:bg-red-100
                            "
                        >

                            <RefreshCw size={14} />

                            Try Again

                        </button>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* SEARCH */}
            {/* ================================= */}

            {!error && (

                <div className="relative">

                    <Search
                        size={19}
                        className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search by name, email or account ID..."
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3.5
                            pl-11
                            text-sm
                            text-slate-700
                            shadow-sm
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-slate-400
                            focus:border-blue-400
                            focus:ring-4
                            focus:ring-blue-100
                        "
                    />

                </div>

            )}


            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {loading && (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="
                                h-40
                                animate-pulse
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                shadow-sm
                            "
                        />

                    ))}

                </div>

            )}


            {/* ================================= */}
            {/* NO RECIPIENTS */}
            {/* ================================= */}

            {!loading &&
                !error &&
                filteredRecipients.length === 0 && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            px-5
                            py-14
                            text-center
                            shadow-sm
                            sm:px-8
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-3xl
                                bg-slate-50
                                text-slate-400
                            "
                        >

                            <UserRound size={34} />

                        </div>


                        <h2 className="mt-6 text-xl font-bold text-slate-800">
                            No Recipients Found
                        </h2>


                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {search
                                ? "Try a different name, email or account ID."
                                : "There are currently no accounts available for transfer."
                            }
                        </p>

                    </div>

                )}


            {/* ================================= */}
            {/* RECIPIENTS */}
            {/* ================================= */}

            {!loading &&
                !error &&
                filteredRecipients.length > 0 && (

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-5
                            md:grid-cols-2
                            lg:gap-6
                        "
                    >

                        {filteredRecipients.map((account) => (

                            <button
                                type="button"
                                key={account._id}
                                onClick={() =>
                                    navigate(
                                        `/send-money/${account._id}`
                                    )
                                }
                                className="
                                    group
                                    w-full
                                    text-left
                                    focus:outline-none
                                "
                            >

                                {/* ================================= */}
                                {/* RECIPIENT CARD */}
                                {/* ================================= */}

                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        bg-white
                                        p-5
                                        shadow-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-200
                                        hover:shadow-xl
                                        hover:shadow-blue-100/40
                                        focus-within:ring-2
                                        focus-within:ring-blue-500
                                        sm:p-6
                                    "
                                >

                                    {/* TOP SECTION */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        {/* Avatar */}

                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-2xl
                                                bg-gradient-to-br
                                                from-blue-100
                                                to-blue-50
                                                text-blue-600
                                                transition-transform
                                                duration-300
                                                group-hover:scale-105
                                                sm:h-13
                                                sm:w-13
                                            "
                                        >

                                            <UserRound size={22} />

                                        </div>


                                        {/* USER INFORMATION */}

                                        <div className="min-w-0 flex-1">

                                            <p
                                                className="
                                                    truncate
                                                    text-base
                                                    font-bold
                                                    text-slate-800
                                                "
                                            >
                                                {getUserName(account)}
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    truncate
                                                    text-xs
                                                    text-slate-500
                                                "
                                            >
                                                {getUserEmail(account)}
                                            </p>

                                        </div>


                                        {/* ARROW */}

                                        <div
                                            className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-slate-50
                                                text-slate-400
                                                transition-all
                                                duration-300
                                                group-hover:bg-blue-600
                                                group-hover:text-white
                                            "
                                        >

                                            <ArrowRight
                                                size={17}
                                                className="
                                                    transition-transform
                                                    duration-300
                                                    group-hover:translate-x-0.5
                                                "
                                            />

                                        </div>

                                    </div>


                                    {/* SPACE BETWEEN TOP AND ACCOUNT */}

                                    <div className="mt-6">


                                        {/* ACCOUNT INFORMATION */}

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-3
                                                rounded-xl
                                                border
                                                border-slate-100
                                                bg-slate-50
                                                p-4
                                                sm:flex-row
                                                sm:items-center
                                                sm:justify-between
                                            "
                                        >

                                            {/* ACCOUNT LABEL */}

                                            <div
                                                className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-2
                                                "
                                            >

                                                <WalletCards
                                                    size={16}
                                                    className="shrink-0 text-slate-400"
                                                />

                                                <span
                                                    className="
                                                        text-[11px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wider
                                                        text-slate-400
                                                    "
                                                >
                                                    Account
                                                </span>

                                            </div>


                                            {/* ACCOUNT ID */}

                                            <span
                                                className="
                                                    min-w-0
                                                    break-all
                                                    font-mono
                                                    text-xs
                                                    font-semibold
                                                    text-slate-600
                                                    sm:text-right
                                                "
                                            >
                                                {getShortId(account._id)}
                                            </span>

                                        </div>


                                        {/* BOTTOM INFORMATION */}

                                        <div
                                            className="
                                                mt-4
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                rounded-xl
                                                border
                                                border-slate-100
                                                bg-white
                                                px-1
                                                py-1
                                            "
                                        >

                                            <span
                                                className="
                                                    rounded-lg
                                                    bg-slate-100
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-semibold
                                                    text-slate-500
                                                "
                                            >
                                                {account.currency || "INR"}
                                            </span>


                                            <span
                                                className="
                                                    rounded-lg
                                                    px-3
                                                    py-2
                                                    text-xs
                                                    font-bold
                                                    text-blue-600
                                                    transition
                                                    group-hover:bg-blue-50
                                                "
                                            >
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