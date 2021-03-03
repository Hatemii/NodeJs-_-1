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
        return res.status(404).send("The course with the given ID was not found!")
    }

    res.send(course)
})




// ############################ THIRD PART (POST)

app.post("/api/courses", (req, res) => {

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    // call validation function
    const { error } = validationHandle(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    courses.push(course)
    res.send(course)
})



// ############################ FOURTH PART (PUT)

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)) // this return String so we need to convert it 

    if (!course) {
        return res.status(404).send("The course with the given ID was not found!")
    }

    // call validation function
    const { error } = validationHandle(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    course.name = req.body.name
    res.send(course)
})


// ############################ FIFTH PART (DELETE)

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)) // this return String so we need to convert it 

    if (!course) {
        return res.status(404).send("The course with the given ID was not found!")
    }

    const index = courses.indexOf(course)

    courses.splice(index, 1)
    res.send(course)
})



// function
function validationHandle(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server started on PORT ${port}`)) 