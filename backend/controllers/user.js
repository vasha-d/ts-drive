

async function postNewUser(req, res) {
    const {username, password} = req.body

    const newUser = await createUser(username, password)

    res.json(newUser)
}


module.exports = {
    postNewUser
}