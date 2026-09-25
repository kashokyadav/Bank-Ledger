import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react"

import { loginUser } from "../../services/auth.service"
import { useAuth } from "../../context/AuthContext"


function Login() {

    // ======================================================
    // ROUTER + AUTH
    // ======================================================

    const navigate = useNavigate()

    const { login } = useAuth()


    // ======================================================
    // FORM STATE
    // ======================================================

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })


    // Controls password visibility.
    const [showPassword, setShowPassword] = useState(false)

    // Controls login button loading state.
    const [loading, setLoading] = useState(false)

    // Stores API/validation error messages.
    const [error, setError] = useState("")


    // ======================================================
    // HANDLE INPUT CHANGE
    // ======================================================

    function handleChange(event) {

        const { name, value } = event.target

        // Update only the changed field.
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))

        // Remove old error when user starts correcting input.
        if (error) {
            setError("")
        }
    }


    // ======================================================
    // HANDLE LOGIN
    // ======================================================

    async function handleSubmit(event) {

        // Prevent browser page refresh.
        event.preventDefault()

        // Clear previous error.
        setError("")


        // ----------------------------------------------
        // Basic validation
        // ----------------------------------------------

        if (!formData.email.trim()) {
            setError("Please enter your email address.")
            return
        }

        if (!formData.password) {
            setError("Please enter your password.")
            return
        }


        try {

            // Start loading state.
            setLoading(true)

            // Send login request to backend.
            const data = await loginUser(formData)

            // Store authenticated user in auth context.
            login(data.user)

            // Redirect to dashboard after successful login.
            navigate("/dashboard")

        } catch (error) {

            // Get backend error message when available.
            const message =
                error?.response?.data?.message ||
                "Unable to sign in. Please check your credentials and try again."

            // Display error to user.
            setError(message)

        } finally {

            // Stop loading state.
            setLoading(false)

        }
    }


    // ======================================================
    // UI
    // ======================================================

    return (

        <div
            className="
                flex
                min-h-[calc(100vh-72px)]
                items-center
                justify-center
                bg-slate-50
                px-4
                py-8
                sm:px-6
                sm:py-10
                lg:px-8
            "
        >

            {/* ================================================== */}
            {/* BACKGROUND DECORATION                              */}
            {/* ================================================== */}

            <div
                className="
                    pointer-events-none
                    fixed
                    left-1/2
                    top-0
                    -z-0
                    h-64
                    w-64
                    -translate-x-1/2
                    rounded-full
                    bg-blue-100/60
                    blur-3xl
                    sm:h-96
                    sm:w-96
                "
            />


            {/* ================================================== */}
            {/* LOGIN CONTAINER                                    */}
            {/* ================================================== */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                "
            >

                {/* ================================================== */}
                {/* BRAND                                              */}
                {/* ================================================== */}

                <div
                    className="
                        mb-6
                        flex
                        justify-center
                    "
                >

                    <Link
                        to="/"
                        className="
                            group
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {/* Logo */}

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-600
                                text-white
                                shadow-md
                                shadow-blue-200
                                transition
                                duration-200
                                group-hover:bg-blue-700
                            "
                        >

                            <ShieldCheck
                                size={22}
                                strokeWidth={2.3}
                            />

                        </div>


                        {/* Brand */}

                        <div className="text-left">

                            <p
                                className="
                                    text-sm
                                    font-extrabold
                                    tracking-[0.14em]
                                    text-slate-900
                                "
                            >
                                BANK-LEDGER
                            </p>

                            <p
                                className="
                                    text-[11px]
                                    font-medium
                                    text-slate-400
                                "
                            >
                                Modern digital banking
                            </p>

                        </div>

                    </Link>

                </div>


                {/* ================================================== */}
                {/* LOGIN CARD                                         */}
                {/* ================================================== */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-lg
                        shadow-slate-200/60
                        sm:rounded-3xl
                        sm:p-7
                    "
                >

                    {/* ================================================== */}
                    {/* HEADING                                            */}
                    {/* ================================================== */}

                    <div className="mb-6">

                        {/* Lock Icon */}

                        <div
                            className="
                                mb-4
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                            "
                        >

                            <LockKeyhole size={21} />

                        </div>


                        <h1
                            className="
                                text-2xl
                                font-black
                                tracking-tight
                                text-slate-900
                                sm:text-3xl
                            "
                        >
                            Welcome back
                        </h1>


                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            Sign in to access your BANK-LEDGER account.
                        </p>

                    </div>


                    {/* ================================================== */}
                    {/* ERROR MESSAGE                                      */}
                    {/* ================================================== */}

                    {error && (

                        <div
                            role="alert"
                            className="
                                mb-5
                                flex
                                items-start
                                gap-3
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                p-3.5
                            "
                        >

                            {/* Error Indicator */}

                            <span
                                className="
                                    mt-1.5
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    bg-red-500
                                "
                            />

                            {/* Error Text */}

                            <p
                                className="
                                    text-sm
                                    leading-5
                                    text-red-700
                                "
                            >
                                {error}
                            </p>

                        </div>

                    )}


                    {/* ================================================== */}
                    {/* LOGIN FORM                                         */}
                    {/* ================================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* ================================================== */}
                        {/* EMAIL                                               */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="email"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                Email address
                            </label>


                            <div className="relative">

                                {/* Email Icon */}

                                <Mail
                                    size={18}
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                {/* Email Input */}

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    disabled={loading}
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-slate-800
                                        outline-none
                                        transition-all
                                        placeholder:text-slate-400
                                        hover:border-slate-300
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-50
                                        disabled:cursor-not-allowed
                                        disabled:bg-slate-50
                                    "
                                />

                            </div>

                        </div>


                        {/* ================================================== */}
                        {/* PASSWORD                                             */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="password"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                Password
                            </label>


                            <div className="relative">

                                {/* Password Icon */}

                                <LockKeyhole
                                    size={18}
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />


                                {/* Password Input */}

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-white
                                        pl-11
                                        pr-12
                                        text-sm
                                        text-slate-800
                                        outline-none
                                        transition-all
                                        placeholder:text-slate-400
                                        hover:border-slate-300
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-50
                                        disabled:cursor-not-allowed
                                        disabled:bg-slate-50
                                    "
                                />


                                {/* Show / Hide Password */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) => !previous
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="
                                        absolute
                                        right-2
                                        top-1/2
                                        flex
                                        h-9
                                        w-9
                                        -translate-y-1/2
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-slate-400
                                        transition
                                        hover:bg-slate-100
                                        hover:text-slate-600
                                        disabled:cursor-not-allowed
                                    "
                                >

                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* ================================================== */}
                        {/* LOGIN BUTTON                                        */}
                        {/* ================================================== */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex
                                h-12
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-5
                                text-sm
                                font-bold
                                text-white
                                shadow-md
                                shadow-blue-200
                                transition-all
                                duration-200
                                hover:bg-blue-700
                                hover:shadow-lg
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading ? (

                                <>
                                    {/* Loading Spinner */}

                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/40
                                            border-t-white
                                        "
                                    />

                                    <span>
                                        Signing in...
                                    </span>
                                </>

                            ) : (

                                <>
                                    <span>
                                        Sign in
                                    </span>

                                    <ArrowRight size={17} />
                                </>

                            )}

                        </button>

                    </form>


                    {/* ================================================== */}
                    {/* REGISTER SECTION                                    */}
                    {/* ================================================== */}

                    <div
                        className="
                            mt-6
                            border-t
                            border-slate-100
                            pt-6
                            text-center
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            Don't have an account?
                        </p>


                        <Link
                            to="/register"
                            className="
                                mt-1
                                inline-block
                                text-sm
                                font-bold
                                text-blue-600
                                transition
                                hover:text-blue-700
                                hover:underline
                            "
                        >
                            Create your account
                        </Link>

                    </div>

                </div>


                {/* ================================================== */}
                {/* SECURITY STATUS                                   */}
                {/* ================================================== */}

                <div
                    className="
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-xs
                        text-slate-400
                    "
                >

                    <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                    />

                    <span>
                        Secure authentication
                    </span>

                </div>


                {/* ================================================== */}
                {/* BACK TO HOME                                       */}
                {/* ================================================== */}

                <div className="mt-4 text-center">

                    <Link
                        to="/"
                        className="
                            text-xs
                            font-medium
                            text-slate-400
                            transition
                            hover:text-blue-600
                        "
                    >
                        ← Back to BANK-LEDGER
                    </Link>

                </div>

            </div>

        </div>
    )
}


export default Login