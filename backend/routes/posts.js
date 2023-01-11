const express = require('express')
const router = express.Router()

const {upload} = require('../utils/multer')

const {getFeedPosts, getUserPosts, createPost, likePost, deletePost} = require('../controllers/posts')

router.get('/', getFeedPosts)
router.get('/:userId/posts', getUserPosts)
router.post('/', upload.single('image'), createPost)
router.patch('/:id/like', likePost)
router.delete('/:id', deletePost)

module.exports = router