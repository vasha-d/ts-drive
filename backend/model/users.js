const {PrismaClient} = require('../generated/prisma')

const prisma = new PrismaClient()


async function createUser(username, password) {

    const newUser = await prisma.user.create({
        data: {
            username: username, 
            password: password,
            Folders: {
                create: {
                    name: 'drive',
                    drive: true,
                }
            }
        }
    })
    console.log(newUser)
    return newUser
}

async function getUserById(req, res) {
    
}
async function getUserByName(username) {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                username: username
            }
        })      
        return user
    } catch (error) {
        return error 
    }
}
module.exports = {
    createUser,
    getUserById,
    getUserByName
}