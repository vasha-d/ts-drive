
const router = require('express').Router()
const foldersControllers = require('../controllers/folders')
const filesControllers = require('../controllers/files')
const {authorizeMiddleware} = require('../controllers/auth')
router.use(authorizeMiddleware)
const multer = require('multer')
let memoryStorage = multer.memoryStorage
const upload = multer({
    storage: memoryStorage()
})
router.post('/folders', foldersControllers.postFolder)
router.route('/folders/:id')
    .get(foldersControllers.getFolder)
    .patch(foldersControllers.folderPatchOrganizer)
    .delete(foldersControllers.deleteFolder)
router.post('/files', upload.single('fileUpload'), filesControllers.postFile)
router.route('/files/:id')
    .get(filesControllers.getFile)
    .patch(filesControllers.filePatchOrganizer)
    .delete(filesControllers.deleteFile)



module.exports = router
