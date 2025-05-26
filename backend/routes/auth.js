
const router = require('express').Router()
const {signIntoUser} = require('../controllers/auth')

router.post('/sign-in', signIntoUser)




module.exports = router
