const jwt = require("jsonwebtoken")
const { getUser, createUser, getUserById, getUserByName } = require("../model/users")

async function signIntoUser(req, res) {
    const {username, password} = req.body
    const user = await getUserByName(username)
    console.log()
    const foundUser = !!user.password
    if (!foundUser) {
        res.status(404).json({
            error: 'Username not found'
        })
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
    console.log(token)
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'Lax'
    })
    res.json(user)
}
async function authorizeMiddleware(req, res, next) {
    const token = req.cookies.token
    let verify;
    if (!token) {
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