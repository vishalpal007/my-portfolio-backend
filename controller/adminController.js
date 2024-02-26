const asyncHandler = require("express-async-handler")
const validator = require("validator")
const Admin = require("../modals/Admin")
const upload = require("../utils/upload")
const fs = require("fs/promises")
const path = require("path")


exports.getAllProject = asyncHandler(async (req, res) => {

    const result = await Admin.find()

    res.json({ message: "Project Fetch Success", result })
})



exports.addProject = asyncHandler(async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "Unable to upload" });
        }

        if (req.file) {
            await Admin.create({ ...req.body, hero: req.file.filename });
        } else {
            await Admin.create(req.body);
        }

        res.status(201).json({ message: "Project Add Successfully" });
    });
});


exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await Admin.findById(id)

    await fs.unlink(path.join(__dirname, "..", "project", result.hero))

    await Admin.findByIdAndDelete(id)

    res.status(200).json({ message: "Project Delete Success" })
})



exports.updateProject = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err.message || "unable to upload" })
        }

        const { id } = req.params
        const result = await Admin.findById(id)

        if (req.file) {
            //Delete Previous image and upload new image
            await fs.unlink(path.join(__dirname, "..", "project", result.hero)) //Delete
            //upload
            await Admin.findByIdAndUpdate(id, { ...req.body, hero: req.file.filename })
        } else {
            await Admin.findByIdAndUpdate(id, req.body)
        }

        res.status(200).json({ message: "Project Update Success" })
    })

})