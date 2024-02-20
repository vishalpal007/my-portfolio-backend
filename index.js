const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" })
const path = require("path")


mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(express.static("project"))
app.use(express.static(path.join(__dirname, "dist")))


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



//Routes

app.use("/api/user", require("./routes/userRoute"))
app.use("/api/admin", require("./routes/adminRoute"))
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))

})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "something went wrong" })
})


//server on
mongoose.connection.once("open", () => {
    console.log("Mongo Connected")
    app.listen(process.env.PORT, console.log("Server Running"))
})