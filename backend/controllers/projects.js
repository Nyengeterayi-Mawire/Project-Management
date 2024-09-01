const Project = require('../schemas/projects'); 
const mongoose =require('mongoose'); 
const { ObjectId} = mongoose.Types;

const allProjects = async(req,res) => {
    try{
        const projects = await Project.find({}); 
        res.status(200).json(projects);
    }catch(err){
        res.json({error:err.message})
    }
}

const singleProject = async(req,res) => {
    try{
        const {id} = req.params;
        const project = await Project.findById(id); 
        if(!project){
            return res.status(404).json({error:'Could not find project'})
        }
        res.status(200).json(project);
    }catch(err){
        res.json({error:err.message})
    }
}

const userProjects = async(req,res) => {
    try{
        const {id} = req.params;
        const projects = await Project.find({userID:id}).sort({createdAt : -1}); 
        res.status(200).json(projects)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

const create = async(req,res) => {
    try{
        const {name,description,userID,options} = req.body; 
        const project = await Project.create({name,description,userID,options}); 
        if(!project){
            return res.status(404).json({error:'Could not create project'})
        }
        res.status(200).json(project);
    }catch(err){
        res.json({error:err.message})
    }
}

const remove = async(req,res) => {
    try{
        const {id} = req.params; 
        const project = await Project.findByIdAndDelete(id); 
        if(!project){
            return res.status(404).json(project)
        }
        res.status(200).json(project)
    }catch(err){
        res.json({error:err.message})
    }
} 

const update = async(req,res) => {
    try{

    }catch(err){
        res.json({error:err.message})
    }
}

const search = async(req,res) =>{
    const {id} = req.params;
    const {search} = req.body;
    try{
        const projects = await Project.find({userID:id,name:search});
        console.log(projects,search);
        res.status(200).json(projects);
    }catch(err){
        res.json({error:err.message})
    }
}

module.exports = {allProjects,singleProject,create,remove,update,userProjects,search};