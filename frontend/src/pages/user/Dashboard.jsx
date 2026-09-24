import { useEffect, useState } from "react"

import Card from "../../components/common/Card"
import StatCard from "../../components/common/StatCard"

import {
    getMyBalance,
    getMyAccounts,
    getMyTransactions,
} from "../../services/user.service"


function UserDashboard() {

    const [balance, setBalance] = useState(0)
    const [accounts, setAccounts] = useState([])
    const [transactions, setTransactions] = useState([])


    useEffect(() => {

        async function loadUserData() {

            try {

                // =========================
                // BALANCE
                // =========================

                const balanceData = await getMyBalance()

                console.log("BALANCE API:", balanceData)

                setBalance(balanceData.balance)


                // =========================
                // ACCOUNTS
                // =========================

                const accountsData = await getMyAccounts()

                console.log("ACCOUNTS API:", accountsData)

                setAccounts(accountsData.accounts)


                // =========================
                // TRANSACTIONS
                // =========================

                const transactionsData = await getMyTransactions()

                console.log("TRANSACTIONS API:", transactionsData)

                setTransactions(transactionsData.transactions)

            } catch (error) {

                console.error(
                    "Dashboard API Error:",
                    error.response?.data || error.message
                )

            }

        }

        loadUserData()

    }, [])


    return (

        <div className="space-y-6">

            {/* HEADER */}

            <div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Welcome back 👋
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Here's your banking overview.
                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="Total Balance"
                    value={`₹${balance.toLocaleString("en-IN")}`}
                />


                <StatCard
                    title="Total Accounts"
                    value={accounts.length}
                />


                <StatCard
                    title="Account Status"
                    value={
                        accounts.length > 0
                            ? accounts[0].status
                            : "No Account"
                    }
                    valueClassName="text-green-600"
                />

            </div>


            {/* TRANSACTIONS */}

            <Card>

                <div className="mb-5">

                    <h2 className="text-lg font-bold text-slate-800">
                        Recent Transactions
                    </h2>

                    <p className="text-sm text-slate-500">
                        Your latest account activity.
                    </p>

                </div>


                {transactions.length === 0 ? (

                    <div className="py-6 text-center text-sm text-slate-500">
                        No transactions found.
                    </div>

                ) : (

                    <div className="space-y-4">

                        {transactions.map((transaction) => (

                            <div
                                key={transaction._id}
                                className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between"
                            >

                                <div>

                                    <p className="font-medium text-slate-700">
                                        {transaction.status}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        {transaction._id}
                                    </p>

                                </div>


                                <p className="font-semibold text-slate-700">
                                    ₹{transaction.amount}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </Card>

        </div>

    )
}


export default UserDashboard