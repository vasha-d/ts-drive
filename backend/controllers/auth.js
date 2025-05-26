const jwt = require("jsonwebtoken")
const { getUser, createUser, getUserById, getUserByName } = require("../model/users")

async function signIntoUser(req, res) {
    const {username, password} = req.body
    const user = await getUserByName(username)
    const foundUser = !!user.password
    if (!foundUser) {
        res.sendStatus(404)
        return
    }
    if (password != user.password) {
        res.sendStatus(401)
    }
    const token = jwt.sign(
        {
            user: {
                id: user.id,
                username: user.username
            }
        }, 
        'secret', 
        {
        expiresIn: '1d'
        }
    )
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.json(user)
}
async function authorizeMiddleware(req, res, next) {
    const token = req.cookies.token
    let verify;
    console.log('running')
    if (!token) {
        console.log('ending')
        res.sendStatus(401)
        return
    }
    try {
        verify= jwt.verify(token, 'secret')
    } catch (error) {
        res.sendStatus(401)
        return
    }
    req.user = verify.user
    next()
}
module.exports = {
    signIntoUser,
    authorizeMiddleware
}