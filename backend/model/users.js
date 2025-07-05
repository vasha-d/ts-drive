const {PrismaClient, Prisma} = require('../generated/prisma')

const prisma = new PrismaClient()


async function createUser(username, password) {

    try {
        
        const newUser = await prisma.user.create({
            data: {
                username: username, 
                password: password,
                Folders: {
                    create: {
                        name: 'drive',
                        drive: true,
                        }
                },
                sharedFolder: {
                    create: {
                        
                    }
                },
                starredFolder: {create: {
                    childrenFolders: {},
                    files: {}
                }}
            }
        })
        return newUser
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code == 'P2002') {
                let msg = {error: 'Username not available'}
                return msg
            } else {
                return {error}
            } 
        }
    }

}

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user
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
async function updateUserTotalStorage(userId, amount) {
    
    let user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    let newSize = user.totalStored + amount

    let update = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            totalStored: newSize
        }
    })
    
}
module.exports = {
    createUser,
    getUserById,
    getUserByName,
    updateUserTotalStorage
}