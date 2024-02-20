const multer = require("multer")
const { v4 } = require("uuid")
const path = require("path")



const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fileName = v4() + path.extname(file.originalname)
        cb(null, fileName)
    },
    destination: (req, file, cb) => {
        cb(null, "project")
    }
})



module.exports = multer({ storage: storage }).single("hero")