import {
    ShieldCheck,
    LockKeyhole,
    CircleCheck,
} from "lucide-react"


function Footer() {

    return (

        <footer
            className="
                border-t
                border-slate-200
                bg-white
            "
        >

            {/* ================================================== */}
            {/* FOOTER CONTAINER                                   */}
            {/* ================================================== */}

            <div
                className="
                    mx-auto
                    w-full
                    max-w-[1600px]
                    px-3
                    py-7
                    sm:px-5
                    sm:py-8
                    lg:px-8
                    xl:px-10
                "
            >

                {/* ================================================== */}
                {/* MAIN FOOTER CONTENT                               */}
                {/* ================================================== */}

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

                    {/* ================================================== */}
                    {/* BRAND SECTION                                      */}
                    {/* ================================================== */}

                    <div
                        className="
                            flex
                            items-start
                            gap-3
                        "
                    >

                        {/* Brand Icon */}

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

                            <ShieldCheck
                                size={20}
                                strokeWidth={2.2}
                            />

                        </div>


                        {/* Brand Information */}

                        <div className="min-w-0">

                            <p
                                className="
                                    text-sm
                                    font-bold
                                    tracking-tight
                                    text-slate-800
                                "
                            >
                                BANK-LEDGER
                            </p>

                            <p
                                className="
                                    mt-1
                                    max-w-sm
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                Secure and simple banking management.
                            </p>

                        </div>

                    </div>


                    {/* ================================================== */}
                    {/* SECURITY INFORMATION                              */}
                    {/* ================================================== */}

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-2.5
                        "
                    >

                        {/* Secure Badge */}

                        <div
                            className="
                                flex
                                min-h-10
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

                            <div
                                className="
                                    flex
                                    h-6
                                    w-6
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-blue-100
                                    text-blue-600
                                "
                            >

                                <LockKeyhole size={14} />

                            </div>

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-600
                                "
                            >
                                Secure
                            </span>

                        </div>


                        {/* Reliable Badge */}

                        <div
                            className="
                                flex
                                min-h-10
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

                            <div
                                className="
                                    flex
                                    h-6
                                    w-6
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-emerald-100
                                    text-emerald-600
                                "
                            >

                                <CircleCheck size={14} />

                            </div>

                            <span
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-600
                                "
                            >
                                Reliable
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================================================== */}
                {/* DIVIDER                                            */}
                {/* ================================================== */}

                <div
                    className="
                        my-6
                        border-t
                        border-slate-100
                    "
                />


                {/* ================================================== */}
                {/* COPYRIGHT SECTION                                  */}
                {/* ================================================== */}

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

                    {/* Copyright */}

                    <p>
                        © {new Date().getFullYear()} BANK-LEDGER. All rights reserved.
                    </p>


                    {/* Footer Tagline */}

                    <p
                        className="
                            font-medium
                            text-slate-400
                        "
                    >
                        Secure • Reliable • Simple
                    </p>

                </div>

            </div>

        </footer>

    )
}


export default Footer