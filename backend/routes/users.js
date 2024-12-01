const express = require('express')
const router =express.Router()
const {followUnFollowUser,updateUser,getUser,getUsers} = require('../controllers/users')
const protectRoute = require('../utils/protectRoute')
router.get('/',getUsers)
router.get('/:id',protectRoute,getUser)
router.put('/:id',protectRoute,updateUser)
router.put('/:id/follow',protectRoute,followUnFollowUser)
module.exports =  router;