const User = require('../models/User')
const Post = require('../models/Post')
const { BadRequestError, NotFoundError } = require('../errors')

const getFeedPosts = async (req, res) => {
    const posts = await Post.find({}).sort('-createdAt')
    res.status(200).json({posts})   
}

const getUserPosts = async (req, res) => {
    const posts = await Post.find({createdBy: req.user.userId}).sort('-createdAt')
    res.status(200).json({posts})
}

const createPost = async (req, res) => {
    req.body.createdBy = req.user.userId
    const {userId} = req.user

    const user = await User.findOne({_id: userId})

    const newPost = new Post({
        ...req.body,
        image: req.file.originalname,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        userPicturePath: user.image,
        likes: {},
        comments: [], 
    })
    await newPost.save()

    const posts = await Post.find({})
    res.status(200).json({posts})
}

const likePost = async (req, res) => {
    const {id: postId} = req.params
    const {userId} = req.user

    const post = await Post.findOne({_id: postId})
    const isLiked = post.likes.get(userId); 

    if(isLiked) {
        post.likes.delete(userId);
    }else {
        post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate({_id: postId},{ likes: post.likes },{ new: true, runValidators: true });

    res.status(200).json({updatedPost})
}

const deletePost = async (req, res) => {
    const {id: postId} = req.params
    const {userId} = req.user

    const post = await Post.findOneAndRemove({_id: postId, createdBy: userId})
    if(!post){
        throw new NotFoundError(`No product with id ${postId}`)
    }
    res.status(200).send('post deleted')
}

module.exports = {
    getFeedPosts, getUserPosts, createPost, likePost, deletePost
}