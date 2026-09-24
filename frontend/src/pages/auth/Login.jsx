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

    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    function handleChange(event) {

        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))

        if (error) {
            setError("")
        }
    }


    async function handleSubmit(event) {

        event.preventDefault()

        setError("")

        if (!formData.email.trim()) {
            setError("Please enter your email address.")
            return
        }

        if (!formData.password) {
            setError("Please enter your password.")
            return
        }


        try {

            setLoading(true)

            const data = await loginUser(formData)

            login(data.user)

            navigate("/dashboard")

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                "Unable to sign in. Please check your credentials and try again."

            setError(message)

        } finally {

            setLoading(false)

        }
    }


    return (
        <div className="
            min-h-screen
            bg-slate-50
            px-4
            py-6
            sm:px-6
            sm:py-10
            lg:px-8
        ">

            {/* Background */}

            <div className="
                pointer-events-none
                fixed
                left-1/2
                top-0
                -z-0
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
                z-10
                mx-auto
                flex
                min-h-[calc(100vh-3rem)]
                w-full
                max-w-md
                flex-col
                justify-center
            ">

                {/* Logo */}

                <div className="mb-7 text-center">

                    <Link
                        to="/"
                        className="
                            inline-flex
                            items-center
                            gap-3
                        "
                    >

                        <div className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-600
                            text-white
                            shadow-lg
                            shadow-blue-200
                        ">
                            <ShieldCheck
                                size={22}
                                strokeWidth={2.3}
                            />
                        </div>


                        <div className="text-left">

                            <p className="
                                text-sm
                                font-extrabold
                                tracking-[0.14em]
                                text-slate-900
                            ">
                                BANK-LEDGER
                            </p>

                            <p className="
                                text-[11px]
                                font-medium
                                text-slate-400
                            ">
                                Modern digital banking
                            </p>

                        </div>

                    </Link>

                </div>


                {/* Login card */}

                <div className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-xl
                    shadow-slate-200/60
                    sm:p-7
                ">

                    {/* Heading */}

                    <div className="mb-7">

                        <div className="
                            mb-4
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                        ">
                            <LockKeyhole size={21} />
                        </div>


                        <h1 className="
                            text-2xl
                            font-black
                            tracking-tight
                            text-slate-900
                            sm:text-3xl
                        ">
                            Welcome back
                        </h1>


                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-500
                        ">
                            Sign in to access your BANK-LEDGER account.
                        </p>

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="
                            mb-5
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50
                            p-3.5
                        ">

                            <div className="
                                mt-0.5
                                h-2
                                w-2
                                shrink-0
                                rounded-full
                                bg-red-500
                            " />

                            <p className="
                                text-sm
                                leading-5
                                text-red-700
                            ">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}

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
                                        transition
                                        placeholder:text-slate-400
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-50
                                        disabled:bg-slate-50
                                    "
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div>

                            <div className="
                                mb-2
                                flex
                                items-center
                                justify-between
                            ">

                                <label
                                    htmlFor="password"
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                    "
                                >
                                    Password
                                </label>

                            </div>


                            <div className="relative">

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


                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
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
                                        transition
                                        placeholder:text-slate-400
                                        focus:border-blue-500
                                        focus:ring-4
                                        focus:ring-blue-50
                                        disabled:bg-slate-50
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="
                                        absolute
                                        right-2
                                        top-1/2
                                        flex
                                        h-8
                                        w-8
                                        -translate-y-1/2
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-slate-400
                                        transition
                                        hover:bg-slate-100
                                        hover:text-slate-600
                                    "
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* Submit */}

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
                                shadow-lg
                                shadow-blue-200
                                transition
                                hover:bg-blue-700
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {loading ? (
                                <>
                                    <span className="
                                        h-4
                                        w-4
                                        animate-spin
                                        rounded-full
                                        border-2
                                        border-white/40
                                        border-t-white
                                    " />

                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight size={17} />
                                </>
                            )}

                        </button>

                    </form>


                    {/* Register */}

                    <div className="
                        mt-6
                        border-t
                        border-slate-100
                        pt-6
                        text-center
                    ">

                        <p className="
                            text-sm
                            text-slate-500
                        ">
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
                                hover:text-blue-700
                            "
                        >
                            Create your account
                        </Link>

                    </div>

                </div>


                {/* Security */}

                <div className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    text-slate-400
                ">

                    <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                    />

                    Secure authentication

                </div>


                <div className="
                    mt-4
                    text-center
                ">

                    <Link
                        to="/"
                        className="
                            text-xs
                            font-medium
                            text-slate-400
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