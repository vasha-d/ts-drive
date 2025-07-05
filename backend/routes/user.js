const router = require('express').Router()

const {postNewUser} = require('../controllers/users')


router.post('/', postNewUser)

module.exports = router 