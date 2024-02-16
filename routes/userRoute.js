const { emailSendByUser } = require("../controller/userController")

const router = require("express").Router()


router
    .post("/contact", emailSendByUser)


module.exports = router