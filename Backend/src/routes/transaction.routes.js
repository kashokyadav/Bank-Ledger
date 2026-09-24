const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const transactionController = require("../controllers/transaction.controller")

const transactionRoutes = Router();



// Normal User Routes
/**
 * - POST /api/transactions/
 * - Create a new transaction
 */

transactionRoutes.post("/", 
    authMiddleware.authMiddleware,
     transactionController.createTransaction)

    
    
    /**
     * - POST /api/transactions/request-initial-funds
     * - Request initial funds for a user
     * - Protected route for logged-in users only
    */
transactionRoutes.post(  "/request-initial-funds", 
    authMiddleware.authMiddleware ,  
    transactionController.requestInitialFunds);
    
    
    
    /**
 * - POST /api/transactions/request-funds
 * - Request demo funds for a user
 * - Protected route for logged-in users only
    */    
transactionRoutes.post(
   "/request-funds",
   authMiddleware.authMiddleware,
   transactionController.requestDemoFunds
);    
    
    
    
    /**
     * -Get /api/transactions/my-transactions
     * - Get all transactions of the logged-in user
     * - Protected route for logged-in users only
    */   
transactionRoutes.get(
   "/my-transactions",
   authMiddleware.authMiddleware,
   transactionController.getMyTransactions
);



/**
 * -Get /api/transactions/:transactionId
 * - Get details of a specific transaction of the logged-in user
 * - Protected route for logged-in users only
*/ 
transactionRoutes.get(
    "/:transactionId",
    authMiddleware.authMiddleware,
    transactionController.getTransactionDetails // Get Transaction Details By Id
);



//  ----> System User Only Routes <----

/**
 * - get /api/transactions/system/all
 * - get all transactions in the system
 * - protected route for system user only
 */
transactionRoutes.get("/system/all", 
    authMiddleware.authSystemUserMiddleware,  
    transactionController.getAllTransactions
);


/**
 * - POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from system user
 */ 
transactionRoutes.post("/system/initial-funds", 
    authMiddleware.authSystemUserMiddleware, 
    transactionController.createInitialFundsTransaction)


/**
 * - GET /api/transactions/system/dashboard
 * - Get system dashboard data
 * - Protected route for system user only
 */
transactionRoutes.get(
    "/system/dashboard",
    authMiddleware.authSystemUserMiddleware,
    transactionController.getSystemDashboard
);    


/**
 * - GET /api/transactions/system/:transactionId
 * - Get details of a specific transaction in the system
 * - Protected route for system user only
 */
transactionRoutes.get(
    "/system/:transactionId",
    authMiddleware.authSystemUserMiddleware,
    transactionController.getSystemTransactionDetails
);



module.exports = transactionRoutes;