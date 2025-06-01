const usersModel = require('../model/users')

async function postNewUser(req, res) {
    const {username, password} = req.body

    const newUser = await usersModel.createUser(username, password)

    res.json(newUser)
}

module.exports = {
    postNewUser
}