const {PrismaClient} = require('../generated/prisma')
const cloudinary = require('cloudinary').v2
const {updateUserTotalStorage} = require('./users')
const prisma = new PrismaClient()

function getExtension(name) {
    let split = name.split('.')

    return '.'+split[split.length-1]
}
function stripExtension(name, extension) {
    let lastIndex = name.lastIndexOf(extension)
    console.log(lastIndex);
    return name.substring(0, lastIndex)
}
async function newFile(file, parentId, ownerId) {
    let name = file.originalname
    let extension = getExtension(name)
    let withOutExtension = stripExtension(name, extension)
    let cldUpload = await uploadToCloudinary(file)
    let size = cldUpload.result.bytes
    let rsrcType = cldUpload.result.resource_type
    let public_id = cldUpload.result.public_id
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
            name: withOutExtension,
            size: size,
            extension: extension,
            resourceType: rsrcType,
            publicId: public_id

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
async function downloadFile(fileId) {
    let file = await prisma.file.findUnique({
        where: {
            id: fileId
        }

    })
    let dlName = file.name + file.extension
    let link = getDownloadLink(dlName, file.publicId, file.resourceType)
    return link
}
async function renameFile(fileId, newName) {
    console.log('running in model');
    const file = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            name: newName,
            lastModified: new Date()
        }
    })
    return file
}

async function shareFile(fileId, userToShareWith) {
    const sharingWith = await prisma.user.findFirst({
        where: {
            username: userToShareWith
        },
      
    })
    const sharingWithId = sharingWith.sharedFolderId
    console.log(sharingWith);
    const file = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            sharedFolders: {
                connect: {
                    id: sharingWithId
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
            },
            lastModified: new Date()
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
         
                resolve({
                    result
                });
            }
        )
        uploadStream.end(file.buffer)
    })
}
async function getDownloadLink(fileName, public_id, resourceType) {


    const downloadUrl = cloudinary.url(public_id, {
        resource_type: resourceType,
        flags: 'attachment',
        attachment: fileName
    });
    return downloadUrl
    
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
    if (current.starred) {
        let updateFileStarred = await prisma.file.update({
            where: {id: fileId},
            data: {
                starred: false,
                starredParentFolder: {
                    disconnect: true
                },
            }
        })
    } else {
        let user = await prisma.user.findUnique({
            where: {id: userId}
        })
        let parentStarFolderId = user.starredFolderId
        let updateFileStarred = await prisma.file.update({
            where: {id: fileId},
            data: {
                starred: true,
                starredParentFolder: {
                    connect: {
                        id: parentStarFolderId
                    }
                }
            }
        })
    }
    return    
}
async function setJustAccesed(fileId) {

    let file = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            lastAccessed: new Date()
        }
    })
    
}
module.exports = {
    newFile,
    getFile,
    renameFile,
    shareFile,
    moveFile,
    deleteFile,
    setFileStar,
    setJustAccesed,
    downloadFile
}