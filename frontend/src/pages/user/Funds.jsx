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
    Sparkles,
    RefreshCw,
} from "lucide-react"

import Button from "../../components/common/Button"

import {
    requestInitialFunds,
    requestDemoFunds,
} from "../../services/user.service"


// =====================================================
// FUNDS PAGE
// =====================================================

function Funds() {

    // -------------------------------------------------
    // FORM STATE
    // -------------------------------------------------

    // Store the amount entered for demo funding.
    const [demoAmount, setDemoAmount] = useState("")


    // -------------------------------------------------
    // LOADING STATE
    // -------------------------------------------------

    // Loading state for initial funding.
    const [initialLoading, setInitialLoading] = useState(false)

    // Loading state for demo funding.
    const [demoLoading, setDemoLoading] = useState(false)


    // -------------------------------------------------
    // MESSAGE STATE
    // -------------------------------------------------

    // Success message shown after successful funding.
    const [success, setSuccess] = useState("")

    // Error message shown when funding fails.
    const [error, setError] = useState("")


    // =================================================
    // CLEAR MESSAGES
    // =================================================

    function clearMessages() {

        // Remove previous success message.
        setSuccess("")

        // Remove previous error message.
        setError("")
    }


    // =================================================
    // REQUEST INITIAL FUNDS
    // =================================================

    async function handleInitialFunds() {

        // Clear old messages before starting.
        clearMessages()


        try {

            // Start loading state.
            setInitialLoading(true)


            // Request initial funds from backend.
            const data =
                await requestInitialFunds()


            // Display backend success message.
            setSuccess(
                data.message ||
                "Initial funds added successfully."
            )

        } catch (error) {

            // Log backend error for debugging.
            console.error(
                "Initial Funds Error:",
                error.response?.data ||
                error.message
            )


            // Display useful error message.
            setError(
                error.response?.data?.message ||
                "Unable to request initial funds."
            )

        } finally {

            // Stop loading state.
            setInitialLoading(false)

        }
    }


    // =================================================
    // DEMO AMOUNT INPUT
    // =================================================

    function handleDemoAmountChange(event) {

        // Read input value.
        const value =
            event.target.value


        // Allow only numbers with maximum two decimal places.
        if (
            value === "" ||
            /^\d*\.?\d{0,2}$/.test(value)
        ) {

            // Update demo amount.
            setDemoAmount(value)

        }
    }


    // =================================================
    // REQUEST DEMO FUNDS
    // =================================================

    async function handleDemoFunds(event) {

        // Prevent browser form refresh.
        event.preventDefault()


        // Clear old messages.
        clearMessages()


        // Convert input to number.
        const amount =
            Number(demoAmount)


        // Validate amount.
        if (!amount || amount <= 0) {

            setError(
                "Please enter a valid amount."
            )

            return
        }


        // Enforce maximum demo funding limit.
        if (amount > 500) {

            setError(
                "Demo funds cannot exceed ₹500 per request."
            )

            return
        }


        try {

            // Start demo loading.
            setDemoLoading(true)


            // Request demo funds from backend.
            const data =
                await requestDemoFunds(amount)


            // Display backend success message.
            setSuccess(
                data.message ||
                "Demo funds added successfully."
            )


            // Clear input after success.
            setDemoAmount("")

        } catch (error) {

            // Log error for debugging.
            console.error(
                "Demo Funds Error:",
                error.response?.data ||
                error.message
            )


            // Display useful error message.
            setError(
                error.response?.data?.message ||
                "Unable to request demo funds."
            )

        } finally {

            // Stop loading.
            setDemoLoading(false)

        }
    }


    // =================================================
    // PAGE
    // =================================================

    return (

        <div className="w-full space-y-6 sm:space-y-7 lg:space-y-8">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="flex items-start gap-3">

                {/* Header icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-12 sm:w-12">

                    <WalletCards
                        size={22}
                    />

                </div>


                {/* Header text */}
                <div className="min-w-0">

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Funds
                    </h1>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                        Add initial or demo funds to your BANK-LEDGER account.
                    </p>

                </div>

            </div>


            {/* =================================================
                SECURITY BANNER
            ================================================= */}

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">

                <div className="flex items-start gap-3">

                    {/* Security icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">

                        <ShieldCheck
                            size={20}
                        />

                    </div>


                    {/* Security information */}
                    <div className="min-w-0">

                        <p className="text-sm font-bold text-blue-900">
                            Secure Funding
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700 sm:text-sm">
                            Funding requests are securely processed through
                            the BANK-LEDGER transaction system.
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {success && (

                <div
                    role="alert"
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5"
                >

                    <div className="flex items-start gap-3">

                        {/* Success icon */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">

                            <CheckCircle2
                                size={19}
                            />

                        </div>


                        {/* Success content */}
                        <div className="min-w-0">

                            <p className="text-sm font-bold text-emerald-800">
                                Funding Successful
                            </p>

                            <p className="mt-1 break-words text-sm leading-5 text-emerald-700">
                                {success}
                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5"
                >

                    <div className="flex items-start gap-3">

                        {/* Error icon */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-600 shadow-sm">

                            <AlertCircle
                                size={19}
                            />

                        </div>


                        {/* Error content */}
                        <div className="min-w-0 flex-1">

                            <p className="text-sm font-bold text-red-800">
                                Funding Request Failed
                            </p>

                            <p className="mt-1 break-words text-sm leading-5 text-red-700">
                                {error}
                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                FUNDING OPTIONS
            ================================================= */}

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">

                {/* =================================================
                    INITIAL FUNDING CARD
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg">

                    {/* Card header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-600 p-5 text-white sm:p-6">

                        {/* Decorative circle */}
                        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />

                        {/* Header content */}
                        <div className="relative">

                            <div className="flex items-start justify-between gap-4">

                                {/* Icon */}
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">

                                    <Gift
                                        size={22}
                                    />

                                </div>


                                {/* Badge */}
                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-100">
                                    One Time
                                </span>

                            </div>


                            {/* Label */}
                            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">
                                Initial Funding
                            </p>


                            {/* Amount */}
                            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
                                ₹1,000
                            </h2>


                            {/* Description */}
                            <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">
                                Get your initial account funding to start
                                using your BANK-LEDGER account.
                            </p>

                        </div>

                    </div>


                    {/* Card body */}
                    <div className="p-5 sm:p-6">

                        {/* Benefits */}
                        <div className="space-y-2.5">

                            <Benefit
                                text="One-time initial funding"
                            />

                            <Benefit
                                text="Fixed amount of ₹1,000"
                            />

                            <Benefit
                                text="Added directly to your account"
                            />

                        </div>


                        {/* Action button */}
                        <Button
                            type="button"
                            onClick={handleInitialFunds}
                            disabled={
                                initialLoading ||
                                demoLoading
                            }
                            className="mt-6 w-full"
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


                        {/* Helper text */}
                        <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                            Available once for an eligible account.
                        </p>

                    </div>

                </section>


                {/* =================================================
                    DEMO FUNDING CARD
                ================================================= */}

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:shadow-lg">

                    {/* Card header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-5 text-white sm:p-6">

                        {/* Decorative circle */}
                        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />

                        {/* Header content */}
                        <div className="relative">

                            <div className="flex items-start justify-between gap-4">

                                {/* Icon */}
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">

                                    <IndianRupee
                                        size={22}
                                    />

                                </div>


                                {/* Badge */}
                                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                                    Demo
                                </span>

                            </div>


                            {/* Label */}
                            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                                Demo Funding
                            </p>


                            {/* Amount */}
                            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
                                Up to ₹500
                            </h2>


                            {/* Description */}
                            <p className="mt-2 max-w-sm text-sm leading-6 text-emerald-100">
                                Add demo funds for testing transfers
                                and other banking features.
                            </p>

                        </div>

                    </div>


                    {/* Demo form */}
                    <form
                        onSubmit={handleDemoFunds}
                        className="p-5 sm:p-6"
                    >

                        {/* Input label */}
                        <label
                            htmlFor="demoAmount"
                            className="text-sm font-bold text-slate-700"
                        >
                            Funding Amount
                        </label>


                        {/* Amount input */}
                        <div className="relative mt-2">

                            {/* Rupee icon */}
                            <IndianRupee
                                size={19}
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
                                className="
                                    min-h-12
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    py-3
                                    pl-11
                                    pr-4
                                    text-lg
                                    font-bold
                                    text-slate-800
                                    outline-none
                                    transition
                                    placeholder:text-slate-300
                                    focus:border-emerald-400
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-emerald-100
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            />

                        </div>


                        {/* Limit information */}
                        <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3">

                            <Info
                                size={16}
                                className="mt-0.5 shrink-0 text-emerald-600"
                            />

                            <p className="text-xs leading-5 text-emerald-700">

                                Maximum demo funding:

                                <span className="ml-1 font-bold">
                                    ₹500 per request
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
                                            className="
                                                min-h-10
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                px-3
                                                py-2
                                                text-xs
                                                font-bold
                                                text-slate-600
                                                transition
                                                hover:border-emerald-300
                                                hover:bg-emerald-50
                                                hover:text-emerald-700
                                                active:scale-[0.97]
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >

                                            ₹{value}

                                        </button>

                                    )
                                )}

                            </div>

                        </div>


                        {/* Submit button */}
                        <Button
                            type="submit"
                            disabled={
                                demoLoading ||
                                initialLoading ||
                                !demoAmount ||
                                Number(demoAmount) <= 0
                            }
                            className="mt-6 w-full"
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


                        {/* Helper text */}
                        <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                            Demo funds are intended for testing purposes.
                        </p>

                    </form>

                </section>

            </div>


            {/* =================================================
                HOW FUNDING WORKS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-start gap-3">

                    {/* Information icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">

                        <Info
                            size={19}
                        />

                    </div>


                    {/* Information content */}
                    <div className="min-w-0">

                        <h2 className="text-sm font-bold text-slate-800">
                            How funding works
                        </h2>


                        <div className="mt-3 space-y-2.5 text-xs leading-5 text-slate-500 sm:text-sm">

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
                                Request an amount for testing, subject to
                                the ₹500 request limit.
                            </p>


                            <p>
                                <span className="font-semibold text-slate-700">
                                    Ledger:
                                </span>{" "}
                                Funding is recorded as a transaction in
                                the banking ledger.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                BOTTOM SECURITY
            ================================================= */}

            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

                {/* Security icon */}
                <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                />


                {/* Security message */}
                <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                    Funding actions are processed through your authenticated
                    BANK-LEDGER session.
                </p>

            </div>

        </div>
    )
}


// =====================================================
// BENEFIT ITEM
// =====================================================

function Benefit({ text }) {

    return (

        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">

            {/* Check icon */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                <CheckCircle2
                    size={16}
                />

            </div>


            {/* Benefit text */}
            <span className="text-sm font-medium text-slate-600">
                {text}
            </span>

        </div>
    )
}


export default Funds