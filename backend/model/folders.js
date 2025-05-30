const {PrismaClient} = require('../generated/prisma')
const prisma = new PrismaClient()

async function newFolder(name, parentId, ownerId) {
    let newFolder = await prisma.folder.create({
        data: {
            owner: {
                connect: {
                    id: ownerId
                }
            },
            parentFolder: {
                connect: {
                    id: parentId
                }
            },
            name: name
        }
    })
    return newFolder
}
async function getFolder(folderId) {   

    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId
        },
        include: {
            parentFolder: true,
            childrenFolders: true,
            files: true
        }
    })

    return folder
}
async function renameFolder(folderId, newName) {
    const folder = await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            name: newName
        }
    })
    return folder
}
async function shareFolder(folderId, userToShareWith) {
    const folder = await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            sharedWithUsers: {
                connect: {
                    username: userToShareWith
                }
            }
        }
    })
    return folder
}
async function moveFolder(folderId, newParentId) {
    const folder = await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            parentFolder: {
                connect: {
                    id: newParentId
                }
            }
        }
    })
    return folder
}
async function deleteFolder(folderId) {
    
    let del = await prisma.folder.delete({

        where: {
            id: folderId,
            drive: false
        }
    })
    return del
}
async function getDrive(userId) {

    let drive = await prisma.folder.findFirst({
        where: {
            ownerId: userId,
            drive: true
        },
        include: {
            childrenFolders: true,
            files: true
        }   
    })
    console.log(drive)
    return drive
}
module.exports = {
    newFolder,
    getFolder,
    renameFolder,
    shareFolder,
    moveFolder,
    deleteFolder,
    getDrive
}