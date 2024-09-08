const User = require('../schemas/users'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const allUsers = async(req,res) => {
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch(err){
        res.json({err:err.message})
    }

}
const signUp =async(req,res) => {
    try{
        const {name,surname,username,password} = req.body; 
        const exist = await User.find({username}); 
        if(exist.length != 0){
            return res.status(404).json({error:'Username already exists'})
        }
        const cryptPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,surname,username,password:cryptPassword}); 
        if(!user){
            return res.status(404).json({error:'Could not create user'})
        }
        res.status(200).json(user)
    }catch(err){
        res.json({error:err.message})
    }
} 

const login = async(req,res) => {
    try{
        const {username,password} = req.body;         
        const validUsername = await User.findOne({username}); 
        if(!validUsername){
            return res.status(404).json({error:'Incorrect username'})
        }; 
        const validatePassword = await bcrypt.compare(password,validUsername.password) 
        if(!validatePassword){
            return res.status(404).json({error:'Incorrect password'})
        }
        delete validUsername.password;
        const token = jwt.sign({userID:validUsername._id},process.env.SECRET_KEY,{'expiresIn':'1h'});
        if(!token){
            return res.status(404).json({error:'Failed to create token'})
        }

        res.status(200).json({user:validUsername,token});
    }catch(err){
        res.json({error:err.message})
    }
}

const remove = async(req,res) => {
    try{
        const {id} = req.params; 
        const user = await User.findByIdAndDelete(id); 
        if(!user){
            return res.status(404).json({error:'Could not delete account'})
        }
        res.status(200).json(user);
    }catch(err){
        res.json({error:err.message})
    }
}

const update = async(req,res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        if(data.password){            
            const cryptPassword = await bcrypt.hash(data.password,10);            
            if(!cryptPassword){
                return res.status(404).json({error:'Could not encrypt password'})
            }
            const user = await User.findByIdAndUpdate(id,{...data,password:cryptPassword}); 
            if(!user){
                return res.status(404).json({error:'Could not create user'})
            }
            return res.status(200).json(user);
        }
        const user = await User.findByIdAndUpdate(id,data); 
        if(!user){
            return res.status(404).json({error:'Could not create user'})
        }
        res.status(200).json(user);

    }catch(err){
        res.json({error:err.message})
    }
} 

module.exports = {signUp,login,remove,update,allUsers};