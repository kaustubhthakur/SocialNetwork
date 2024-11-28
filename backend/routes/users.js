const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {getUsers,getUser ,followUnFollowUser,updateUser} = require('../controllers/users')
router.get('/',getUsers)
router.put('/:id/follow',protectRoute,followUnFollowUser)
router.put('/:id',protectRoute,updateUser)
router.get('/profile',protectRoute,getUser)
module.exports = router;