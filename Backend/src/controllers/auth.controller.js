const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const emailService= require("../service/email.service");
const tokenBlackListModel = require("../models/blackList.model")




// user registration controller  ->    post/api/auth/register
async function userRegisterController(req, res) {

    const { email, name, password } = req.body; // Get the email, name, and password from the request body

    const isExists = await userModel.findOne({ 
         email: email  
    }); 

    if (isExists) {
        return res.status(400).json({
            message: "Email already exists",
            success: false
        })
    }


    const user = await userModel.create({ //  it creats user in users collection
        email ,
        name ,
        password
    });



    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    // Create a JWT token using jwt.sign() 
    // { id: user._id }  -> Store the user's MongoDB ID inside the JWT payload -
    //  using the user's ID later to know which user is making a request.
    // Use the secret key from the .env file to sign the token -
    // -The secret is used by the server to sign and later verify the JWT.
    // Set the token to expire after 1 day


    res.cookie("token", token) 
    
    await emailService.sendRegistrationEmail(user.email, user.name);

    return res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name , 
            createdAt: user.createdAt
        }, token,
        message: "User registered successfully",
        success: true
    })
    


}

// user login controller  ->    post/api/auth/login
async function userLoginController(req, res){

    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = await userModel.findOne({ email }).select("+password"); // userModel represents Users collection

    if(!user){
        return res.status(401).json({
            message: "Email is Not Valid",
        })
    }


    // comparePassword is a method defined in user.model.js
    //  to compare the provided password with the hashed password stored in the database
    const isValidPassword = await user.comparePassword(password);  

    if(!isValidPassword){
        return res.status(401).json({
            message: "Email is Not Valid",
        })      
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.cookie("token", token) 

    return res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name , 
            createdAt: user.createdAt

        }, token,
        message: "User logged in successfully",
        success: true
    })


}

// logout controller  ->    post/api/auth/logout
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}


// get current logged-in user -> GET /api/auth/me
async function getCurrentUserController(req, res) {

    return res.status(200).json({
        user: {
            _id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            createdAt: req.user.createdAt
        },
        success: true
    })

}

module.exports = {
    userRegisterController , userLoginController , userLogoutController , getCurrentUserController
}


