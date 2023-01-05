const User = require('../models/User')

const register = async (req, res) => {
     //creating the user. before the model saves the user, it hashes the passes first in the User schema.
    const user = await User.create({...req.body})

    res.status(200).json({user})
}

const login = async (req, res) => {
    res.send('login')
}

module.exports = {register, login}