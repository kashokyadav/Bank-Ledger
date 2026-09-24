import {
    ShieldCheck,
    LockKeyhole,
    CircleCheck,
} from "lucide-react"


function Footer() {

    return (

        <footer className="border-t border-slate-200 bg-white">

            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">


                {/* ================================= */}
                {/* MAIN FOOTER */}
                {/* ================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    {/* BRAND */}

                    <div className="flex items-start gap-3">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-600
                                text-white
                                shadow-sm
                                shadow-blue-200
                            "
                        >

                            <ShieldCheck size={20} />

                        </div>


                        <div>

                            <p className="text-sm font-bold text-slate-800">
                                BANK-LEDGER
                            </p>

                            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                                Secure and simple banking management.
                            </p>

                        </div>

                    </div>


                    {/* SECURITY INFORMATION */}

                    <div className="flex flex-wrap gap-3">

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-3
                                py-2
                            "
                        >

                            <LockKeyhole
                                size={15}
                                className="text-blue-600"
                            />

                            <span className="text-xs font-semibold text-slate-600">
                                Secure
                            </span>

                        </div>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-3
                                py-2
                            "
                        >

                            <CircleCheck
                                size={15}
                                className="text-emerald-600"
                            />

                            <span className="text-xs font-semibold text-slate-600">
                                Reliable
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* DIVIDER */}
                {/* ================================= */}

                <div className="my-6 border-t border-slate-100" />


                {/* ================================= */}
                {/* COPYRIGHT */}
                {/* ================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-2
                        text-xs
                        text-slate-400
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <p>
                        © {new Date().getFullYear()} BANK-LEDGER. All rights reserved.
                    </p>

                    <p>
                        Secure • Reliable • Simple
                    </p>

                </div>

            </div>

        </footer>

    )

}

export default Footer