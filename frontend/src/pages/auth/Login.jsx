import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

import Input from "../../components/common/Input"
import Button from "../../components/common/Button"
import { loginUser } from "../../services/auth.service"


function Login() {

    const navigate = useNavigate()

    const { login } = useAuth() /**
     * "Give me the login() function from AuthContext."
    Because after backend login succeeds, we need to tell React:
        User is now logged in.
     */

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
 
    function handleChange(event) {  //This function runs whenever the user types into an input.
        const { name, value } = event.target //input field, name is the name of the input (email or password), and value is what the user typed in.

        setFormData((previous) => ({ 
            ...previous, // "Take the old form data, keep everything, and update the field that the user is currently typing in."
            [name]: value, // name is the name of the input field (email or password), and value is what the user typed in.
            //  [email] : value 
            // [name] : value 
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setError("")
        setSuccess("")
        setLoading(true)

        try {

            //  this use function  loginUser from auth.services.js file  , 
            // -> then  the input data is pass to  backend through  api.post("/auth/login", userData)  ,
            //  -> it  will wait for backend response before continuing.
            const data = await loginUser(formData) //This is where  frontend talks to the backend. 
                                                    // -Wait for the backend response before continuing.
            
            //This line connects to AuthContext
            login(data.user) //This is where we tell React that the user is now logged in.

            if (data.user.systemUser) {
                navigate("/system/dashboard")
            } else {
                navigate("/dashboard")
            }

            console.log("Login response:", data)


            
        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            )

        } finally {
            setLoading(false) // Set loading to false once the API call is complete
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
                        Login to your account
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>


                {/* Register link */}

                <p className="mt-6 text-center text-sm text-slate-500">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Create account
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Login