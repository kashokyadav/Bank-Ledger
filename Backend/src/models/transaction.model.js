const mongoose = require("mongoose")


const transactionSchema = new mongoose.Schema({

    fromAccount: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Account model
        ref: "account", // Reference to the Account model
        required: [ true, "Transaction must be associated with a from account" ],
        index: true // Create an index for efficient querying
    },


    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "Transaction must be associated with a to account" ],
        index: true
    },
    

    type: {
        type: String,
        enum: {
            values: ["TRANSFER",  "INITIAL_FUND","FUND_REQUEST", "SYSTEM_INITIALIZATION"],
            message: "Type must be either TRANSFER or SYSTEM_INITIALIZATION"
            /**
             * TRANSFER
                    User A → User B

                INITIAL_FUND
                    System → User (one time)
                FUND_REQUEST
                    User requests demo funds
                SYSTEM_INITIALIZATION
                    System → System (one time)
             */
        },
        default: "TRANSFER"
    },


    status: {
        type: String,
        enum: {
            values: [ "PENDING", "COMPLETED", "FAILED", "REVERSED" ],
            message: "Status can be either PENDING, COMPLETED, FAILED or REVERSED",
        },
        default: "PENDING"
    },


    amount: {
        type: Number,
        required: [ true, "Amount is required for creating a transaction" ],
        min: [ 0, "Transaction amount cannot be negative" ]
    },


    idempotencyKey: {
        type: String,
        required: [ true, "Idempotency Key is required for creating a transaction" ],
        index: true,
        unique: true
    }
  
}, {
    timestamps: true
})

const transactionModel = mongoose.model("transaction", transactionSchema)


module.exports = transactionModel   