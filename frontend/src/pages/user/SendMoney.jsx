import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Card from "../../components/common/Card"
import { getRecipientAccounts } from "../../services/user.service"

function SendMoney() {
    const navigate = useNavigate()

    const [recipients, setRecipients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchRecipients() {
            try {
                setLoading(true)
                setError("")

                const data = await getRecipientAccounts()

                setRecipients(data.accounts || [])
            } catch (error) {
                console.error(
                    "Get Recipients Error:",
                    error.response?.data || error.message
                )

                setError(
                    error.response?.data?.message ||
                    "Failed to load recipients."
                )
            } finally {
                setLoading(false)
            }
        }

        fetchRecipients()
    }, [])

    function handleSendMoney(accountId) {
        navigate(`/send-money/${accountId}`)
    }

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Recipients
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Select a user to send money
                </p>
            </div>


            {/* Loading */}
            {loading && (
                <Card>
                    <p className="py-6 text-center text-slate-500">
                        Loading recipients...
                    </p>
                </Card>
            )}


            {/* Error */}
            {!loading && error && (
                <Card>
                    <p className="py-6 text-center text-red-600">
                        {error}
                    </p>
                </Card>
            )}


            {/* Empty */}
            {!loading && !error && recipients.length === 0 && (
                <Card>
                    <div className="py-6 text-center">
                        <p className="font-semibold text-slate-700">
                            No Recipients Found
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            There are no other active users available.
                        </p>
                    </div>
                </Card>
            )}


            {/* Recipients */}
            {!loading && !error && recipients.length > 0 && (
                <div className="grid gap-4">
                    {recipients.map((account) => (
                        <Card key={account._id}>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div>
                                    <h2 className="font-semibold text-slate-800">
                                        {account.user?.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Account ••••••
                                        {account._id.slice(-4)}
                                    </p>
                                </div>


                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSendMoney(account._id)
                                    }
                                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Send Money
                                </button>

                            </div>

                        </Card>
                    ))}
                </div>
            )}

        </div>
    )
}

export default SendMoney