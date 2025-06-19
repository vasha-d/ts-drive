
const router = require('express').Router()
const {signIntoUser, authorizeMiddleware, getSelfUser,signOutOfUser} = require('../controllers/auth')

router.post('/sign-in', signIntoUser)
router.post('/sign-out', authorizeMiddleware, signOutOfUser)
router.get('/me', authorizeMiddleware,  getSelfUser)


module.exports = router
