const asyncHandler = require("express-async-handler")
const validator = require("validator")
const Admin = require("../modals/Admin")
const upload = require("../utils/upload")


exports.getAllProject = asyncHandler(async (req, res) => {

    const result = await Admin.find()

    res.json({ message: "Project Fetch Success", result })
})



exports.addProject = asyncHandler(async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ message: err.message || "Unable to upload" })
        }

        await Admin.create({ ...req.body, hero: req.file.filename })

        res.status(201).json({ message: "Project Add Successfully" })

    })

    res.status(201).json({ message: "Project Add Success" })
})