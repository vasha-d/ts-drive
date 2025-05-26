const router = require('express').Router()

const {postNewUser} = require('../controllers/user')


router.post('/', postNewUser)


module.exports = router