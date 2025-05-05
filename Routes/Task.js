const express = require('express');
const router = express.Router();

const { createTask,getTasks,deleteTask,markTaskAsCompleted ,assignTaskToUser} = require('../Controllers/Task');
const  authMiddleware  = require('../Middlewares/authMiddleware');
router.post('/',authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.delete('/:taskId', authMiddleware, deleteTask);
router.put('/:taskId', authMiddleware, markTaskAsCompleted);
router.put('/:taskid/assign',authMiddleware,assignTaskToUser);
module.exports = router;