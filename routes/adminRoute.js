const { getAllProject, addProject } = require("../controller/adminController")

const router = require("express").Router()

router
    .get("/project", getAllProject)
    .post("/add-project", addProject)


module.exports = router