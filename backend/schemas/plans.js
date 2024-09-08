const mongoose = require('mongoose'); 

const schema = mongoose.Schema;

const plansSchema = new schema({
    projectID : {
        type: schema.Types.ObjectId,
        ref : 'Projects',
        require : true
    },
    name : {
        type:String,
        require:true
    },
    date : {
        type:Date,
        require:true
    },
    complete : {
        type:Boolean,
        require:true
    },
},{timestamps:true})

module.exports = mongoose.model('Plans',plansSchema);
