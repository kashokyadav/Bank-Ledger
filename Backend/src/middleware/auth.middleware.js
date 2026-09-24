const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blackList.model")


// Middleware to authenticate and authorize normal users based on JWT tokens
async function authMiddleware(req, res, next) {

    // 1. Check if the token is present in the request headers or cookies
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]
    // headers contains additional information sent with the request.
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    // 2. Check if the token is blacklisted
    const isBlacklisted = await tokenBlackListModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    // 3. Verify the token
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4. find the user in the database using the decoded token's id and attach it to the request object
        const user = await userModel.findById(decoded.id)

        // 5. Attach the user object to the request object for further use in the route handlers
        req.user = user
        // 6. Call the next middleware or route handler
        return next()

    // 7. If the token is invalid or expired, return an unauthorized error response
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
}


// Middleware to authenticate and authorize system users based on JWT tokens
async function authSystemUserMiddleware(req, res, next) {

    // 1. Check if the token is present in the request headers or cookies
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }
    console.log("Token is there");
    

    // 2. Check if the token is blacklisted
    const isBlacklisted = await tokenBlackListModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }


    // 3. Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4. find the user in the database using the decoded token's id and attach it to the request object
        const user = await userModel.findById(decoded.id).select("+systemUser")
        if(!user){
            return res.status(401).json({
                message : "User is Undefined"
            })
        }

        // 5. Check if the user is a system user
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }
        // 6. Attach the user object to the request object for further use in the route handlers
        req.user = user

        // 7. Call the next middleware or route handler
        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
    

}



module.exports = {
    authMiddleware, authSystemUserMiddleware
    
}