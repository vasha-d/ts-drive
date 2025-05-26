const {PrismaClient} = require('../generated/prisma')
const cloudinary = require('cloudinary').v2
const prisma = new PrismaClient()

function getExtension(name) {
    let split = name.split('.')

    return split[split.length-1]
}

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
async function newFile(file, parentId, ownerId) {
    let name = file.originalname
    let extension = getExtension(name)
    let cldUpload = await uploadToCloudinary(file)
    let link = cldUpload.secure_url
    let size = cldUpload.bytes
    console.log(cldUpload)
    
    let newFile = await prisma.file.create({
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
            name: name,
            link: link,
            size: size,
            extension: extension
        }
    })
}
async function getFolder(folderId) {   

    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId
        }
    })

    return folder
}
async function getFile(fileId) {
    const file = await prisma.file.findUnique({
        where: {
            id: fileId
        },
    })
    return file
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
async function renameFile(fileId, newName) {
    const file = await prisma.folder.update({
        where: {
            id: fileId
        },
        data: {
            name: newName
        }
    })
}
async function shareFolder(folderId, userToShareWith) {
    const folder = await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            sharedWithUsers: {
                connect: {
                    name: userToShareWith
                }
            }
        }
    })
    return folder
}
async function shareFile(fileId, userToShareWith) {
    const file = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            sharedWithUsers: {
                connect: {
                    name: userToShareWith
                }
            }
        }
    })
    return file
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
async function moveFile(fileId, newParentId) {
    const file = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            parentFolder: {
                connect: {
                    id: newParentId
                }
            }
        }
    })
    return file
}
async function uploadToCloudinary(file) {
    const publicId = `${Date.now()}-${file.originalname}`;
    return new Promise(async (resolve, reject) => {
        let uploadStream = cloudinary.uploader.upload_stream(
        {
            resource_type: 'auto',
            public_id: publicId
        },
        (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            }
        )
        uploadStream.end(file.buffer)
    })
}
module.exports = {
    newFolder,
    newFile,
    getFolder,
    getFile,
    renameFolder,
    renameFile,
    shareFolder,
    shareFile,
    moveFolder,
    moveFile
}