const User = require('../models/user');

const catchAsyncErrors = require("./catchAsynchErrors")
const ErrorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")

//checks if user is auhorized or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies
   if(!token){
       return next(new ErrorHandler('Please login to get access.', 401))
   }
const decoded =  jwt.verify(token, process.env.JWT_SECRET)
req.user = await User.findById(decoded.id);

next()
})
//Handling users roles

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
       if(roles.includes(req.user.role)){
           return next (new ErrorHandler(`Role (${req.user.role}) is not authorized to access this portion `, 403))
         }
     next()
    }
   }
