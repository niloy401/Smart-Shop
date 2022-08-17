const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
 name:{
        type: String,
        required: [true, 'Please enter a name'],
        maxlength: [40, 'Name cannot exceed 40 characters'],
 },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate:[validator.isEmail, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        role:{
            type: String,
            default: 'user'
        },
        createdAt:{
            type: Date,
            default: Date.now
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date

        
    }

})

// Encypytion of password 

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
    next()
    }

    this.password = await bcrypt.hash(this.password, 10);
})
// Comparing user password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return JWT token
userSchema.methods.getJwtToken = function(){

    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// Generates password reset token
userSchema.methods.getResetPasswordToken = function(){
 //Generates token
const resetToken = crypto.randomBytes(20).toString('hex');

// Hashes token and set a reset password 
this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

// Setting token expiration time
this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
return resetToken;

}
 


module.exports = mongoose.model('User', userSchema);