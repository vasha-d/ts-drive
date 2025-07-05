const usersModel = require('../model/users')

async function postNewUser(req, res) {
    const {username, password} = req.body

    const newUser = await usersModel.createUser(username, password)
    console.log(newUser);
    if (newUser.error) {
        res.status(400).json(newUser)
        return
    }
    res.json(newUser)
}

module.exports = {
    postNewUser
}