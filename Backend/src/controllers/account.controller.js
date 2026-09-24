const accountModel = require("../models/account.model");
const userModel = require("../models/user.model");


async function createAccountController(req, res) {

    const user = req.user;

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    })

}


async function getUserAccountsController(req, res) {

    const accounts = await accountModel.find({ user: req.user._id });

    res.status(200).json({
        accounts
    })
    console.log("Accounts fetched successfully");
    console.log(accounts);
}


async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}


// protected route for system user only
async function getSystemBalance(req, res) { 

    // req.user is the System User
    // because authSystemUserMiddleware already verified it

    const systemAccount = await accountModel.findOne({
        user: req.user._id,
        status: "ACTIVE"
    });

    if (!systemAccount) {
        return res.status(404).json({
            message: "System account not found"
        });
    }

    const balance = await systemAccount.getBalance();

    return res.status(200).json({
        message: "System account balance fetched successfully",
        accountId: systemAccount._id,
        balance: balance,
        currency: systemAccount.currency
    });
}


// protected route for system user only
async function getAllUsers(req, res) {

    const users = await userModel.find({})
        .select("-password");

    return res.status(200).json({
        message: "Users fetched successfully",
        totalUsers: users.length,
        users: users
    });
}




// protected route for system user only
//  to get all accounts in system 
async function getAllAccounts(req, res) {

    const accounts = await accountModel
        .find({})
        .populate("user", "name email");

    return res.status(200).json({
        message: "Accounts fetched successfully",
        totalAccounts: accounts.length,
        accounts: accounts
    });
}


// protected route for logged-in users only
async function getMyBalance(req, res) {

    // Get the logged-in user's account
    const account = await accountModel.findOne({
        user: req.user._id,
        status: "ACTIVE"
    });

    // Account doesn't exist
    if (!account) {
        return res.status(404).json({
            message: "Active account not found"
        });
    }

    // Calculate balance from ledger
    const balance = await account.getBalance();

    return res.status(200).json({
        message: "Balance fetched successfully",
        accountId: account._id,
        currency: account.currency,
        balance: balance
    });
}


// protected route for logged-in users
// Get other normal users/accounts for sending money
async function getRecipientAccounts(req, res) {

    const users = await userModel
        .find({
            _id: {
                $ne: req.user._id
            },
            systemUser: false
        })
        .select("_id name email");

    const userIds = users.map((user) => user._id);

    const accounts = await accountModel
        .find({
            user: {
                $in: userIds
            },
            status: "ACTIVE"
        })
        .populate("user", "name email");

    return res.status(200).json({
        message: "Recipient accounts fetched successfully",
        totalRecipients: accounts.length,
        accounts
    });
}


module.exports = {
    createAccountController , //  createAccountController is used to create a new account for the logged-in user
    getUserAccountsController, // getUserAccountsController is used to fetch all accounts of the logged-in user
    getAccountBalanceController , // getAccountBalanceController is used to fetch the balance of a specific account of the logged-in user
    getSystemBalance , //   getSystemBalance is used to fetch the balance of the system account, accessible only to the system user
    getAllUsers , // getAllUsers is used to fetch all users in the system, accessible only to the system user
    getAllAccounts , // getAllAccounts is used to fetch all accounts in the system, accessible only to the system user
    getMyBalance , // getMyBalance is used to fetch the balance of the logged-in user's account
    getRecipientAccounts 
}