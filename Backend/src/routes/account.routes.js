const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router = express.Router();



// post/api/accounts/
//  - create a new account
// protected route 
router.post("/" , authMiddleware.authMiddleware , accountController.createAccountController);


/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)


/**
 * - GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)


/**
 * - GET /api/accounts/my-balance
 * - Get the balance of the logged-in user's account
 * - Protected Route for logged-in users only
 */
router.get(
    "/my-balance",
    authMiddleware.authMiddleware,
    accountController.getMyBalance
);

/**
 * - GET /api/accounts/recipients
 * - Get other active accounts for sending money
 * - Protected Route for logged-in users
 */
router.get(
    "/recipients",
    authMiddleware.authMiddleware,
    accountController.getRecipientAccounts
);



// -------------->>.     System User Only Routes --------
/**
 * - GET /api/accounts/system/balance
 * - Get the balance of the system account
 * - Protected Route for System User only
 */
router.get("/system/balance", authMiddleware.authSystemUserMiddleware, accountController.getSystemBalance)  


/**
 * -  get/api/accounts/system/all
 * -  get all accounts in the system
 * -  protected route for system user only
 */
router.get(  "/system/all",  authMiddleware.authSystemUserMiddleware,  accountController.getAllAccounts);






/**
 * -  Why is authSystemUserMiddleware here
 * -  Because this route is only accessible to the system user
 * It prevents a normal user from calling this API.
 */
 


module.exports = router;  