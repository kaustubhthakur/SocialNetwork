const express = require('express')
const router = express.Router();
const {getUser,getUsers,updateUser,followUnFollowUser} = require('../controllers/users')
const protectRoute = require('../utils/protectRoute')
router.get('/',getUsers)
router.get('/:id',protectRoute,getUser)
router.put('/:id',protectRoute,updateUser)
router.put('/:id/friend',protectRoute,followUnFollowUser)
module.exports = router;