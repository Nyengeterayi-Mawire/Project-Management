const mongoose = require('mongoose');

const schema = mongoose.Schema;

const tasksSchema = new schema({
    projectID : {
        type : schema.Types.ObjectId,
        ref : 'Projects',
        require : true
    }, 
    name : {
        type :String,
        require : true
    },
    description : {
        type :String,        
    },
    priority : {
        type : String,
        require : true
    },
    status : {
        type : String,
        require : true
    },
    options : {
        type : Boolean,
        require : true
    }
},{timestamps:true});

module.exports = mongoose.model('Tasks',tasksSchema);