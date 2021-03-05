const express = require("express")

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello this is from routes")
})
// http://localhost:3000/example  --> access
// because in index.js
// app.use("/example", Example)
// on this route "/example" run Example class

router.get("/anotherRoute", (req, res) => {
    res.send("Another Route")
})

// http://localhost:3000/example/anotherRoute -->> --> access

module.exports = router;