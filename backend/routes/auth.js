const express = require('express')
const router = express.Router()

const {upload} = require('../utils/multer')
const { register, login } = require('../controllers/auth')

router.post('/register', upload.single('picture'), register)
router.post('/login', login)

module.exports = router