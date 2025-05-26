
const router = require('express').Router()
const driveControllers = require('../controllers/drive')
const {authorizeMiddleware} = require('../controllers/auth')
router.use(authorizeMiddleware)
const multer = require('multer')
let memoryStorage = multer.memoryStorage
const upload = multer({
    storage: memoryStorage()
})
router.post('/files', upload.single('fileUpload'), driveControllers.postFile)
router.post('/folders', driveControllers.postFolder)

router.get('/files/:id', driveControllers.getFile)
router.get('/folders/:id', driveControllers.getFolder)

router.patch('/folders/:id', driveControllers.folderPatchOrganizer)
router.patch('/files/:id', driveControllers.filePatchOrganizer)


module.exports = router
