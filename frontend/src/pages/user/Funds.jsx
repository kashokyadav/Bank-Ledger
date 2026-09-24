import { useState } from "react"

import {
    WalletCards,
    ShieldCheck,
    Gift,
    IndianRupee,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Info,
    ArrowRight,
} from "lucide-react"

import Button from "../../components/common/Button"

import {
    requestInitialFunds,
    requestDemoFunds,
} from "../../services/user.service"


function Funds() {

    const [demoAmount, setDemoAmount] = useState("")

    const [initialLoading, setInitialLoading] = useState(false)

    const [demoLoading, setDemoLoading] = useState(false)

    const [success, setSuccess] = useState("")

    const [error, setError] = useState("")


    function clearMessages() {

        setSuccess("")
        setError("")

    }


    async function handleInitialFunds() {

        clearMessages()

        try {

            setInitialLoading(true)

            const data =
                await requestInitialFunds()

            setSuccess(
                data.message ||
                "Initial funds added successfully."
            )

        } catch (error) {

            console.error(
                "Initial Funds Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Unable to request initial funds."
            )

        } finally {

            setInitialLoading(false)

        }
    }


    function handleDemoAmountChange(event) {

        const value =
            event.target.value

        if (
            value === "" ||
            /^\d*\.?\d{0,2}$/.test(value)
        ) {

            setDemoAmount(value)

        }

    }


    async function handleDemoFunds(event) {

        event.preventDefault()

        clearMessages()

        const amount =
            Number(demoAmount)


        if (!amount || amount <= 0) {

            setError(
                "Please enter a valid amount."
            )

            return
        }


        if (amount > 500) {

            setError(
                "Demo funds cannot exceed ₹500 per request."
            )

            return
        }


        try {

            setDemoLoading(true)

            const data =
                await requestDemoFunds(amount)

            setSuccess(
                data.message ||
                "Demo funds added successfully."
            )

            setDemoAmount("")

        } catch (error) {

            console.error(
                "Demo Funds Error:",
                error.response?.data ||
                error.message
            )

            setError(
                error.response?.data?.message ||
                "Unable to request demo funds."
            )

        } finally {

            setDemoLoading(false)

        }
    }


    return (

        <div className="space-y-6 sm:space-y-7 lg:space-y-8">


            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm sm:h-12 sm:w-12">

                    <WalletCards
                        size={22}
                    />

                </div>


                <div className="min-w-0">

                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                        Funds
                    </h1>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                        Manage your initial and demo account funding.
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* SECURITY INFO */}
            {/* ================================= */}

            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">

                <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>

                    <p className="text-sm font-bold text-blue-800">
                        Secure Funding
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700 sm:text-sm">

                        Funding requests are securely processed
                        through the BANK-LEDGER transaction system.

                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* SUCCESS */}
            {/* ================================= */}

            {success && (

                <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">

                    <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div className="min-w-0">

                        <p className="text-sm font-bold text-emerald-700">
                            Funding Successful
                        </p>

                        <p className="mt-1 break-words text-sm leading-5 text-emerald-600">
                            {success}
                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">

                    <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div className="min-w-0">

                        <p className="text-sm font-bold text-red-700">
                            Funding Request Failed
                        </p>

                        <p className="mt-1 break-words text-sm leading-5 text-red-600">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ================================= */}
            {/* FUNDING CARDS */}
            {/* ================================= */}

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">


                {/* ================================= */}
                {/* INITIAL FUNDS */}
                {/* ================================= */}

                <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40">


                    {/* Card Header */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-6 text-white sm:p-7">


                        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />

                        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110" />


                        <div className="relative">


                            <div className="flex items-start justify-between gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

                                    <Gift
                                        size={23}
                                    />

                                </div>


                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-100">
                                    One Time
                                </span>

                            </div>


                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                                Initial Funding
                            </p>


                            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                                ₹1,000
                            </h2>


                            <p className="mt-2 max-w-sm text-sm leading-5 text-blue-100">
                                Get your initial account funding to start
                                using your BANK-LEDGER account.
                            </p>

                        </div>

                    </div>


                    {/* Card Body */}

                    <div className="p-5 sm:p-7">


                        <div className="space-y-3">


                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                <CheckCircle2
                                    size={17}
                                    className="shrink-0 text-emerald-500"
                                />

                                <span className="text-sm font-medium text-slate-600">
                                    One-time initial funding
                                </span>

                            </div>


                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                <CheckCircle2
                                    size={17}
                                    className="shrink-0 text-emerald-500"
                                />

                                <span className="text-sm font-medium text-slate-600">
                                    Fixed amount of ₹1,000
                                </span>

                            </div>


                            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                <CheckCircle2
                                    size={17}
                                    className="shrink-0 text-emerald-500"
                                />

                                <span className="text-sm font-medium text-slate-600">
                                    Added directly to your account
                                </span>

                            </div>

                        </div>


                        <Button
                            type="button"
                            onClick={handleInitialFunds}
                            disabled={
                                initialLoading ||
                                demoLoading
                            }
                            className="mt-6 w-full py-3.5"
                        >

                            {initialLoading ? (

                                <span className="flex items-center justify-center gap-2">

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Processing...

                                </span>

                            ) : (

                                <span className="flex items-center justify-center gap-2">

                                    <Gift
                                        size={18}
                                    />

                                    Request ₹1,000

                                    <ArrowRight
                                        size={17}
                                    />

                                </span>

                            )}

                        </Button>


                        <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                            Available once for an eligible account.
                        </p>

                    </div>

                </div>


                {/* ================================= */}
                {/* DEMO FUNDS */}
                {/* ================================= */}

                <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/40">


                    {/* Card Header */}

                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-6 text-white sm:p-7">


                        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-110" />

                        <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110" />


                        <div className="relative">


                            <div className="flex items-start justify-between gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

                                    <IndianRupee
                                        size={23}
                                    />

                                </div>


                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                                    Demo
                                </span>

                            </div>


                            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                                Demo Funding
                            </p>


                            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                                Up to ₹500
                            </h2>


                            <p className="mt-2 max-w-sm text-sm leading-5 text-emerald-100">
                                Add demo funds for testing transfers
                                and other banking features.
                            </p>

                        </div>

                    </div>


                    {/* Card Body */}

                    <form
                        onSubmit={handleDemoFunds}
                        className="p-5 sm:p-7"
                    >


                        <label
                            htmlFor="demoAmount"
                            className="text-sm font-bold text-slate-700"
                        >
                            Funding Amount
                        </label>


                        <div className="relative mt-2">

                            <IndianRupee
                                size={20}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                id="demoAmount"
                                type="text"
                                inputMode="decimal"
                                value={demoAmount}
                                onChange={
                                    handleDemoAmountChange
                                }
                                placeholder="Enter amount"
                                disabled={
                                    demoLoading ||
                                    initialLoading
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-xl font-bold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                            />

                        </div>


                        {/* Limit */}

                        <div className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-50 p-3">

                            <Info
                                size={16}
                                className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <p className="text-xs leading-5 text-emerald-700">

                                Maximum demo funding:
                                <span className="ml-1 font-bold">
                                    ₹500 per day
                                </span>

                            </p>

                        </div>


                        {/* Quick amounts */}

                        <div className="mt-5">

                            <p className="text-xs font-semibold text-slate-400">
                                Quick amount
                            </p>


                            <div className="mt-2 grid grid-cols-3 gap-2">

                                {[100, 250, 500].map(
                                    (value) => (

                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() =>
                                                setDemoAmount(
                                                    String(value)
                                                )
                                            }
                                            disabled={
                                                demoLoading ||
                                                initialLoading
                                            }
                                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                        >

                                            ₹{value}

                                        </button>

                                    )
                                )}

                            </div>

                        </div>


                        <Button
                            type="submit"
                            disabled={
                                demoLoading ||
                                initialLoading ||
                                !demoAmount ||
                                Number(demoAmount) <= 0
                            }
                            className="mt-6 w-full py-3.5"
                        >

                            {demoLoading ? (

                                <span className="flex items-center justify-center gap-2">

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Adding Funds...

                                </span>

                            ) : (

                                <span className="flex items-center justify-center gap-2">

                                    <WalletCards
                                        size={18}
                                    />

                                    Add Demo Funds

                                    <ArrowRight
                                        size={17}
                                    />

                                </span>

                            )}

                        </Button>


                        <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                            Demo funds are intended for testing purposes.
                        </p>

                    </form>

                </div>

            </div>


            {/* ================================= */}
            {/* INFORMATION */}
            {/* ================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">

                        <Info
                            size={19}
                        />

                    </div>


                    <div>

                        <h2 className="text-sm font-bold text-slate-800">
                            How funding works
                        </h2>

                        <div className="mt-3 space-y-2 text-xs leading-5 text-slate-500 sm:text-sm">

                            <p>
                                <span className="font-semibold text-slate-700">
                                    Initial Funds:
                                </span>{" "}
                                One-time ₹1,000 funding for an eligible account.
                            </p>

                            <p>
                                <span className="font-semibold text-slate-700">
                                    Demo Funds:
                                </span>{" "}
                                Request an amount for testing, subject to the
                                daily ₹500 limit.
                            </p>

                            <p>
                                <span className="font-semibold text-slate-700">
                                    Ledger:
                                </span>{" "}
                                Funding is recorded as a transaction in the
                                banking ledger.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}


export default Funds