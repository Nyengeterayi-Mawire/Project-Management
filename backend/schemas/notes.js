const mongoose = require('mongoose'); 

const schema = mongoose.Schema;

const notesSchema = new schema({
    projectID : {
        type: schema.Types.ObjectId,
        ref : 'Projects',
        require : true
    },
    name : {
        type:String,
        require:true
    },
    description : {
        type:String,
        require:true
    }
    
},{timestamps:true});

module.exports = mongoose.model('Notes',notesSchema);