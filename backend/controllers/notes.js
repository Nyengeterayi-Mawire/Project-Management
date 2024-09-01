const Note = require('../schemas/notes');
const mongoose = require('mongoose');
const { ObjectId} = mongoose.Types;

const getNotes = async(req,res) => {
    try{
        const {id} = req.params;
        // const {projectID} = req.body;
        const notes = await Note.find({projectID:id}).sort({createdAt : -1}); 
        res.status(200).json(notes);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
const create = async(req,res) => {
    try{
        const {name,description,projectID} = req.body; 
        const note = await Note.create({name,description,projectID});
        if(!note){
            return res.status(404).json({error:'Failed to create note'})
        };
        res.status(200).json(note);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
const remove = async(req,res) => {
    try{
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id);
        if(!note){
            return res.status(404).json({error:'Failed to delete note'})
        }; 
        res.status(200).json(note)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
const update = async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const note = await Note.findByIdAndUpdate(id,data);
        if(!note){
            return res.status(404).json({error:'Failed to delete note'})
        }; 
        res.status(200).json(note);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

module.exports = {getNotes,create,remove,update}