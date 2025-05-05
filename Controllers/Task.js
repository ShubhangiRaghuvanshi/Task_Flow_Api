

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




const getTasks=async(req,res)=>{
    try{



        const tasks = await Task.find({ userId: req.user.id });
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
    }
    catch(error){
        console.error('Error getting tasks:', error);
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
    deleteTask
  
};