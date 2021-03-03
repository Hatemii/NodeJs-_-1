const express = require("express")
const app = express()
const Joi = require("joi")


app.use(express.json())


// ############################ FIRST PART (GET)

// GET REQUESTS
app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/api/courses", (req, res) => {
    res.send(courses)
})



// ############################ SECOND PART (GET/:id)

// OBJECT
const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
]

// course with given ID
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)) // this return String so we need to convert it 

    if (!course) {
        res.status(404).send("The course with the given ID was not found!")
    }

    res.send(course)
})




// ############################ THIRD PART (POST)

app.post("/api/courses", (req, res) => {

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    // VALIDATION
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error)
        return;
    }


    courses.push(course)
    res.send(course)
})



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on PORT ${port}`)) 