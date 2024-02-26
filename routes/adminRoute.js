const { getAllProject, addProject, deleteProject, updateProject } = require("../controller/adminController")

const router = require("express").Router()

router
    .get("/project", getAllProject)
    .post("/add-project", addProject)
    .delete("/delete-project/:id", deleteProject)
    .put("/update-project/:id", updateProject)


module.exports = router