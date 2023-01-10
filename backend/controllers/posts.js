
const getFeedPosts = (req, res) => {
    res.send('get feed posts')   
}

const getUserPosts = (req, res) => {
    res.send('get user posts')
}

const createPost = (req, res) => {
    res.send('create post')
}

const likePost = (req, res) => {
    res.send('like post')
}

const deletePost = (req, res) => {
    res.send('delete post')
}

module.exports = {
    getFeedPosts, getUserPosts, createPost, likePost, deletePost
}