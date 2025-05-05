const express = require('express');
const dotenv = require('dotenv');
const router=express.Router();
const { registerUser, loginUser } = require('../Controllers/User'); 
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
