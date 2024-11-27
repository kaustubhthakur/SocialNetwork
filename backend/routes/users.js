const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {getUsers,followUnFollowUser,updateUser} = require('../controllers/users')
router.get('/',getUsers)
router.put('/:id/follow',protectRoute,followUnFollowUser)
router.put('/:id',protectRoute,updateUser)
module.exports = router;