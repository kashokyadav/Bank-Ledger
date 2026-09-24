import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Input from "../../components/common/Input"
import Button from "../../components/common/Button"
import { registerUser } from "../../services/auth.service"

function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    function handleChange(event) {

        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {

        event.preventDefault()

        setError("")
        setSuccess("")
        setLoading(true)

        try {

            const data = await registerUser(formData) //This is where  frontend talks to the backend.

            setSuccess(
                data.message || "Registration successful"
            )

            console.log("Register response:", data)

            setTimeout(() => {
                navigate("/login")
            }, 1000)

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            )

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                {/* Header */}

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-blue-700">
                        BANK-LEDGER
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Create your account
                    </p>

                </div>


                {/* Error */}

                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}


                {/* Success */}

                {success && (
                    <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )}


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </Button>

                </form>


                {/* Login link */}

                <p className="mt-6 text-center text-sm text-slate-500">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Register