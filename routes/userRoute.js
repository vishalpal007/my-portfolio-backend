const { emailSendByUser, getAllUser } = require("../controller/userController")

const router = require("express").Router()


router
    .post("/contact", emailSendByUser)
    .get("/user-contact", getAllUser)


module.exports = router