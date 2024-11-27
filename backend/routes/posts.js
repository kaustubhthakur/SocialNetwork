const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {createpost,deletePost,likeUnlikePost,getpost,getposts} = require('../controllers/posts')
router.post('/',protectRoute,createpost);
router.delete('/:id',protectRoute,deletePost)
router.put('/vote/:id',protectRoute,likeUnlikePost)
router.get('/',getposts)
router.get('/:id',protectRoute,getpost)
module.exports = router;