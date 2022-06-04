const mongoose = require ("mongoose");

const topicSchema = mongoose.Schema({
    groupId : String,
    topic : String,
    status : {
        type:String,
        default: "PENDINGTOAPPROVE"
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
})

const Topics = mongoose.model('Topics' , topicSchema);

module.exports = Topics