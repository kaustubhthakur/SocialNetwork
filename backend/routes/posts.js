const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {likeUnlikePost,createPost,getPost,getPosts} = require('../controllers/posts')
router.post('/',protectRoute,createPost)
router.get('/',getPosts)
router.get('/:id',protectRoute,getPost)
router.put('/:id/vote',protectRoute,likeUnlikePost)
module.exports = router;