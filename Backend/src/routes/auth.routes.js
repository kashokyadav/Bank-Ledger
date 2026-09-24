const express = require("express");
const authController = require("../controllers/auth.controller");
const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


// post/api/auth/register 
router.post("/register" , authController.userRegisterController); 


// post/api/auth/login
router.post("/login" , authController.userLoginController);


/**
 * - POST /api/auth/logout
 */
router.post("/logout", authController.userLogoutController)



//  System User Only Routes
/**
 * - get /auth/system/allusers
 * - get all users of the system
 * - protected route for system user only   
 */
router.get( "/system/allusers",authMiddleware.authSystemUserMiddleware,accountController.getAllUsers
);
 

// GET /api/auth/me
// Get currently logged-in user
router.get("/me",authMiddleware.authMiddleware,authController.getCurrentUserController)

module.exports = router;
