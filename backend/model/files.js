const {PrismaClient} = require('../generated/prisma')
const cloudinary = require('cloudinary').v2
const {updateUserTotalStorage} = require('./users')
const prisma = new PrismaClient()

function getExtension(name) {
    let split = name.split('.')

    return split[split.length-1]
}
async function newFile(file, parentId, ownerId) {
    let name = file.originalname
    let extension = getExtension(name)
    let cldUpload = await uploadToCloudinary(file)
    let link = cldUpload.secure_url
    let size = cldUpload.bytes
    console.log('cld:', cldUpload)
    
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
            extension: extension,
        }
    })
    let updateUser = await updateUserTotalStorage(ownerId, size)
    console.log('file:', newFile);
    return newFile
}

async function getFile(fileId) {
    const file = await prisma.file.findUnique({
        where: {
            id: fileId
        },
        include: {
            parentFolder: true,
            sharedWithUsers: true
        }
    })
    return file
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
async function deleteFile(fileId) {
    let del = await prisma.file.delete({
        where: {
            id: fileId
        }
    })
    let amount = del.size * (-1)
    let ownerId = del.ownerId
    updateUserTotalStorage(ownerId, amount)
    return del
}
async function setFileStar(fileId) {

    let current = await prisma.file.findUnique({
        where: {
            id: fileId
        }
    })
    let newStar = !current.starred
    let update = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            starred: newStar
        }
    })
    return update   
}
module.exports = {
    newFile,
    getFile,
    renameFile,
    shareFile,
    moveFile,
    deleteFile,
    setFileStar
}