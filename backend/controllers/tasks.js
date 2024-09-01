const Task = require('../schemas/task');

const allTasks = async(req,res) => {
    try{
        const {id} = req.params;       
        const idletasks = await Task.find({projectID:id,status:'idle'}); 
        const pendingtasks = await Task.find({projectID:id,status:'pending'}); 
        const completedtasks = await Task.find({projectID:id,status:'completed'}); 
        res.status(200).json({idletasks,pendingtasks,completedtasks});
    }catch(err){
        res.json({error:err.message})
    }
}

const statistics = async(req,res) => {
    try{
        const {id} = req.params;
        const totalTasks = await Task.find({projectID:id});
        const idletasks = await Task.find({projectID:id,status:'idle'}); 
        const pendingtasks = await Task.find({projectID:id,status:'pending'}); 
        const completedtasks = await Task.find({projectID:id,status:'completed'});
        res.status(200).json({
            idletasks:idletasks.length, 
            pendingtasks:pendingtasks.length,
            completedtasks:completedtasks.length,
            totalTasks:totalTasks.length})

    }catch(err){
        res.json({error:err.message})
    }
}

const singleTask = async(req,res) => {
    try{
        const {id} = req.params;
        const task = await Task.findById(id); 
        if(!task){
            return res.status(404).json({error:'Could not find task'})
        }
        res.status(200).json(task);
    }catch(err){
        res.json({error:err.message})
    }
}

const usertasks = async(req,res) => {
    try{
        const {id} = req.params;
        const tasks = await Task.find({userID:id}); 
        res.status(200).json(tasks)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

const create = async(req,res) => {
    try{
        const {name,description,projectID,priority,status,options} = req.body; 
        const task = await Task.create({name,description,projectID,priority,status,options}); 
        if(!task){
            return res.status(404).json({error:'Could not create task'})
        }
        res.status(200).json(task);
    }catch(err){
        res.json({error:err.message})
    }
}

const remove = async(req,res) => {
    try{
        const {id} = req.params; 
        const task = await Task.findByIdAndDelete(id); 
        if(!task){
            return res.status(404).json(task)
        }
        res.status(200).json(task)
    }catch(err){
        res.json({error:err.message})
    }
} 

const update = async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        console.log(data);
        const task = await Task.findByIdAndUpdate(id,data);
        if(!task){
            return res.status(404).json({error:'Failed to update task'})
        };
        res.status(200).json(task);
    }catch(err){
        res.json({error:err.message});
    }
}

module.exports ={allTasks,singleTask,create,remove,update,statistics};