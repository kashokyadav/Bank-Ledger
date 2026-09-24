import { useState } from "react"
import {
    WalletCards,
    Banknote,
    CheckCircle,
    AlertCircle,
    Loader2,
} from "lucide-react"

import Card from "../../components/common/Card"
import Button from "../../components/common/Button"

import {
    requestInitialFunds,
    requestDemoFunds,
} from "../../services/user.service"


function Funds() {

    const [initialLoading, setInitialLoading] = useState(false)
    const [demoLoading, setDemoLoading] = useState(false)

    const [amount, setAmount] = useState("")

    const [initialMessage, setInitialMessage] = useState("")
    const [demoMessage, setDemoMessage] = useState("")

    const [initialError, setInitialError] = useState("")
    const [demoError, setDemoError] = useState("")


    async function handleInitialFunds() {

        try {

            setInitialLoading(true)
            setInitialMessage("")
            setInitialError("")

            const data = await requestInitialFunds()

            console.log(
                "INITIAL FUNDS API:",
                data
            )

            setInitialMessage(
                data.message ||
                "Initial funds added successfully."
            )

        } catch (error) {

            console.error(
                "Initial Funds API Error:",
                error.response?.data || error.message
            )

            setInitialError(
                error.response?.data?.message ||
                "Failed to request initial funds."
            )

        } finally {

            setInitialLoading(false)

        }
    }


    async function handleDemoFunds(event) {

        event.preventDefault()

        try {

            setDemoLoading(true)
            setDemoMessage("")
            setDemoError("")

            const numericAmount = Number(amount)

            if (!numericAmount || numericAmount <= 0) {

                setDemoError(
                    "Enter a valid amount."
                )

                return
            }

            if (numericAmount > 500) {

                setDemoError(
                    "Demo funding cannot exceed ₹500."
                )

                return
            }


            const data = await requestDemoFunds(
                numericAmount
            )

            console.log(
                "DEMO FUNDS API:",
                data
            )

            setDemoMessage(
                data.message ||
                "Demo funds added successfully."
            )

            setAmount("")

        } catch (error) {

            console.error(
                "Demo Funds API Error:",
                error.response?.data || error.message
            )

            setDemoError(
                error.response?.data?.message ||
                "Failed to request demo funds."
            )

        } finally {

            setDemoLoading(false)

        }
    }


    return (

        <div className="space-y-6">

            {/* Page Header */}

            <div>

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                        <WalletCards size={23} />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-slate-800">
                            Funds
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Add funds to your BANK-LEDGER account.
                        </p>

                    </div>

                </div>

            </div>


            {/* Fund Cards */}

            <div className="grid gap-6 lg:grid-cols-2">


                {/* Initial Funds */}

                <Card>

                    <div className="flex items-start justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                                    <Banknote size={22} />

                                </div>

                                <div>

                                    <h2 className="font-bold text-slate-800">
                                        Initial Funds
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        One-time account funding
                                    </p>

                                </div>

                            </div>

                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            ₹1000
                        </span>

                    </div>


                    <div className="mt-6 rounded-xl bg-slate-50 p-4">

                        <p className="text-sm text-slate-600">
                            Get your initial ₹1000 directly from
                            the system funding account.
                        </p>

                    </div>


                    {initialMessage && (

                        <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">

                            <CheckCircle
                                size={18}
                                className="mt-0.5 shrink-0"
                            />

                            <span>
                                {initialMessage}
                            </span>

                        </div>

                    )}


                    {initialError && (

                        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">

                            <AlertCircle
                                size={18}
                                className="mt-0.5 shrink-0"
                            />

                            <span>
                                {initialError}
                            </span>

                        </div>

                    )}


                    <div className="mt-6">

                        <Button
                            type="button"
                            onClick={handleInitialFunds}
                            disabled={initialLoading}
                            className="w-full"
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

                                "Claim ₹1000 Initial Funds"

                            )}

                        </Button>

                    </div>

                </Card>


                {/* Demo Funds */}

                <Card>

                    <div className="flex items-start justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                                    <WalletCards size={22} />

                                </div>

                                <div>

                                    <h2 className="font-bold text-slate-800">
                                        Demo Funds
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Temporary testing funds
                                    </p>

                                </div>

                            </div>

                        </div>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            ₹500 / day
                        </span>

                    </div>


                    <div className="mt-6 rounded-xl bg-slate-50 p-4">

                        <p className="text-sm text-slate-600">
                            Request demo money for testing
                            transactions.
                        </p>

                        <p className="mt-2 text-xs font-medium text-slate-500">
                            Maximum daily funding: ₹500
                        </p>

                    </div>


                    <form
                        onSubmit={handleDemoFunds}
                        className="mt-6 space-y-4"
                    >

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Amount
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    min="1"
                                    max="500"
                                    step="1"
                                    value={amount}
                                    onChange={(event) =>
                                        setAmount(event.target.value)
                                    }
                                    placeholder="Enter amount"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>


                        {demoMessage && (

                            <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">

                                <CheckCircle
                                    size={18}
                                    className="mt-0.5 shrink-0"
                                />

                                <span>
                                    {demoMessage}
                                </span>

                            </div>

                        )}


                        {demoError && (

                            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">

                                <AlertCircle
                                    size={18}
                                    className="mt-0.5 shrink-0"
                                />

                                <span>
                                    {demoError}
                                </span>

                            </div>

                        )}


                        <Button
                            type="submit"
                            disabled={demoLoading}
                            className="w-full"
                        >

                            {demoLoading ? (

                                <span className="flex items-center justify-center gap-2">

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Processing...

                                </span>

                            ) : (

                                "Request Demo Funds"

                            )}

                        </Button>

                    </form>

                </Card>

            </div>

        </div>
    )
}

export default Funds