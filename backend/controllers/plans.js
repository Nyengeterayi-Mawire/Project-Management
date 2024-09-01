const Plan = require('../schemas/plans');
const mongoose = require('mongoose');
const { ObjectId} = mongoose.Types;

const getPlans = async(req,res) => {
    try{        
        const {id} = req.params;
        const {date} = req.body;          
        const newDate = date.split('T')[0];
        console.log(newDate)
        const startDate = new Date(newDate)
        const nextDate = new Date(startDate)
        nextDate.setDate(startDate.getDate()+1)
        // const {date,projectID} = req.body;
        console.log(startDate,nextDate);
        const plans = await Plan.find({projectID : id,date:{$gte:startDate,$lt:nextDate}}).sort({createdAt:-1});         
        res.status(200).json(plans);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
const create = async(req,res) => {
    try{
        const {id} = req.params;
        const {name,date,complete} = req.body;    
        
        const plan = await Plan.create({name,date,complete,projectID:id});
        if(!plan){
            return res.status(404).json({error:'Failed to create plan'})
        };
        res.status(200).json(plan);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
const remove = async(req,res) => {
    try{
        const {id} = req.params;
        const plan = await Plan.findByIdAndDelete(id);
        if(!plan){
            return res.status(404).json({error:'Failed to delete plan'})
        }; 
        res.status(200).json(plan)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
const update = async(req,res) => {
    try{
        const {id} = req.params;        
        const plan = await Plan.findById(id);
        if(!plan){
            return res.status(404).json({error:'Failed to find plan'})
        }; 
        console.log(plan);
        const updatePlan = await Plan.findByIdAndUpdate(id,{complete:!plan.complete}); 
        if(!updatePlan){
            return res.status(404).json({error:'Failed to update plan'})
        }
        const updatedPlan = await Plan.findById(id);
        res.status(200).json(updatedPlan);
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

module.exports = {getPlans,create,remove,update}