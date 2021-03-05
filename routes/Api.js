const express = require("express")
const router = express.Router();
const Joi = require("joi")

router.use(express.json())

const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
]

// ############################ FIRST PART (GET)
router.get("/", (req, res) => {
    res.send(courses)
})


// ############################ SECOND PART (GET/:id)
router.get("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)) // this return String so we need to convert it 

    if (!course) {
        return res.status(404).send("The course with the given ID was not found!")
    }

    res.send(course)
})


// ############################ THIRD PART (POST)
router.post("/post", (req, res) => {
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
router.put("/update/:id", (req, res) => {
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
router.delete("/delete/:id", (req, res) => {
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


module.exports = router