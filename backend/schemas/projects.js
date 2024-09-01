const mongoose = require('mongoose'); 

const schema = mongoose.Schema;

const projectsSchema = new schema({
    userID: {
        type: schema.Types.ObjectId,
        ref: 'Users',
        require : true
    },
    name : {
        type:String,
        require:true
    },
    description : {
        type:String,        
    },
    options : {
        type:Boolean,
        require:true
    }
},{timestamps:true});

module.exports = mongoose.model('Projects',projectsSchema);