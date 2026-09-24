import api from "./api"

export async function getMyBalance() {
    const response = await api.get("/accounts/my-balance")
    return response.data
}

export async function getMyAccounts() {
    const response = await api.get("/accounts")
    return response.data
}

export async function createAccount(accountData) {
    const response = await api.post("/accounts", accountData)
    return response.data
}

export async function getMyTransactions() {
    const response = await api.get("/transactions/my-transactions")
    return response.data
}


export async function createTransaction(transactionData) {
    const response = await api.post(
        "/transactions",
        transactionData
    )

    return response.data
}


export async function getTransactionById(transactionId) {

    const response = await api.get(`/transactions/${transactionId}`)

    return response.data

}

export async function getRecipientAccounts() {
    const response = await api.get("/accounts/recipients")
    return response.data
}


export async function getAccountBalance(accountId) {
    const response = await api.get(`/accounts/balance/${accountId}`)
    return response.data
}