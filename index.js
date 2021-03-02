const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Hello")
})


app.get("/api/courses", (req, res) => {
    res.send("Second way " + [1, 2, 3, 4])
})


app.listen(3000, () => console.log("Port started on port 3000..."))