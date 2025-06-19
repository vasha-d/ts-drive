const filesModel = require('../model/files')
async function  postFile(req, res) {
    let file = req.file
    let parentId = parseInt(req.body.parentId)
    let ownerId = req.user.id

    const newFile = await filesModel.newFile(
        file, parentId, ownerId
    )
    res.json(newFile)
}
async function filePatchOrganizer(req, res) {
    let funcToUse = () => console.error('Invalid put request')
    console.log(req.body);
    if (req.body.userToShareWithName) {
        funcToUse = shareFile
    } 
    else if (req.body.newParentId) {
        funcToUse = moveFile
    }
    else if (req.body.newName) {
        funcToUse = renameFile
    }
    else if (req.body.star) {
        funcToUse = setFileStar
    } 
    else if (req.body.accessed) {
        funcToUse = setJustAccesssed
    }

    return funcToUse(req, res)
}
async function getFile(req, res) {
    let fileId = parseInt(req.params.id)

    let file = await filesModel.getFile(fileId)
    console.log(folder)
    
    res.json(file)
}


async function renameFile(req, res) {
    let fileId = parseInt(req.params.id)
    let newName = req.body.newName
    let file = await filesModel.renameFile(fileId, newName)
    console.log('renaming');
    console.log(file);

    res.json(file) 
}
async function shareFile(req, res) {
    let fileId = parseInt(req.params.id)
    let userToShareWithName = req.body.userToShareWithName
    let file = await filesModel.shareFile(fileId, userToShareWithName)

    res.json(file)
}
async function moveFile(req, res) {
    let fileId = parseInt(req.params.id)
    let newParentId = parseInt(req.body.newParentId)
    let file = await filesModel.moveFile(fileId, newParentId)

    res.json(file)
}
async function deleteFile(req, res) {
    let fileId = parseInt(req.params.id)
    console.log(fileId)
    let del = await filesModel.deleteFile(fileId)
    res.json(del)
}
async function setFileStar(req, res) {
    let fileId= parseInt(req.params.id)

    let star = await filesModel.setFileStar(fileId)
    
    res.json(star)
}
async function setJustAccesssed(req, res) {
    let fileId = parseInt(req.params.id) 

    let setAccessed = await filesModel.setJustAccesed(fileId)

    res.status(400)
}
module.exports = {
    postFile,
    getFile,
    filePatchOrganizer,
    deleteFile
}