
const mongoose = require('mongoose');
const Task = require('../Models/Task'); 



const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Please fill  in all the fields' });
        }
        const newTask = new Task({
            title,
            description,
            userId: req.user.id
        });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




const getTasks=async (req, res) => {
   
    try {
  const {status,search,page=1,limit=5} = req.query;
   const userId = req.user.id; 
   let query={};
   query.userId = new mongoose.Types.ObjectId(userId);
    if(status) query.status=status;
    if(search)
    {
        const regEx=new RegExp(search,'i');
        query.$or=[{title:regEx},{description:regEx}];
    }
        const skip=(page-1)*limit;
        const tasks=await Task.find(query).skip(skip).limit(limit).sort({dueDate:1});
        const totalTasks = await Task.countDocuments(query);
        res.status(200).json({
            tasks,
            page: Number(page),
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks
          });


        
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const markTaskAsCompleted = async (req, res) => {
    const {taskId}=req.params;
    console.log(taskId);
    console.log(req.user.id);
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if(task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this task' });
        }
        task.status = 'completed';
        await task.save();
       
        res.status(200).json({ message: 'Task marked as completed', task });
    }
    catch (error) {
        console.error('Error marking task as completed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}





const assignTaskToUser = async (req, res) => {
    const {taskid}=req.params;
    const {userId}=req.body;
   try{

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
      }
     

    const task = await Task.findById((taskid));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.userId = userId;
    await task.save();
    res.status(200).json({ message: 'Task  has been assigned to user', task });    
   } 
   catch (error) {
        console.error('Error assigning task to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



const deleteTask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const task=await Task.findByIdAndDelete(taskId);
        if(!task){
            return res.status(404).json({message:'Task not found'});
        }
        res.status(200).json({message:'Task deleted successfully',task});
    }
    catch(error){
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    createTask,
    getTasks,
    deleteTask,
    markTaskAsCompleted,
    assignTaskToUser
  
};