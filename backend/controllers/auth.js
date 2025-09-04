const jwt = require("jsonwebtoken")
const { createUser, getUserById, getUserByName } = require("../model/users")

async function signIntoUser(req, res) {
    const {username, password} = req.body
    const user = await getUserByName(username)
    const foundUser = !!user.password
    if (!foundUser) {
        res.status(404).json({
            error: 'Username not found'
        })
        return
    }
    if (password != user.password) {
        res.sendStatus(401)
        return
    }
    const token = jwt.sign(
        {
            user: {
                id: user.id,
                username: user.username
            }
        }, 
        process.env.JWT_SECRET, 
        {
        expiresIn: '1d'
        }
    )
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
    })
    res.json(user)
}
async function signOutOfUser(req, res) {
    res.clearCookie('token',{
        sameSite: 'none',
        secure: 'true',
        path: '/'

    })
    res.sendStatus(200)
    
}
async function authorizeMiddleware(req, res, next) {
    const token = req.cookies.token

    let verify;
    if (!token) {
        res.sendStatus(401)
        return
    }
    try {
        verify= jwt.verify(token,  process.env.JWT_SECRET)
    } catch (error) {
        res.sendStatus(401)

        return
    }
    req.user = verify.user
    next()
}
async function getSelfUser(req, res) {
    let user = await getUserById(req.user.id)
    res.json(user)
}

module.exports = {
    signIntoUser,
    authorizeMiddleware,
    getSelfUser,
    signOutOfUser
}