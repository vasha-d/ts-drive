
const router = require('express').Router()
const {signIntoUser, authorizeMiddleware, getSelfUser} = require('../controllers/auth')

router.post('/sign-in', signIntoUser)

router.get('/me', authorizeMiddleware,  getSelfUser)


module.exports = router
