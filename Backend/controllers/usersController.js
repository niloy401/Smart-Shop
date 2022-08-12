const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsynchErrors');
const sendToken = require('../utils/jwtToken');

//Registering a user or customer => api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const{name, email, password} = req.body;

    const user = await User.create({
    name,
    email,
    password,
    avatar:{
        public_id: 'Avatars/39c706fdb9f87f1ac86185aca6892cf3_pdmu7r',
        url: 'https://res.cloudinary.com/geralt500/image/upload/v1660040588/Avatars/39c706fdb9f87f1ac86185aca6892cf3_pdmu7r.jpg'
    }

    })
 sendToken(user, 200, res);
   })

//Login a User  => api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
 const {email, password} = req.body;

 //checking if the user has entered the email and password
if(!email || !password){
    return next(new ErrorHandler('Please provide email and password', 400))
}

//Find user in DB
const user = await User.findOne({email}).select('+password');

if(!user){
    return next(new ErrorHandler('Invalid Email or password', 401))
}

//Checks for correct password
const isPasswordMatched = await user.comparePassword(password);

if(!isPasswordMatched){
    return next(new ErrorHandler('Invalid Email or password', 401))
 }
 sendToken(user, 200, res);
})

//Logout  User  => api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logout Successful'
        
    })
})