const driveModel = require('../model/drive')

async function postFolder(req, res) {
    let name = req.body.folderName
    let parentId = parseInt(req.body.parentId)
    let ownerId = req.user.id
    const newFolder = await driveModel.newFolder(
        name, parentId, ownerId
    )
    console.log(newFolder)
    res.json(newFolder)
}
async function postFile(req, res) {
    let file = req.file
    let parentId = parseInt(req.body.parentId)
    let ownerId = req.user.id
    console.log(file, parentId)
    const newFile = await driveModel.newFile(
        file, parentId, ownerId
    )
    res.json(newFile)
}
async function getFolder(req, res) {   
    let folderId = parseInt(req.params.id)
    
    let folder = await driveModel.getFolder(folderId)
    console.log(folder)
    res.json(folder)
}
async function getFile(fileId) {
    let fileId = parseInt(req.params.id)

    let file = await driveModel.getFile(fileId)
    console.log(folder)
    
    res.json(file)
}


async function folderPatchOrganizer(req, res) {
    let funcToUse = () => console.error('Invalid put request')
    if (req.body.username) {
        funcToUse = shareFolder
    } 
    else if (req.body.newParentId) {
        funcToUse = moveFolder
    }
    else if (req.body.newName) {
        funcToUse = renameFolder
    }

    return funcToUse(req, res)
}
async function filePatchOrganizer(req, res) {
    let funcToUse = () => console.error('Invalid put request')
    if (req.body.username) {
        funcToUse = shareFile
    } 
    else if (req.body.newParentId) {
        funcToUse = moveFile
    }
    else if (req.body.newName) {
        funcToUse = renameFile
    }

    return funcToUse(req, res)
}

async function renameFolder(req, res) {

    let folderId = parseInt(req.params.id)
    let newName = req.body.newName
    let folder = await driveModel.renameFolder(folderId, newName)

    res.json(folder)
}
async function renameFile(req, res) {
    let fileId = parseInt(req.params.id)
    let newName = req.body.newName
    let file = await driveModel.renameFolder(fileId, newName)

    res.json(file)
    
}




async function shareFolder(req, res) {
    let folderId = parseInt(req.params.id)
    let userToShareWithName = req.body.username
    let folder = await driveModel.shareFolder(folderId, userToShareWithName)

    res.json(folder)
}
async function shareFile(req, res) {
    let fileId = parseInt(req.params.id)
    let userToShareWithName = req.body.username
    let file = await driveModel.shareFile(fileId, userToShareWithName)

    res.json(file)
}
async function moveFolder(req, res) {
    let folderId = parseInt(req.params.id)
    let newParentId = parseInt(req.body.newParentId)
    let folder = await driveModel.moveFolder(folderId, newParentId)

    res.json(folder)
}
async function moveFile(req, res) {
    let fileId = parseInt(req.params.id)
    let newParentId = parseInt(req.body.newParentId)
    let file = await driveModel.moveFile(fileId, newParentId)

    res.json(file)
}
module.exports = {
    postFolder,
    postFile,
    getFolder,
    getFile,
    folderPatchOrganizer,
    filePatchOrganizer
}