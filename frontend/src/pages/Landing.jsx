import { useState } from "react"
import { Link } from "react-router-dom"

import {
    ArrowLeftRight,
    ArrowRight,
    BarChart3,
    Check,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    LockKeyhole,
    Menu,
    ShieldCheck,
    Sparkles,
    WalletCards,
    X,
} from "lucide-react"


const features = [
    {
        icon: WalletCards,
        iconColor: "blue",
        title: "Manage accounts",
        description:
            "View balances, manage your accounts, and keep your financial information organized.",
    },
    {
        icon: ArrowLeftRight,
        iconColor: "emerald",
        title: "Move money easily",
        description:
            "Send money to active bank accounts through a quick and straightforward workflow.",
    },
    {
        icon: BarChart3,
        iconColor: "violet",
        title: "Track every transaction",
        description:
            "Review your transaction history and stay informed about your account activity.",
    },
]


function Landing() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)


    function closeMenu() {
        setIsMenuOpen(false)
    }


    return (
        <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">

            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

                <div className="
                    mx-auto
                    flex
                    min-h-16
                    w-full
                    max-w-7xl
                    items-center
                    justify-between
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    {/* Logo */}

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2.5
                            rounded-xl
                            focus:outline-none
                            focus:ring-4
                            focus:ring-blue-100
                            sm:gap-3
                        "
                    >

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-600
                            text-white
                            shadow-sm
                            shadow-blue-200
                            sm:h-10
                            sm:w-10
                        ">
                            <ShieldCheck
                                size={20}
                                strokeWidth={2.3}
                            />
                        </div>


                        <div>

                            <p className="
                                text-xs
                                font-extrabold
                                tracking-[0.12em]
                                text-slate-900
                                sm:text-sm
                                sm:tracking-[0.14em]
                            ">
                                BANK-LEDGER
                            </p>

                            <p className="
                                hidden
                                text-[10px]
                                font-medium
                                text-slate-400
                                sm:block
                            ">
                                Modern digital banking
                            </p>

                        </div>

                    </Link>


                    {/* Desktop navigation */}

                    <nav className="hidden items-center gap-8 md:flex">

                        <a
                            href="#features"
                            className="
                                text-sm
                                font-medium
                                text-slate-500
                                transition
                                hover:text-blue-600
                            "
                        >
                            Features
                        </a>

                        <a
                            href="#security"
                            className="
                                text-sm
                                font-medium
                                text-slate-500
                                transition
                                hover:text-blue-600
                            "
                        >
                            Security
                        </a>

                        <a
                            href="#about"
                            className="
                                text-sm
                                font-medium
                                text-slate-500
                                transition
                                hover:text-blue-600
                            "
                        >
                            About
                        </a>

                    </nav>


                    {/* Desktop auth */}

                    <div className="hidden items-center gap-2 md:flex">

                        <Link
                            to="/login"
                            className="
                                rounded-xl
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-600
                                transition
                                hover:bg-slate-100
                                hover:text-blue-600
                                focus:outline-none
                                focus:ring-4
                                focus:ring-blue-100
                            "
                        >
                            Sign in
                        </Link>


                        <Link
                            to="/register"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                shadow-blue-200
                                transition
                                hover:bg-blue-700
                                active:scale-[0.98]
                                focus:outline-none
                                focus:ring-4
                                focus:ring-blue-200
                            "
                        >
                            Open account
                            <ArrowRight size={15} />
                        </Link>

                    </div>


                    {/* Mobile menu button */}

                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            text-slate-700
                            transition
                            hover:bg-slate-50
                            focus:outline-none
                            focus:ring-4
                            focus:ring-blue-100
                            md:hidden
                        "
                    >
                        {isMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>

                </div>


                {/* Mobile navigation */}

                {isMenuOpen && (

                    <div className="
                        border-t
                        border-slate-200
                        bg-white
                        px-4
                        py-4
                        shadow-lg
                        md:hidden
                    ">

                        <nav className="space-y-1">

                            <a
                                href="#features"
                                onClick={closeMenu}
                                className="
                                    block
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-600
                                    hover:bg-slate-50
                                    hover:text-blue-600
                                "
                            >
                                Features
                            </a>


                            <a
                                href="#security"
                                onClick={closeMenu}
                                className="
                                    block
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-600
                                    hover:bg-slate-50
                                    hover:text-blue-600
                                "
                            >
                                Security
                            </a>


                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="
                                    block
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-600
                                    hover:bg-slate-50
                                    hover:text-blue-600
                                "
                            >
                                About
                            </a>


                            <div className="
                                my-3
                                border-t
                                border-slate-100
                            " />


                            <div className="grid grid-cols-2 gap-3">

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-200
                                        px-4
                                        py-3
                                        text-center
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        transition
                                        hover:bg-slate-50
                                    "
                                >
                                    Sign in
                                </Link>


                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="
                                        rounded-xl
                                        bg-blue-600
                                        px-4
                                        py-3
                                        text-center
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-blue-700
                                    "
                                >
                                    Register
                                </Link>

                            </div>

                        </nav>

                    </div>

                )}

            </header>


            {/* =====================================================
                MAIN
            ====================================================== */}

            <main>

                {/* =================================================
                    HERO
                ================================================== */}

                <section className="
                    relative
                    overflow-hidden
                    bg-slate-50
                ">

                    {/* Background decoration */}

                    <div className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-0
                        h-72
                        w-72
                        -translate-x-1/2
                        rounded-full
                        bg-blue-100/60
                        blur-3xl
                        sm:h-96
                        sm:w-96
                    " />


                    <div className="
                        relative
                        mx-auto
                        grid
                        w-full
                        max-w-7xl
                        items-center
                        gap-12
                        px-4
                        py-14
                        sm:px-6
                        sm:py-20
                        lg:grid-cols-2
                        lg:gap-16
                        lg:px-8
                        lg:py-24
                    ">


                        {/* ================================
                            HERO CONTENT
                        ================================= */}

                        <div className="min-w-0">

                            {/* Badge */}

                            <div className="
                                inline-flex
                                max-w-full
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-blue-200
                                bg-blue-50
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-blue-700
                                sm:px-3.5
                                sm:py-2
                            ">

                                <Sparkles
                                    size={14}
                                    className="shrink-0"
                                />

                                <span className="truncate">
                                    Banking made beautifully simple
                                </span>

                            </div>


                            {/* Heading */}

                            <h1 className="
                                mt-6
                                max-w-2xl
                                text-4xl
                                font-black
                                leading-[1.08]
                                tracking-tight
                                text-slate-950
                                sm:text-5xl
                                lg:text-6xl
                            ">

                                Your money.

                                <span className="
                                    block
                                    text-blue-600
                                ">
                                    Your control.
                                </span>

                            </h1>


                            {/* Description */}

                            <p className="
                                mt-5
                                max-w-xl
                                text-base
                                leading-7
                                text-slate-600
                                sm:mt-6
                                sm:text-lg
                                sm:leading-8
                            ">
                                Manage accounts, transfer money, and
                                understand your finances through one secure
                                and easy-to-use banking platform.
                            </p>


                            {/* CTA buttons */}

                            <div className="
                                mt-7
                                grid
                                gap-3
                                sm:mt-8
                                sm:flex
                            ">

                                <Link
                                    to="/register"
                                    className="
                                        inline-flex
                                        min-h-12
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-blue-600
                                        px-6
                                        text-sm
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-blue-200
                                        transition
                                        hover:-translate-y-0.5
                                        hover:bg-blue-700
                                        focus:outline-none
                                        focus:ring-4
                                        focus:ring-blue-200
                                    "
                                >
                                    Get started free
                                    <ArrowRight size={17} />
                                </Link>


                                <Link
                                    to="/login"
                                    className="
                                        inline-flex
                                        min-h-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        px-6
                                        text-sm
                                        font-bold
                                        text-slate-700
                                        shadow-sm
                                        transition
                                        hover:border-blue-200
                                        hover:bg-blue-50
                                        hover:text-blue-700
                                        focus:outline-none
                                        focus:ring-4
                                        focus:ring-blue-100
                                    "
                                >
                                    Sign in to your account
                                </Link>

                            </div>


                            {/* Trust points */}

                            <div className="
                                mt-7
                                flex
                                flex-col
                                gap-3
                                text-sm
                                text-slate-500
                                sm:mt-8
                                sm:flex-row
                                sm:flex-wrap
                                sm:gap-x-6
                            ">

                                <TrustItem text="No hidden fees" />

                                <TrustItem text="Secure authentication" />

                                <TrustItem text="Easy transfers" />

                            </div>

                        </div>


                        {/* =================================
                            DASHBOARD PREVIEW
                        ================================== */}

                        <div className="
                            min-w-0
                            w-full
                        ">

                            <div className="
                                mx-auto
                                w-full
                                max-w-[500px]
                                lg:ml-auto
                            ">

                                {/* Main preview */}

                                <div className="
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-2.5
                                    shadow-xl
                                    shadow-slate-300/40
                                    sm:p-3
                                ">

                                    {/* Dark dashboard */}

                                    <div className="
                                        overflow-hidden
                                        rounded-[1.35rem]
                                        bg-slate-950
                                        text-white
                                    ">

                                        {/* Balance */}

                                        <div className="
                                            p-5
                                            sm:p-6
                                        ">

                                            <div className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            ">

                                                <div className="min-w-0">

                                                    <p className="
                                                        text-xs
                                                        font-medium
                                                        text-slate-400
                                                    ">
                                                        Total balance
                                                    </p>


                                                    <p className="
                                                        mt-1.5
                                                        truncate
                                                        text-2xl
                                                        font-black
                                                        tracking-tight
                                                        sm:text-3xl
                                                        lg:text-4xl
                                                    ">
                                                        ₹24,680.50
                                                    </p>

                                                </div>


                                                <div className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    bg-blue-500/20
                                                    text-blue-300
                                                    sm:h-11
                                                    sm:w-11
                                                ">
                                                    <WalletCards size={21} />
                                                </div>

                                            </div>


                                            {/* Primary account */}

                                            <div className="
                                                mt-6
                                                flex
                                                items-center
                                                justify-between
                                                gap-3
                                                rounded-2xl
                                                bg-white/10
                                                p-3
                                                sm:mt-7
                                                sm:p-4
                                            ">

                                                <div className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="
                                                        flex
                                                        h-9
                                                        w-9
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-blue-500
                                                        sm:h-10
                                                        sm:w-10
                                                    ">
                                                        <CreditCard size={18} />
                                                    </div>


                                                    <div className="min-w-0">

                                                        <p className="
                                                            truncate
                                                            text-xs
                                                            font-semibold
                                                            sm:text-sm
                                                        ">
                                                            Primary account
                                                        </p>

                                                        <p className="
                                                            mt-0.5
                                                            text-[11px]
                                                            text-slate-400
                                                        ">
                                                            •••• 2849
                                                        </p>

                                                    </div>

                                                </div>


                                                <p className="
                                                    shrink-0
                                                    text-xs
                                                    font-bold
                                                    sm:text-sm
                                                ">
                                                    ₹18,240
                                                </p>

                                            </div>

                                        </div>


                                        {/* Recent activity */}

                                        <div className="
                                            bg-white
                                            p-4
                                            text-slate-900
                                            sm:p-5
                                        ">

                                            <div className="
                                                mb-3
                                                flex
                                                items-center
                                                justify-between
                                            ">

                                                <div>

                                                    <p className="
                                                        text-sm
                                                        font-bold
                                                    ">
                                                        Recent activity
                                                    </p>

                                                    <p className="
                                                        mt-0.5
                                                        text-xs
                                                        text-slate-400
                                                    ">
                                                        Your latest transactions
                                                    </p>

                                                </div>


                                                <BarChart3
                                                    size={18}
                                                    className="text-blue-600"
                                                />

                                            </div>


                                            <Transaction
                                                icon={
                                                    <ArrowLeftRight size={17} />
                                                }
                                                title="Money received"
                                                subtitle="Today, 10:42 AM"
                                                amount="+ ₹5,000"
                                                positive
                                            />


                                            <Transaction
                                                icon={
                                                    <CreditCard size={17} />
                                                }
                                                title="Online purchase"
                                                subtitle="Yesterday, 6:20 PM"
                                                amount="- ₹1,240"
                                            />


                                            <Transaction
                                                icon={
                                                    <WalletCards size={17} />
                                                }
                                                title="Salary credited"
                                                subtitle="12 Sep, 9:00 AM"
                                                amount="+ ₹42,000"
                                                positive
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* Security message */}

                                <div className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-3
                                    shadow-sm
                                    sm:p-4
                                ">

                                    <div className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-50
                                        text-emerald-600
                                        sm:h-10
                                        sm:w-10
                                    ">
                                        <CheckCircle2 size={18} />
                                    </div>


                                    <div className="min-w-0">

                                        <p className="
                                            text-xs
                                            font-bold
                                            text-slate-700
                                            sm:text-sm
                                        ">
                                            Payment secured
                                        </p>

                                        <p className="
                                            mt-0.5
                                            truncate
                                            text-[11px]
                                            text-slate-400
                                            sm:text-xs
                                        ">
                                            Protected by BANK-LEDGER
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    FEATURES
                ================================================== */}

                <section
                    id="features"
                    className="scroll-mt-20 border-y border-slate-200 bg-white"
                >

                    <div className="
                        mx-auto
                        w-full
                        max-w-7xl
                        px-4
                        py-16
                        sm:px-6
                        sm:py-20
                        lg:px-8
                        lg:py-24
                    ">

                        <div className="max-w-2xl">

                            <p className="
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-blue-600
                            ">
                                Everything in one place
                            </p>


                            <h2 className="
                                mt-3
                                text-3xl
                                font-black
                                tracking-tight
                                text-slate-950
                                sm:text-4xl
                            ">
                                Banking that works around you
                            </h2>


                            <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-slate-500
                                sm:text-base
                            ">
                                Simple tools, clear information, and secure
                                controls to help you manage your everyday
                                finances with confidence.
                            </p>

                        </div>


                        <div className="
                            mt-10
                            grid
                            gap-4
                            sm:mt-12
                            sm:gap-5
                            md:grid-cols-3
                        ">

                            {features.map((feature) => (
                                <FeatureCard
                                    key={feature.title}
                                    {...feature}
                                />
                            ))}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    SECURITY
                ================================================== */}

                <section
                    id="security"
                    className="
                        scroll-mt-20
                        bg-slate-950
                    "
                >

                    <div className="
                        mx-auto
                        grid
                        w-full
                        max-w-7xl
                        gap-10
                        px-4
                        py-16
                        sm:px-6
                        sm:py-20
                        lg:grid-cols-2
                        lg:items-center
                        lg:gap-16
                        lg:px-8
                        lg:py-24
                    ">

                        {/* Text */}

                        <div>

                            <div className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-500/20
                                text-blue-300
                            ">
                                <LockKeyhole size={22} />
                            </div>


                            <h2 className="
                                mt-5
                                text-3xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-4xl
                            ">
                                Built with security
                                <span className="block">
                                    at the core.
                                </span>
                            </h2>


                            <p className="
                                mt-5
                                max-w-xl
                                text-sm
                                leading-7
                                text-slate-400
                                sm:text-base
                                sm:leading-8
                            ">
                                Your banking experience should feel simple
                                without compromising privacy. BANK-LEDGER
                                keeps security visible throughout the product.
                            </p>


                            <Link
                                to="/register"
                                className="
                                    mt-7
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    px-5
                                    py-3
                                    text-sm
                                    font-bold
                                    text-slate-950
                                    transition
                                    hover:bg-blue-50
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-white/30
                                "
                            >
                                Start securely
                                <ChevronRight size={17} />
                            </Link>

                        </div>


                        {/* Security cards */}

                        <div className="
                            grid
                            gap-3
                            sm:grid-cols-2
                            sm:gap-4
                        ">

                            <SecurityItem text="Protected authentication" />

                            <SecurityItem text="Clear transaction history" />

                            <SecurityItem text="Secure account management" />

                            <SecurityItem text="Simple financial controls" />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    CTA
                ================================================== */}

                <section
                    id="about"
                    className="scroll-mt-20 bg-blue-600"
                >

                    <div className="
                        mx-auto
                        flex
                        w-full
                        max-w-7xl
                        flex-col
                        gap-7
                        px-4
                        py-14
                        sm:px-6
                        sm:py-16
                        md:flex-row
                        md:items-center
                        md:justify-between
                        lg:px-8
                    ">

                        <div className="max-w-2xl">

                            <h2 className="
                                text-2xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-3xl
                            ">
                                Ready to simplify your banking?
                            </h2>


                            <p className="
                                mt-3
                                text-sm
                                leading-6
                                text-blue-100
                                sm:text-base
                            ">
                                Create your BANK-LEDGER account and take
                                control of your everyday transactions.
                            </p>

                        </div>


                        <Link
                            to="/register"
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-white
                                px-6
                                py-3.5
                                text-sm
                                font-bold
                                text-blue-700
                                shadow-lg
                                transition
                                hover:bg-blue-50
                                focus:outline-none
                                focus:ring-4
                                focus:ring-white/30
                            "
                        >
                            Create an account
                            <ArrowRight size={17} />
                        </Link>

                    </div>

                </section>

            </main>


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="
                border-t
                border-slate-200
                bg-white
            ">

                <div className="
                    mx-auto
                    w-full
                    max-w-7xl
                    px-4
                    py-8
                    sm:px-6
                    lg:px-8
                    lg:py-10
                ">

                    <div className="
                        flex
                        flex-col
                        gap-7
                        md:flex-row
                        md:items-center
                        md:justify-between
                    ">

                        {/* Brand */}

                        <Link
                            to="/"
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-600
                                text-white
                            ">
                                <ShieldCheck size={18} />
                            </div>


                            <div>

                                <p className="
                                    text-sm
                                    font-black
                                    tracking-wide
                                    text-slate-800
                                ">
                                    BANK-LEDGER
                                </p>

                                <p className="
                                    mt-0.5
                                    text-[11px]
                                    text-slate-400
                                ">
                                    Modern digital banking
                                </p>

                            </div>

                        </Link>


                        {/* Footer navigation */}

                        <nav className="
                            flex
                            flex-wrap
                            gap-x-6
                            gap-y-3
                        ">

                            <a
                                href="#features"
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                    transition
                                    hover:text-blue-600
                                "
                            >
                                Features
                            </a>


                            <a
                                href="#security"
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                    transition
                                    hover:text-blue-600
                                "
                            >
                                Security
                            </a>


                            <Link
                                to="/login"
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                    transition
                                    hover:text-blue-600
                                "
                            >
                                Sign in
                            </Link>


                            <Link
                                to="/register"
                                className="
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                    transition
                                    hover:text-blue-600
                                "
                            >
                                Register
                            </Link>

                        </nav>

                    </div>


                    <div className="
                        my-6
                        border-t
                        border-slate-100
                    " />


                    <div className="
                        flex
                        flex-col
                        gap-2
                        text-xs
                        text-slate-400
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <p>
                            © {new Date().getFullYear()} BANK-LEDGER.
                            All rights reserved.
                        </p>

                        <p>
                            Secure • Reliable • Simple
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    )
}


/* =============================================================
   TRUST ITEM
============================================================= */

function TrustItem({ text }) {

    return (
        <div className="flex items-center gap-2">

            <CheckCircle2
                size={16}
                className="shrink-0 text-emerald-500"
            />

            <span className="text-xs font-medium text-slate-500 sm:text-sm">
                {text}
            </span>

        </div>
    )
}


/* =============================================================
   TRANSACTION
============================================================= */

function Transaction({
    icon,
    title,
    subtitle,
    amount,
    positive = false,
}) {

    return (
        <div className="
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-slate-100
            py-3
        ">

            <div className="
                flex
                min-w-0
                items-center
                gap-3
            ">

                <div className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-600
                ">
                    {icon}
                </div>


                <div className="min-w-0">

                    <p className="
                        truncate
                        text-xs
                        font-semibold
                        text-slate-700
                        sm:text-sm
                    ">
                        {title}
                    </p>

                    <p className="
                        mt-0.5
                        truncate
                        text-[10px]
                        text-slate-400
                        sm:text-xs
                    ">
                        {subtitle}
                    </p>

                </div>

            </div>


            <p className={`
                shrink-0
                text-xs
                font-bold
                sm:text-sm
                ${
                    positive
                        ? "text-emerald-600"
                        : "text-slate-700"
                }
            `}>
                {amount}
            </p>

        </div>
    )
}


/* =============================================================
   FEATURE CARD
============================================================= */

function FeatureCard({
    icon: Icon,
    iconColor = "blue",
    title,
    description,
}) {

    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        emerald: "bg-emerald-100 text-emerald-600",
        violet: "bg-violet-100 text-violet-600",
    }


    return (
        <article className="
            group
            flex
            min-h-[220px]
            flex-col
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            transition
            duration-300
            hover:-translate-y-1
            hover:border-blue-200
            hover:shadow-xl
            hover:shadow-slate-200/60
            sm:p-6
        ">

            <div className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${colorClasses[iconColor]}
            `}>
                <Icon size={21} />
            </div>


            <h3 className="
                mt-5
                text-base
                font-extrabold
                text-slate-900
                sm:text-lg
            ">
                {title}
            </h3>


            <p className="
                mt-2
                text-sm
                leading-6
                text-slate-500
            ">
                {description}
            </p>


            <div className="
                mt-auto
                flex
                items-center
                gap-1
                pt-5
                text-xs
                font-bold
                text-blue-600
                sm:text-sm
            ">

                Explore

                <ArrowRight
                    size={14}
                    className="
                        transition
                        group-hover:translate-x-1
                    "
                />

            </div>

        </article>
    )
}


/* =============================================================
   SECURITY ITEM
============================================================= */

function SecurityItem({ text }) {

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.06]
            p-4
            sm:p-5
        ">

            <div className="
                flex
                items-start
                gap-3
            ">

                <div className="
                    mt-0.5
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-400/15
                    text-emerald-300
                ">
                    <Check size={14} />
                </div>


                <p className="
                    text-sm
                    font-semibold
                    leading-6
                    text-slate-200
                ">
                    {text}
                </p>

            </div>

        </div>
    )
}


export default Landing