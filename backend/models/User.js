const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')  //for hashing
const jwt  = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please provide your first name'],
        maxlength: 50,
        minlength: 2
    },
    lastName: {
        type: String,
        required: [true, 'please provide your last name'],
        maxlength: 50,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, 'please provide an email'], 
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8
    },
    image: {
        type: String,
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
},
    { timestamps: true }
)

//hashing the password using mongoose middleware
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//creating the token using mongoose instance mathods
UserSchema.methods.createJWT = function(){
    return jwt.sign({name: this.firstName, userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

//comparing passwords 
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports = mongoose.model('User', UserSchema)