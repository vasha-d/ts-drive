const filesModel = require('../model/files')
async function  postFile(req, res) {
    let file = req.file
    let parentId = parseInt(req.body.parentId)
    let ownerId = req.user.id
    console.log('Running post file in controller');
    const newFile = await filesModel.newFile(
        file, parentId, ownerId
    )
    console.log('new File in controller', newFile);
    res.json(newFile)
}
async function filePatchOrganizer(req, res) {
    let funcToUse = () => console.error('Invalid put request')
    console.log(req.body);
    if (req.body.usernameToShareWith) {
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
    let usernameToShareWith = req.body.usernameToShareWith
    let file = await filesModel.shareFile(fileId, usernameToShareWith)

    res.json(file)
}
async function moveFile(req, res) {
    let fileId = parseInt(req.params.id)
    let newParentId = parseInt(req.body.newParentId)
    console.log(fileId, newParentId);
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

    let star = await filesModel.setFileStar(fileId, req.user.id)
    
    res.json(star)
}
async function setJustAccesssed(req, res) {
    let fileId = parseInt(req.params.id) 

    let setAccessed = await filesModel.setJustAccesed(fileId)

    res.status(400)
}
async function downloadFile(req, res) {
    console.log('running download route', req.params.id);
    let fileId = parseInt(req.params.id)
  
        
    let link = await filesModel.downloadFile(fileId)
    
    res.json(link)
    
}
module.exports = {
    postFile,
    getFile,
    filePatchOrganizer,
    deleteFile,
    downloadFile
}