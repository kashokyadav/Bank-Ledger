require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db")

 

const userModel = require("../models/user.model");
const accountModel = require("../models/account.model");
const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");


async function createSystemUser() {

    let session;

    try {

        // 1 . Connect using our existing DB configuration
        // This also applies the Google DNS servers
        await connectDB();

        console.log("Database connection ready");


        // ====================================================
        // 2. CHECK SYSTEM USER
        // ====================================================

        const existingSystemUser = await userModel
            .findOne({
                systemUser: true
            })
            .select("+systemUser");


        if (existingSystemUser) {

            console.log("System User already exists");

            return;
        }


        // ====================================================
        // 3. START DATABASE SESSION
        // ====================================================

        session = await mongoose.startSession();

        session.startTransaction();


        // ====================================================
        // 4. CREATE SYSTEM USER
        // ====================================================

        const systemUserData = await userModel.create([{

            name: "Admin Ashok",

            email: "Kulluashok14@gmail.com",

            password: "systemadmin14adminkullu",

            systemUser: true

        }], { session });


        const systemUser = systemUserData[0];


        console.log("System User created");


        // ====================================================
        // 5. CREATE SYSTEM ACCOUNT
        // ====================================================

        const systemAccountData = await accountModel.create([{

            user: systemUser._id,

            isSystemAccount: true,

            status: "ACTIVE",

            currency: "INR"

        }], { session });


        const systemAccount = systemAccountData[0];


        console.log("System Account created");


        // ====================================================
        // 6. CREATE INITIAL TRANSACTION
        // ====================================================

        const transactionData = await transactionModel.create([{

            fromAccount: systemAccount._id,

            toAccount: systemAccount._id,

            amount: 100000,

            type: "SYSTEM_INITIALIZATION",

            status: "COMPLETED",

            idempotencyKey: "74e59371-689e-44a8-b91e-67d204f05886"

        }], { session });


        const transaction = transactionData[0];


        console.log("Initial Transaction created");


        // ====================================================
        // 7. CREATE INITIAL LEDGER
        // ====================================================

        await ledgerModel.create([{

            account: systemAccount._id,

            amount: 100000,

            transaction: transaction._id,

            type: "CREDIT"

        }], { session });


        console.log("Initial Ledger created");


        // ====================================================
        // 8. COMMIT TRANSACTION
        // ====================================================

        await session.commitTransaction();


        console.log("--------------------------------");
        console.log("SYSTEM SETUP COMPLETED");
        console.log("--------------------------------");

        console.log(
            "System User:",
            systemUser.email
        );

        console.log(
            "System User ID:",
            systemUser._id
        );

        console.log(
            "System Account ID:",
            systemAccount._id
        );

        console.log(
            "Initial Balance: ₹100000"
        );

        console.log("--------------------------------");


    } catch (error) {

        // ====================================================
        // 9. ROLLBACK IF SOMETHING FAILS
        // ====================================================

        if (session) {
            await session.abortTransaction();
        }

        console.error(
            "System setup failed:",
            error
        );


    } finally {

        // ====================================================
        // 10. END SESSION
        // ====================================================

        if (session) {
            await session.endSession();
        }


        // ====================================================
        // 11. CLOSE DATABASE CONNECTION
        // ====================================================

        await mongoose.connection.close();

        console.log("Database connection closed");
    }
}


// ============================================================
// RUN
// ============================================================

createSystemUser();