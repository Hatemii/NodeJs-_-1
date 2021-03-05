const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv/config")
const ApiHandle = require("./routes/Api")

app.use(express.json())


app.use("/api/courses", ApiHandle)


// browser url to find mongo link --> https://cloud.mongodb.com/v2/60422beef8d11a1bdf2ddccd#clusters
// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("connected to Database")
}
)
// { useNewUrlParser: true } --> take it from console it helps to remove unnecessary text 


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on PORT ${port}`))