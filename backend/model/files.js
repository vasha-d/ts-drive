const {PrismaClient} = require('../generated/prisma')
const cloudinary = require('cloudinary').v2
const {updateUserTotalStorage} = require('./users')
const prisma = new PrismaClient()
function dlSafeName(name, extension) {
    const unsafeChars = /[ .~()\[\]{}'"\\\/:;?&=+#%|,@^`]/g;

    // Replace all matches with --
    return name.replace(unsafeChars, '--')+extension;
 
}
function getExtension(name) {
    let split = name.split('.')

    return '.'+split[split.length-1]
}

function stripExtension(name, extension) {
    let lastIndex = name.lastIndexOf(extension)
    return name.substring(0, lastIndex)
}
function shortenName(name) {
    
    let ext = getExtension(name)
    let noExt = stripExtension(name, ext)
    console.log('length ', noExt)
    console.log('running shorten name')
    if (noExt.length < 60) return name
    noExt = noExt.substr(0, 60)
    return (noExt+ext)
}   
async function newFile(file, parentId, ownerId) {
    let name = shortenName(file.originalname)
    file.originalname = name
    let extension = getExtension(name)
    let withOutExtension = stripExtension(name, extension)
    console.log(file)
    let cldUpload = await uploadToCloudinary(file, withOutExtension, extension)
    console.log('cld:', cldUpload)
    let size = cldUpload.result.bytes
    let rsrcType = cldUpload.result.resource_type
    let public_id = cldUpload.result.public_id
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
    let dlName = dlSafeName(file.name, '')
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
async function uploadToCloudinary(file, withOutExtension, extension) {
    let newName = dlSafeName(withOutExtension, extension)
    const publicId = `${Date.now()}-${newName}`;
    console.log('uploading cld');
    return new Promise(async (resolve, reject) => {
        try {

                let uploadStream = cloudinary.uploader.upload_stream(
                    {
                resource_type: 'raw',
                public_id: publicId
            },
            (err, result) => {
                if (err) {
                    console.log('errored2', err);
                        reject(err)
                        return
                    }

                    console.log('resolved', result);
                    resolve({
                        result
                    });
                }
            )
            
            uploadStream.end(file.buffer)
        } catch (error) {
            console.log('errored', error);
        }
    })
}
async function getDownloadLink(fileName, public_id, resourceType) {

    console.log('log wituin func', fileName);
    const downloadUrl = cloudinary.url(public_id, {
        resource_type: 'raw',
        flags: "attachment:"+fileName,  
        sign_url: true,
        type: "upload",
    });
    console.log(downloadUrl)
    return downloadUrl
    
}
async function deleteCldFile(publicId) {
        
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'raw', 
        });
        return 'success'
    } catch (error) {
        console.error('Error deleting:', error);
    }
}

async function deleteFile(fileId) {
    let del = await prisma.file.delete({
        where: {
            id: fileId
        }
    })
    let publicId = del.publicId
    let delCld = await deleteCldFile(publicId)
    if (delCld !== 'success') return undefined
    let amount = del.size * (-1)
    let ownerId = del.ownerId
    updateUserTotalStorage(ownerId, amount)
    return del
}
async function setFileStar(fileId, userId) {

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