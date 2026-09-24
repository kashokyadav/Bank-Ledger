const transactionModel = require("../models/transaction.model")
const ledgerModel = require("../models/ledger.model")
const accountModel = require("../models/account.model")
const emailService = require("../service/email.service")
const mongoose = require("mongoose")
const userModel = require("../models/user.model")

/**  
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
     * 1. Validate request
     * 2. Validate idempotency key
     * 3. Check account status
     * 4. Derive sender balance from ledger
     * 5. Create transaction (PENDING)
     * 6. Create DEBIT ledger entry
     * 7. Create CREDIT ledger entry
     * 8. Mark transaction COMPLETED
     * 9. Commit MongoDB session
     * 10. Send email notification
 */


//  -----> Normal User Controller Functions <----
// Create a  transation b/w to users 
async function createTransaction(req, res) {
    /**
     * 1. Validate request
     *
     * The user should NOT send fromAccount.
     * The sender is automatically taken from the
     * currently logged-in user's account.
     */
    const { toAccount, amount, idempotencyKey } = req.body;

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        });
    }

    // Check if toAccount is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(toAccount)) {
        return res.status(400).json({
            message: "Invalid toAccount ID"
        })
    }

    // Check if amount is a number and greater than 0
    if (typeof amount !== "number") {
        return res.status(400).json({
            message: "Amount must be a number"
        })
    }

    // Check if amount is greater than 0 
    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0"
        });
    }

    //  Validate idempotency key
    if (typeof idempotencyKey !== "string" || idempotencyKey.trim() === "") {
        return res.status(400).json({
            message: "Invalid idempotencyKey"
        })
    }


    /**
     * 2. Find sender account
     *
     * req.user.accountId comes from the logged-in user.
     */
    const fromUserAccount = await accountModel.findOne({
        user: req.user._id,
        status: "ACTIVE"
    });


    /**
     * 3. Find receiver account
     */
    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
        status: "ACTIVE"
    });


    if(toAccount.status == "FROZEN"){
        return res.status(400).json({
            message: "Receiver account is frozen  cannot transfer money to this account"
        })
    }

    if(toAccount.status == "CLOSED"){
        return res.status(400).json({
            message: "Receiver account is closed  cannot transfer money to this account"
        })
    }

    
    if (fromUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: `Sender account is ${fromUserAccount.status.toLowerCase()}`
        });
    }

    if (toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: `Receiver account is ${toUserAccount.status.toLowerCase()}`
        });
    }


    /**
     * 4. Check both accounts
     */
    if (!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid sender or receiver account"
        });
    }


    /**
     * 5. Prevent sending money to yourself
     */
    if (fromUserAccount._id.equals(toUserAccount._id)) {
        return res.status(400).json({
            message: "You cannot transfer money to your own account"
        });
    }


    /**
     * 6. Check idempotency key
     *
     * Prevents the same request from creating
     * multiple transactions.
     */
    const existingTransaction = await transactionModel.findOne({
        idempotencyKey
    });


    if (existingTransaction) {


        if (
            existingTransaction.amount !== amount ||
            existingTransaction.toAccount.toString() !== toAccount.toString()
        ) {
            return res.status(409).json({
                message: "Idempotency key is already used for a different transaction"
            });
        }

        if (existingTransaction.status === "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: existingTransaction
            });
        }

        if (existingTransaction.status === "PENDING") {
            return res.status(200).json({
                message: "Transaction is still processing"
            });
        }

        if (existingTransaction.status === "FAILED") {
            return res.status(400).json({
                message: "Transaction processing failed, please retry with a new idempotency key"
            });
        }

        if (existingTransaction.status === "REVERSED") {
            return res.status(400).json({
                message: "Transaction was reversed, please retry with a new idempotency key"
            });
        }
    }


    /**
     * 7. Check sender balance
     *
     * Balance is calculated from the ledger.
     */
    const balance = await fromUserAccount.getBalance();


    if (balance < amount) {
        return res.status(400).json({
            message:
                `Insufficient balance. Current balance is ${balance}. ` +
                `Requested amount is ${amount}`
        });
    }


    /**
     * 8. Start MongoDB session
     */
    const session = await mongoose.startSession();
    let transaction;
    try {
        //  9. Start MongoDB transaction
        session.startTransaction();

        //   10. Create transaction with PENDING status
        transaction = (
            await transactionModel.create([{
                fromAccount: fromUserAccount._id,
                toAccount: toUserAccount._id,
                amount,
                idempotencyKey,
                type: "TRANSFER",
                status: "PENDING"
            }], {
                session
            })
        )[0];


        /**
         * 11. Create DEBIT ledger entry
         *
         * Money is removed from sender's balance.
         */
        await ledgerModel.create([{
            account: fromUserAccount._id,
            amount,
            transaction: transaction._id,
            type: "DEBIT"
        }], {
            session
        });


        /**
         * 12. Create CREDIT ledger entry
         *
         * Money is added to receiver's balance.
         */
        await ledgerModel.create([{
            account: toUserAccount._id,
            amount,
            transaction: transaction._id,
            type: "CREDIT"
        }], {
            session
        });


        /**
         * 13. Mark transaction as COMPLETED
         */
        transaction.status = "COMPLETED";


        /**
         * 14. Save transaction
         */
        await transaction.save({
            session
        });


        /**
         * 15. Commit everything
         *
         * Transaction + DEBIT + CREDIT
         * are permanently saved together.
         */
        await session.commitTransaction();

        return res.status(201).json({
            message: "Transaction completed successfully",
            transaction
        });


    } catch (error) {

        /**
         * 16. Something failed.
         *
         * Roll back everything created
         * inside the MongoDB transaction.
         */
        await session.abortTransaction();

        console.error(
            "Transaction failed:",
            error
        );


        if (error.code === 11000) {
            return res.status(409).json({
                message: "Duplicate transaction request"
            });
        }

        return res.status(500).json({
            message: "Transaction failed. No money was transferred."
        });


    } finally {

        /**
         * 17. Always close the session
         */
        await session.endSession();

    }


    /**
     * 18. Send email notification
     *
     * This happens only after the database
     * transaction has successfully committed.
     */
    try {

        await emailService.sendTransactionEmail(
            req.user.email,
            req.user.name,
            amount,
            toUserAccount._id
        );

    } catch (emailError) {

        /**
         * Email failure should NOT undo
         * an already completed money transaction.
         */
        console.error(
            "Transaction email failed:",
            emailError
        );

    }


    /**
     * 19. Send success response
     */
    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction
    });
}


async function createInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        })
    }



    // Check if toAccount exists
    if (!mongoose.Types.ObjectId.isValid(toAccount)) {
        return res.status(400).json({
            message: "Invalid toAccount ID !!"
        });
    }


    if (!mongoose.Types.ObjectId.isValid(toAccount)) {
    return res.status(400).json({
        message: "Invalid toAccount ID"
    });
}
    

    // Amount must be greater than 0
    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0"
        })
    }
 
    // Check if toAccount exists
    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })
    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }


    // check 
    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })
    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }

    
    if (fromUserAccount._id.equals(toUserAccount._id)) {
        return res.status(400).json({
            message: "System account cannot receive initial funds"
        })
    }
    

    // 5. Check system account - balance
    const systemBalance = await fromUserAccount.getBalance();
    if (systemBalance < amount) {
        return res.status(400).json({
            message: "Insufficient system account balance"
        });
    }


    // 6. Check if transaction with same idempotencyKey already exists
    const existingTransaction = await transactionModel.findOne({
        idempotencyKey
    });
    if (existingTransaction) {
        return res.status(200).json({
            message: "Transaction already processed",
            transaction: existingTransaction
        });
    }


    // 7. Check if initial funding has already been processed for this user
    const existingInitialFunding = await transactionModel.findOne({
        toAccount: toUserAccount._id,
        type: "INITIAL_FUND",
        status: "COMPLETED"
    });
    if (existingInitialFunding) {
        return res.status(400).json({
            message: "Initial funds already processed for Your account"
        });
    }


    // 8. Start MongoDB session
    const session = await mongoose.startSession();

    try {
        // 9. Start MongoDB transaction
        session.startTransaction();

        // 10. Create transaction with PENDING status
        const transaction = new transactionModel({
            fromAccount: fromUserAccount._id,
            toAccount: toUserAccount._id,
            amount,
            idempotencyKey,
            type: "INITIAL_FUND",
            status: "PENDING"
        });


        // 11. Create DEBIT ledger entry ->  Money leaves System Account
        await ledgerModel.create([{
            account: fromUserAccount._id,
            amount: amount,
            transaction: transaction._id,
            type: "DEBIT"
        }], {
            session
        });

        // 12. Create CREDIT ledger entry
        // Money enters Normal User Account
        await ledgerModel.create([{
            account: toUserAccount._id,
            amount: amount,
            transaction: transaction._id,
            type: "CREDIT"
        }], {
            session
        });


        // 13. Change transaction status
        transaction.status = "COMPLETED";


        // 14. Save transaction
        await transaction.save({
            session
        });


        // 15. Commit everything
        await session.commitTransaction();


        // 16. Send successful response
        return res.status(201).json({
            message: "Initial funds transaction completed successfully",
            transaction
        });


    } catch (error) {

        // 17. Something failed
        // Undo all operations inside the transaction
        await session.abortTransaction();

        console.error(
            "Initial funds transaction failed:",
            error
        );

        return res.status(500).json({
            message: "Initial funds transaction failed"
        });


    } finally {
        // 18. Always close the session
        await session.endSession();
    }

}



const INITIAL_FUND_AMOUNT = 1000;
// Request initial funds for a user
async function requestInitialFunds(req, res) {

    // 1. Get the logged-in user's ID
    const userId = req.user._id;


    // 2. Find the user's account
    const userAccount = await accountModel.findOne({
        user: userId,
        status: "ACTIVE"
    });

    if (!userAccount) {
        return res.status(400).json({
            message: "Active user account not found"
        });
    }


    // 3. Check whether this user already received initial funds
    const existingInitialFund = await transactionModel.findOne({
        toAccount: userAccount._id,
        type: "INITIAL_FUND",
        status: "COMPLETED"
    });
    if (existingInitialFund) {
        return res.status(400).json({
            message: "Initial funds have already been claimed"
        });
    }


    // 4. Find the System User
    const systemUser = await userModel.findOne({
        systemUser: true
    });
    if (!systemUser) {
        return res.status(500).json({
            message: "System user not found"
        });
    }


    // 5. Find the System Account
    const systemAccount = await accountModel.findOne({
        user: systemUser._id,
        status: "ACTIVE"
    });
    if (!systemAccount) {
        return res.status(500).json({
            message: "System account not found"
        });
    }


    // 6. Prevent System Account from receiving its own initial funds
    if (systemAccount._id.equals(userAccount._id)) {
        return res.status(400).json({
            message: "System account cannot request initial funds"
        });
    }


    // 7. Check System Account balance
    const systemBalance = await systemAccount.getBalance();
    if (systemBalance < INITIAL_FUND_AMOUNT) {
        return res.status(400).json({
            message: "System does not have enough funds"
        });
    }


    // 8. Generate a unique idempotency key
    const idempotencyKey =
        `initial-fund-${userId}-${Date.now()}`;


    // 9. Start MongoDB session
    const session = await mongoose.startSession();


    try {

        // 10. Start transaction
        session.startTransaction();


        // 11. Create transaction
        const transaction = new transactionModel({
            fromAccount: systemAccount._id,
            toAccount: userAccount._id,
            amount: INITIAL_FUND_AMOUNT,
            idempotencyKey,
            type: "INITIAL_FUND",
            status: "PENDING"
        });


        // 12. DEBIT System Account
        await ledgerModel.create([{
            account: systemAccount._id,
            amount: INITIAL_FUND_AMOUNT,
            transaction: transaction._id,
            type: "DEBIT"
        }], {
            session
        });


        // 13. CREDIT User Account
        await ledgerModel.create([{
            account: userAccount._id,
            amount: INITIAL_FUND_AMOUNT,
            transaction: transaction._id,
            type: "CREDIT"
        }], {
            session
        });


        // 14. Mark transaction as completed
        transaction.status = "COMPLETED";


        // 15. Save transaction
        await transaction.save({
            session
        });


        // 16. Commit everything
        await session.commitTransaction();


        return res.status(201).json({
            message: "Initial funds of ₹1000 added successfully",
            transaction
        });


    } catch (error) {

        // 17. If anything fails, undo everything
        await session.abortTransaction();

        console.error(
            "Initial funds transaction failed:",
            error
        );

        return res.status(500).json({
            message: "Initial funds transaction failed"
        });


    } finally {

        // 18. Always close session
        await session.endSession();

    }
}


// Request demo funds for a user
const DAILY_DEMO_LIMIT = 500;
async function requestDemoFunds(req, res) {

    try {

        // 1. Get logged-in user's ID
        const userId = req.user._id;


        // 2. Get requested amount
        const { amount, idempotencyKey } = req.body;


        // 3. Validate required fields
        if (!amount || !idempotencyKey) {
            return res.status(400).json({
                message: "amount and idempotencyKey are required"
            });
        }


        // 4. Validate amount
        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }


        // 5. Find user's active account
        const userAccount = await accountModel.findOne({
            user: userId,
            status: "ACTIVE"
        });

        if (!userAccount) {
            return res.status(400).json({
                message: "Active user account not found"
            });
        }


        // 6. Check idempotency key
        const existingTransaction = await transactionModel.findOne({
            idempotencyKey
        });

        if (existingTransaction) {
            return res.status(200).json({
                message: "Request already processed",
                transaction: existingTransaction
            });
        }


        // 7. Find today's date range

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(
            startOfTomorrow.getDate() + 1
        );


        // 8. Find today's completed demo funding transactions

        const todayTransactions = await transactionModel.find({
            toAccount: userAccount._id,
            type: "FUND_REQUEST",
            status: "COMPLETED",

            createdAt: {
                $gte: startOfToday,
                $lt: startOfTomorrow
            }
        });


        // 9. Calculate today's total funding

        const todayTotal = todayTransactions.reduce(
            (total, transaction) => {
                return total + transaction.amount;
            },
            0
        );


        // 10. Check daily limit

        if (todayTotal + amount > DAILY_DEMO_LIMIT) {

            const remainingAmount =
                DAILY_DEMO_LIMIT - todayTotal;

            return res.status(400).json({
                message:
                    `Daily demo funding limit is ₹${DAILY_DEMO_LIMIT}. ` +
                    `You can receive only ₹${remainingAmount} more today.`
            });
        }


        // 11. Find System User

        const systemUser = await userModel.findOne({
            systemUser: true
        });

        if (!systemUser) {
            return res.status(500).json({
                message: "System user not found"
            });
        }


        // 12. Find System Account

        const systemAccount = await accountModel.findOne({
            user: systemUser._id,
            status: "ACTIVE"
        });

        if (!systemAccount) {
            return res.status(500).json({
                message: "System account not found"
            });
        }


        // 13. Check System Account balance

        const systemBalance =
            await systemAccount.getBalance();

        if (systemBalance < amount) {
            return res.status(400).json({
                message: "System account has insufficient funds"
            });
        }


        // 14. Start MongoDB session

        const session = await mongoose.startSession();

        try {

            // 15. Start database transaction

            session.startTransaction();


            // 16. Create FUND_REQUEST transaction

            const transaction = new transactionModel({
                fromAccount: systemAccount._id,
                toAccount: userAccount._id,
                amount,
                idempotencyKey,
                type: "FUND_REQUEST",
                status: "PENDING"
            });


            // 17. Debit System Account

            await ledgerModel.create([{
                account: systemAccount._id,
                amount,
                transaction: transaction._id,
                type: "DEBIT"
            }], {
                session
            });


            // 18. Credit User Account

            await ledgerModel.create([{
                account: userAccount._id,
                amount,
                transaction: transaction._id,
                type: "CREDIT"
            }], {
                session
            });


            // 19. Mark transaction completed

            transaction.status = "COMPLETED";


            // 20. Save transaction

            await transaction.save({
                session
            });


            // 21. Commit transaction

            await session.commitTransaction();


            // 22. Send response

            return res.status(201).json({
                message:
                    `Demo funds of ₹${amount} added successfully`,
                transaction
            });


        } catch (error) {

            // Undo database transaction

            await session.abortTransaction();

            console.error(
                "Demo funding failed:",
                error
            );

            return res.status(500).json({
                message: "Demo funding transaction failed"
            });

        } finally {

            // Always close session

            await session.endSession();
        }


    } catch (error) {

        console.error(
            "Request demo funds error:",
            error
        );

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// protected route for logged-in users only
// to get all transactions of the logged-in user
async function getMyTransactions(req, res) {

    try {

        // 1. Get the logged-in user's ID
        const userId = req.user._id;


        // 2. Find the user's account
        const userAccount = await accountModel.findOne({
            user: userId
        });

        if (!userAccount) {
            return res.status(404).json({
                message: "User account not found"
            });
        }


        // 3. Find transactions where the user is
        //    either the sender OR receiver
        const transactions = await transactionModel
            .find({
                $or: [
                    { fromAccount: userAccount._id },
                    { toAccount: userAccount._id }
                ]
            })
            .sort({ createdAt: -1 });


        // 4. Return transactions
        return res.status(200).json({
            message: "Transactions fetched successfully",
            count: transactions.length,
            transactions
        });

    } catch (error) {

        console.error(
            "Get my transactions error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch transactions"
        });
    }
}


// get transaction details for a specific transaction of the logged-in user
async function getTransactionDetails(req, res) {

    try {

        const { transactionId } = req.params;

        // 1. Find the logged-in user's account
        const userAccount = await accountModel.findOne({
            user: req.user._id
        });

        if (!userAccount) {
            return res.status(404).json({
                message: "User account not found"
            });
        }


        // get transaction details for a specific transaction of the logged-in user
        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }
        
        // get transaction details for a specific transaction of the logged-in user
        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }

        // 2. Find the transaction
        const transaction = await transactionModel
            .findById(transactionId)
            .populate({
                path: "fromAccount",
                populate: {
                    path: "user",
                    select: "name email"
                }
            })
            .populate({
                path: "toAccount",
                populate: {
                    path: "user",
                    select: "name email"
                }
            });


        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }



        // 3. Security check
        // User must be sender OR receiver
        const isUserInvolved =
            transaction.fromAccount._id.equals(userAccount._id) ||
            transaction.toAccount._id.equals(userAccount._id);


        if (!isUserInvolved) {
            return res.status(403).json({
                message: "You are not authorized to view this transaction"
            });
        }


        // 4. Return transaction details
        return res.status(200).json({
            message: "Transaction details fetched successfully",
            transaction
        });

    } catch (error) {

        console.error(
            "Get transaction details error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch transaction details"
        });
    }
}



//   ----> System User Controller Functions <----

// protected route for system user only
// req.user is the System User because authSystemUserMiddleware already verified it 
// to get all transactions in the system
async function getAllTransactions(req, res) {  

    const transactions = await transactionModel
        .find({})
        .populate("fromAccount")
        .populate("toAccount")
        .sort({ createdAt: -1 });

    return res.status(200).json({
        message: "Transactions fetched successfully",
        totalTransactions: transactions.length,
        transactions: transactions
    });
}


// to get details of a specific transaction  in the system
async function getSystemTransactionDetails(req, res) {

    try {

        // Get transaction ID from URL
        const { transactionId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }


        // Find the transaction
        const transaction = await transactionModel
            .findById(transactionId)
            .populate({
                path: "fromAccount",
                populate: {
                    path: "user",
                    model: "user",
                    select: "name email"
                }
            })
            .populate({
                path: "toAccount",
                populate: {
                    path: "user",
                    model: "user",
                    select: "name email"
                }
            });
        // Transaction not found
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }


        // Return complete transaction details
        return res.status(200).json({
            message: "System transaction details fetched successfully",
            transaction: {
                transactionId: transaction._id,

                fromAccount: transaction.fromAccount,

                toAccount: transaction.toAccount,

                amount: transaction.amount,

                status: transaction.status,

                idempotencyKey: transaction.idempotencyKey,

                createdAt: transaction.createdAt,

                updatedAt: transaction.updatedAt
            }
        });

    } catch (error) {

        console.error(
            "Get system transaction details error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch transaction details"
        });
    }
}


// to get system dashboard data
async function getSystemDashboard(req, res) {

    try {
        // 1. Get total users
        const totalUsers = await userModel.countDocuments({
            systemUser: false
        });

        // 2. Get total accounts
        const totalAccounts = await accountModel.countDocuments();

        // 3. Get transaction statistics
        const totalTransactions =
            await transactionModel.countDocuments();


        const completedTransactions =
            await transactionModel.countDocuments({
                status: "COMPLETED"
            });


        const pendingTransactions =
            await transactionModel.countDocuments({
                status: "PENDING"
            });


        const failedTransactions =
            await transactionModel.countDocuments({
                status: "FAILED"
            });


        const reversedTransactions =
            await transactionModel.countDocuments({
                status: "REVERSED"
            });


        // ---------------------------------------
        // 4. Find System User
       
        const systemUser = await userModel
            .findOne({
                systemUser: true
            })
            .select("_id");


        if (!systemUser) {
            return res.status(404).json({
                message: "System user not found"
            });
        }


        // ---------------------------------------
        // 5. Find System Account
        const systemAccount = await accountModel.findOne({
            user: systemUser._id,
            status: {
                $ne: "CLOSED"
            }
        });


        if (!systemAccount) {
            return res.status(404).json({
                message: "System account not found"
            });
        }


        // ---------------------------------------
        // 6. Calculate System Account Balance
        const systemBalance =
            await systemAccount.getBalance();


        // ---------------------------------------
        // 7. Send dashboard response
        return res.status(200).json({

            message: "System dashboard data fetched successfully",

            dashboard: {

                systemBalance,

                totalUsers,

                totalAccounts,

                totalTransactions,

                completedTransactions,

                pendingTransactions,

                failedTransactions,

                reversedTransactions

            }

        });

    } catch (error) {

        console.error(
            "System dashboard error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch system dashboard data"
        });

    }

}


module.exports = {
    createTransaction ,
    createInitialFundsTransaction ,
    getAllTransactions , 
    requestInitialFunds ,
    requestDemoFunds ,
    getMyTransactions ,
    getTransactionDetails , // Get Transaction Details By Id
    getSystemTransactionDetails ,
    getSystemDashboard
}






