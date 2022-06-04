const mongoose = require ("mongoose");


/**
 * IDEAL
 * SEARCHINGSUPERVISOR
 * APPROVESUPERVISOR
 * SEARCHINGCOSUPERVISOR
 * APPROVECOSUPERVISOR
 * ACTIVE
 * DELETED
* */

const groupSchema = mongoose.Schema({
    groupName : String,
    groupMembers : [],
    supervisor: String,
    coSupervisor:String,
    status: {
        type : String,
        default: "IDEAL"
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
})

const Groups = mongoose.model('Groups' , groupSchema);

module.exports = Groups