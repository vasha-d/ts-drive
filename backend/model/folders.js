const {PrismaClient} = require('../generated/prisma')
const prisma = new PrismaClient()


const {include} = {
    include: {
        parentFolder: {
            include: {
                childrenFolders: true,
                files: true
            }
        },
        childrenFolders: {
            include: {
                parentFolder: {
                    include: {
                        childrenFolders: true,
                        files: true,
                    },
                },
                childrenFolders: true,
                files: true
            }
        },
        files: {
            include: {
                parentFolder: {
                    include: {
                        childrenFolders: true
                    }
                }
            },
        },
        parentFolder: true
    }
}
const {includeSharedStarred} = {
    includeSharedStarred: {
        childrenFolders: {
            include: {
                parentFolder: {
                    include: {
                        childrenFolders: true,
                        files: true,
                    },
                },
                childrenFolders: true,
                files: {
                    include: {
                        parentFolder: {
                            include: {
                                childrenFolders: true
                            }
                        }
                    }
                }
            }
        },
        files: {
            include: {
                parentFolder: {
                    include: {
                        childrenFolders: true
                    }
                }
            },
        },
        owner: true
    }
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
            name: name,
        }
    })
    return newFolder
}
async function getFolder(folderId) {   
    const folder = await prisma.folder.update({
        where: {
            id: folderId,
        },
        data: {
            lastAccessed: new Date()
        },
        include: include
    })

    return folder
}
async function renameFolder(folderId, newName) {
    const folder = await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            name: newName,
            lastModified: new Date()
        }
    })
    return folder
}
async function shareFolder(folderId, userToShareWith) {

    const sharingWith = await prisma.user.findFirst({
        where: {
            username: userToShareWith
        },
      
    })
    const sharingWithId = sharingWith.sharedFolderId
    console.log(sharingWith);
    const folder = await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            sharedFolders: {
                connect: {
                    id: sharingWithId
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
            },
            lastModified: new Date()
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

async function setFolderStar(folderId, userId) {

    let current = await prisma.folder.findUnique({
        where: {
            id: folderId
        }
    })
    if (current.starred) {
        let updateFolderStarred = await prisma.folder.update({
            where: {id: folderId},
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
        console.log(userId, user);
        let parentStarFolderId = user.starredFolderId
        let updateFolderStarred = await prisma.folder.update({
            where: {id: folderId},
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
async function getDrive(userId) {

    let drive = await prisma.folder.findFirst({
        where: {
            ownerId: userId,
            drive: true
        },
        include: include
    })
    return drive
}
async function getStarred(userId) {

    let user = await prisma.user.findUnique({
        where: {id: userId},
        include: {
            starredFolder: true
        }
    })
    console.log('this,', user);
    let starredFolderId = user.starredFolderId

    let starredFolder = await prisma.starredFolder.findUnique({
        where: {id: starredFolderId},
        include: includeSharedStarred
    })
    let toReturn = {...starredFolder, isStarredFolder: true}
    console.log(toReturn);
    return toReturn
}
async function getShared(userId) {
    console.log('running get shared!');
    let user = await prisma.user.findUnique({
        where: {id: userId},
     
    })
    let sharedFolderId = user.sharedFolderId
    let sharedFolder = await prisma.sharedFolder.findUnique({
        where: {id: sharedFolderId},
        include: includeSharedStarred

    })
    console.log(includeSharedStarred);
    let toReturn = {...sharedFolder, isSharedFolder: true}
    console.log(toReturn);
    return toReturn
}
module.exports = {
    newFolder,
    getFolder,
    renameFolder,
    shareFolder,
    moveFolder,
    deleteFolder,
    getDrive,
    setFolderStar,
    getStarred,
    getShared
}