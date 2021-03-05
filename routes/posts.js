const express = require("express")
const { array } = require("joi")
const { set } = require("mongoose")
const router = express.Router()
const Post = require("../model/post")


// Get All Posts
router.get("/", async (req, res) => {
    try {
        const getPosts = await Post.find()
        res.json(getPosts)
    } catch (err) {
        res.json({ message: err })
    }

})

// Get Post By Id
router.get("/:id", async (req, res) => {
    try {
        const getPostById = await Post.findById(req.params.id)
        res.json(getPostById)
    } catch (err) {
        res.json({ message: err })
    }
})

// Create Post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }

})


// Update By Id
router.put("/:id", async (req, res) => {
    try {
        const updateRecord = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        )
        res.json(updateRecord)
    } catch (err) {
        res.json({ message: err })
    }
})



// Delete Post
router.delete("/:id", async (req, res) => {
    try {
        const deleteById = await Post.deleteOne({ _id: req.params.id })
        res.json(deleteById)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router