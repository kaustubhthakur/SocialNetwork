const express = require('express')
const router = express.Router();
const {createpost,getpost,getposts,likeUnlikePost,deletePost} = require('../controllers/posts')
const protectRoute = require('../utils/protectRoute')
router.post('/',protectRoute,createpost);
router.get('/:id',protectRoute,getpost)
router.delete('/:id',protectRoute,deletePost)
router.put('/:id/like',protectRoute,likeUnlikePost)
router.get('/',getposts);
module.exports = router;