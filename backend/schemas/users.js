const mongoose = require('mongoose'); 

const schema = mongoose.Schema; 

const userSchema = new schema({
    name : {
        type : String,
        require : true
    }, 
    surname : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    }, 
    password : {
        type : String,
        require : true
    }
},{timestamps:true}); 

module.exports = mongoose.model('Users',userSchema);