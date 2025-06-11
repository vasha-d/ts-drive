const foldersModel = require('../model/folders')

async function postFolder(req, res) {
    

    let name = req.body.folderName
    let parentId = parseInt(req.body.parentId)
    let ownerId = req.user.id
    const newFolder = await foldersModel.newFolder(
        name, parentId, ownerId
    )
    console.log(newFolder)
    res.json(newFolder)
}
async function getFolder(req, res) {   
    let folderId = parseInt(req.params.id)
    
    let folder = await foldersModel.getFolder(folderId)
    console.log(folder)
    res.json(folder)
}
async function folderPatchOrganizer(req, res) {
    let funcToUse = () => console.error('Invalid put request')
    if (req.body.usernameToShareWith) { 
        funcToUse = shareFolder
    } 
    else if (req.body.newParentId) {
        funcToUse = moveFolder
    }
    else if (req.body.newName) {
        funcToUse = renameFolder
    } else if (req.body.star) {
        funcToUse = setFolderStar
    }

    return funcToUse(req, res)
}

async function renameFolder(req, res) {

    let folderId = parseInt(req.params.id)
    let newName = req.body.newName
    let folder = await foldersModel.renameFolder(folderId, newName)

    res.json(folder)
}
async function shareFolder(req, res) {
    let folderId = parseInt(req.params.id)
    let userToShareWithName = req.body.usernameToShareWith
    let folder = await foldersModel.shareFolder(folderId, userToShareWithName)

    res.json(folder)
}
async function moveFolder(req, res) {
    let folderId = parseInt(req.params.id)
    let newParentId = parseInt(req.body.newParentId)
    let folder = await foldersModel.moveFolder(folderId, newParentId)

    res.json(folder)
}

async function deleteFolder(req, res) {
    let folderId = parseInt(req.params.id)
    let del = await foldersModel.deleteFolder(folderId)
    res.json(del)
}

async function getDrive(req, res) {
    let userId = req.user.id

    let drive =  await foldersModel.getDrive(userId)

    res.json(drive)
}

async function setFolderStar(req, res) {

    let folderId = parseInt(req.params.id)
    let star = await foldersModel.setFolderStar(folderId)
    res.json(star)
}

module.exports = {
    postFolder,
    getFolder,
    folderPatchOrganizer,
    deleteFolder,
    getDrive
}