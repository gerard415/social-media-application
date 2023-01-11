const User = require('../models/User')
const Post = require('../models/Post')

const getFeedPosts = async (req, res) => {
    res.send('get feed posts')   
}

const getUserPosts = async (req, res) => {
    res.send('get user posts')
}

const createPost = async (req, res) => {
    req.body.createdBy = req.user.userId
    const {userId} = req.user
    console.log(req.file)

    const user = await User.findOne({_id: userId})

    const newPost = new Post({
        ...req.body,
        image: req.file.originalname,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        userPicturePath: user.picturePath,

        likes: {},
        comments: [], 
    })
    await newPost.save()

    const posts = await Post.find({})
    res.status(200).json({posts})
}

const likePost = async (req, res) => {
    res.send('like post')
}

const deletePost = async (req, res) => {
    res.send('delete post')
}

module.exports = {
    getFeedPosts, getUserPosts, createPost, likePost, deletePost
}