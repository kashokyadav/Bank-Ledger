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


// =====================================================
// FEATURE DATA
// =====================================================

const features = [
    {
        icon: WalletCards,
        iconColor: "blue",
        title: "Manage Accounts",
        description:
            "View balances, manage accounts, and keep your financial information organized.",
    },
    {
        icon: ArrowLeftRight,
        iconColor: "emerald",
        title: "Move Money Easily",
        description:
            "Send money to active bank accounts through a simple and secure workflow.",
    },
    {
        icon: BarChart3,
        iconColor: "violet",
        title: "Track Transactions",
        description:
            "Review transaction history and stay informed about your account activity.",
    },
]


// =====================================================
// LANDING PAGE
// =====================================================

function Landing() {

    // Control mobile navigation menu.
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    // Close mobile navigation.
    function closeMenu() {
        setIsMenuOpen(false)
    }


    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

                <div className="mx-auto flex min-h-[68px] w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Brand */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex shrink-0 items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >

                        {/* Brand icon */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:h-10 sm:w-10">

                            <ShieldCheck
                                size={20}
                                strokeWidth={2.3}
                            />

                        </div>


                        {/* Brand text */}
                        <div>

                            <p className="text-sm font-black tracking-[0.12em] text-slate-900 sm:text-base">
                                BANK-LEDGER
                            </p>

                            <p className="hidden text-[10px] font-medium text-slate-400 sm:block">
                                Modern digital banking
                            </p>

                        </div>

                    </Link>


                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-6 md:flex lg:gap-8">

                        <a
                            href="#features"
                            className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                        >
                            Features
                        </a>

                        <a
                            href="#security"
                            className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                        >
                            Security
                        </a>

                        <a
                            href="#about"
                            className="text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                        >
                            About
                        </a>

                    </nav>


                    {/* Desktop authentication */}
                    <div className="hidden items-center gap-2 md:flex">

                        <Link
                            to="/login"
                            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 lg:px-4"
                        >
                            Sign in
                        </Link>


                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 lg:px-5"
                        >
                            Open account

                            <ArrowRight size={15} />

                        </Link>

                    </div>


                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label={
                            isMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={isMenuOpen}
                        onClick={() =>
                            setIsMenuOpen(!isMenuOpen)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 md:hidden"
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

                    <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">

                        <nav className="space-y-1">

                            <a
                                href="#features"
                                onClick={closeMenu}
                                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                            >
                                Features
                            </a>


                            <a
                                href="#security"
                                onClick={closeMenu}
                                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                            >
                                Security
                            </a>


                            <a
                                href="#about"
                                onClick={closeMenu}
                                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                            >
                                About
                            </a>


                            {/* Mobile divider */}
                            <div className="my-3 border-t border-slate-100" />


                            {/* Mobile authentication */}
                            <div className="grid grid-cols-2 gap-3">

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Sign in
                                </Link>


                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Register
                                </Link>

                            </div>

                        </nav>

                    </div>

                )}

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main>

                {/* =================================================
                    HERO
                ================================================= */}

                <section className="relative overflow-hidden bg-slate-50">

                    {/* Background decoration */}
                    <div className="pointer-events-none absolute left-1/2 top-[-100px] h-64 w-64 -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl sm:h-80 sm:w-80" />


                    {/* Hero container */}
                    <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-20">

                        {/* =====================================
                            HERO TEXT
                        ====================================== */}

                        <div className="min-w-0">

                            {/* Hero badge */}
                            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">

                                <Sparkles
                                    size={14}
                                    className="shrink-0"
                                />

                                <span>
                                    Banking made beautifully simple
                                </span>

                            </div>


                            {/* Main heading */}
                            <h1 className="mt-5 max-w-xl text-[2.7rem] font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem]">

                                Your money.

                                <span className="block text-blue-600">
                                    Your control.
                                </span>

                            </h1>


                            {/* Description */}
                            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:text-lg">

                                Manage accounts, transfer money, and track
                                your financial activity through one secure
                                and easy-to-use banking platform.

                            </p>


                            {/* CTA buttons */}
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/register"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                    Get started free

                                    <ArrowRight size={17} />

                                </Link>


                                <Link
                                    to="/login"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                                >
                                    Sign in
                                </Link>

                            </div>


                            {/* Trust points */}
                            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">

                                <TrustItem text="Secure authentication" />

                                <TrustItem text="Easy transfers" />

                                <TrustItem text="Clear transactions" />

                            </div>

                        </div>


                        {/* =====================================
                            DASHBOARD PREVIEW
                        ====================================== */}

                        <div className="min-w-0 w-full">

                            {/* Preview width is intentionally limited */}
                            <div className="mx-auto w-full max-w-[420px] lg:ml-auto">

                                {/* Outer dashboard frame */}
                                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-300/30 sm:p-2.5">

                                    {/* Dashboard */}
                                    <div className="overflow-hidden rounded-[1.15rem] bg-slate-950 text-white">

                                        {/* Balance */}
                                        <div className="p-4 sm:p-5">

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="min-w-0">

                                                    <p className="text-[11px] font-medium text-slate-400">
                                                        Available balance
                                                    </p>

                                                    <p className="mt-1 truncate text-2xl font-black tracking-tight sm:text-3xl">
                                                        ₹24,680.50
                                                    </p>

                                                </div>


                                                {/* Wallet icon */}
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">

                                                    <WalletCards size={20} />

                                                </div>

                                            </div>


                                            {/* Primary account */}
                                            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-white/10 p-3">

                                                <div className="flex min-w-0 items-center gap-3">

                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500">

                                                        <CreditCard size={17} />

                                                    </div>


                                                    <div className="min-w-0">

                                                        <p className="truncate text-xs font-semibold sm:text-sm">
                                                            Primary account
                                                        </p>

                                                        <p className="mt-0.5 text-[10px] text-slate-400 sm:text-[11px]">
                                                            •••• 2849
                                                        </p>

                                                    </div>

                                                </div>


                                                <p className="shrink-0 text-xs font-bold sm:text-sm">
                                                    ₹18,240
                                                </p>

                                            </div>

                                        </div>


                                        {/* Recent activity */}
                                        <div className="bg-white p-4 text-slate-900 sm:p-5">

                                            <div className="mb-2 flex items-center justify-between">

                                                <div>

                                                    <p className="text-sm font-bold">
                                                        Recent activity
                                                    </p>

                                                    <p className="mt-0.5 text-[11px] text-slate-400">
                                                        Latest transactions
                                                    </p>

                                                </div>


                                                <BarChart3
                                                    size={17}
                                                    className="text-blue-600"
                                                />

                                            </div>


                                            <Transaction
                                                icon={
                                                    <ArrowLeftRight size={16} />
                                                }
                                                title="Money received"
                                                subtitle="Today, 10:42 AM"
                                                amount="+ ₹5,000"
                                                positive
                                            />


                                            <Transaction
                                                icon={
                                                    <CreditCard size={16} />
                                                }
                                                title="Online purchase"
                                                subtitle="Yesterday, 6:20 PM"
                                                amount="- ₹1,240"
                                            />


                                            <Transaction
                                                icon={
                                                    <WalletCards size={16} />
                                                }
                                                title="Salary credited"
                                                subtitle="12 Sep, 9:00 AM"
                                                amount="+ ₹42,000"
                                                positive
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* Security status */}
                                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                                        <CheckCircle2 size={17} />

                                    </div>


                                    <div className="min-w-0">

                                        <p className="text-xs font-bold text-slate-700">
                                            Payment secured
                                        </p>

                                        <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:text-xs">
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
                ================================================= */}

                <section
                    id="features"
                    className="scroll-mt-20 border-y border-slate-200 bg-white"
                >

                    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

                        {/* Section heading */}
                        <div className="mx-auto max-w-2xl text-center">

                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 sm:text-xs">
                                Everything in one place
                            </p>

                            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                                Banking that works around you
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                                Simple tools, clear information, and secure
                                controls for your everyday banking activity.
                            </p>

                        </div>


                        {/* Feature cards */}
                        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:mt-10 md:grid-cols-3">

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
                ================================================= */}

                <section
                    id="security"
                    className="scroll-mt-20 bg-slate-950"
                >

                    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-20">

                        {/* Security text */}
                        <div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300">

                                <LockKeyhole size={20} />

                            </div>


                            <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">

                                Built with security

                                <span className="block">
                                    at the core.
                                </span>

                            </h2>


                            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">

                                BANK-LEDGER keeps authentication, account
                                management, and transaction information
                                organized in one secure platform.

                            </p>


                            <Link
                                to="/register"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/30"
                            >
                                Start securely

                                <ChevronRight size={17} />

                            </Link>

                        </div>


                        {/* Security cards */}
                        <div className="grid gap-3 sm:grid-cols-2">

                            <SecurityItem text="Protected authentication" />

                            <SecurityItem text="Clear transaction history" />

                            <SecurityItem text="Secure account management" />

                            <SecurityItem text="Simple financial controls" />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    CTA
                ================================================= */}

                <section
                    id="about"
                    className="scroll-mt-20 bg-blue-600"
                >

                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 sm:py-14 md:flex-row md:items-center md:justify-between lg:px-8">

                        <div className="max-w-xl">

                            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                                Ready to simplify your banking?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">
                                Create your BANK-LEDGER account and manage
                                your everyday transactions from one place.
                            </p>

                        </div>


                        <Link
                            to="/register"
                            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                        >
                            Create an account

                            <ArrowRight size={17} />

                        </Link>

                    </div>

                </section>

            </main>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="border-t border-slate-200 bg-white">

                <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        {/* Footer brand */}
                        <Link
                            to="/"
                            className="flex items-center gap-3"
                        >

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">

                                <ShieldCheck size={18} />

                            </div>


                            <div>

                                <p className="text-sm font-black tracking-wide text-slate-800">
                                    BANK-LEDGER
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-400">
                                    Modern digital banking
                                </p>

                            </div>

                        </Link>


                        {/* Footer navigation */}
                        <nav className="flex flex-wrap gap-x-6 gap-y-3">

                            <a
                                href="#features"
                                className="text-xs font-semibold text-slate-500 hover:text-blue-600"
                            >
                                Features
                            </a>

                            <a
                                href="#security"
                                className="text-xs font-semibold text-slate-500 hover:text-blue-600"
                            >
                                Security
                            </a>

                            <Link
                                to="/login"
                                className="text-xs font-semibold text-slate-500 hover:text-blue-600"
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/register"
                                className="text-xs font-semibold text-slate-500 hover:text-blue-600"
                            >
                                Register
                            </Link>

                        </nav>

                    </div>


                    {/* Divider */}
                    <div className="my-5 border-t border-slate-100" />


                    {/* Copyright */}
                    <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

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


// =====================================================
// TRUST ITEM
// =====================================================

function TrustItem({ text }) {

    return (

        <div className="flex items-center gap-2">

            {/* Green check */}
            <CheckCircle2
                size={15}
                className="shrink-0 text-emerald-500"
            />

            {/* Text */}
            <span className="text-xs font-medium text-slate-500 sm:text-sm">
                {text}
            </span>

        </div>
    )
}


// =====================================================
// TRANSACTION PREVIEW
// =====================================================

function Transaction({
    icon,
    title,
    subtitle,
    amount,
    positive = false,
}) {

    return (

        <div className="flex items-center justify-between gap-2 border-t border-slate-100 py-2.5">

            {/* Left side */}
            <div className="flex min-w-0 items-center gap-2.5">

                {/* Transaction icon */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">

                    {icon}

                </div>


                {/* Transaction text */}
                <div className="min-w-0">

                    <p className="truncate text-xs font-semibold text-slate-700">
                        {title}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-slate-400">
                        {subtitle}
                    </p>

                </div>

            </div>


            {/* Amount */}
            <p
                className={`
                    shrink-0
                    text-xs
                    font-bold
                    ${
                        positive
                            ? "text-emerald-600"
                            : "text-slate-700"
                    }
                `}
            >
                {amount}
            </p>

        </div>
    )
}


// =====================================================
// FEATURE CARD
// =====================================================

function FeatureCard({
    icon: Icon,
    iconColor = "blue",
    title,
    description,
}) {

    // Feature icon colors.
    const colorClasses = {
        blue: "border-blue-100 bg-blue-50 text-blue-600",
        emerald: "border-emerald-100 bg-emerald-50 text-emerald-600",
        violet: "border-violet-100 bg-violet-50 text-violet-600",
    }


    return (

        <article className="group flex min-h-[200px] flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6">

            {/* Icon */}
            <div
                className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    ${colorClasses[iconColor]}
                `}
            >

                <Icon size={20} />

            </div>


            {/* Title */}
            <h3 className="mt-4 text-base font-extrabold text-slate-900 sm:text-lg">
                {title}
            </h3>


            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>


            {/* Explore */}
            <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-bold text-blue-600 sm:text-sm">

                Explore

                <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                />

            </div>

        </article>
    )
}


// =====================================================
// SECURITY ITEM
// =====================================================

function SecurityItem({ text }) {

    return (

        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">

            <div className="flex items-start gap-3">

                {/* Check icon */}
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">

                    <Check size={13} />

                </div>


                {/* Text */}
                <p className="text-sm font-semibold leading-5 text-slate-200">
                    {text}
                </p>

            </div>

        </div>
    )
}


export default Landing