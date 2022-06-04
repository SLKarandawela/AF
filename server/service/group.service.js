// TODO jest framework
const Groups = require('../models/group/group.model')

exports.createGroup = async (req, res) => {

    let body = req.body

    try {

        if (body.groupName == null) {
            throw new Error("group name is required")
        }

        if (body.groupMembers.length != 4) {
            throw new Error("you must give 4 group member ids to complete")
        }

        // let studentList = false

        //check group members in other groups
        let studentList = await Groups.findOne({groupMembers: {$in: body.groupMembers}})
            .then(doc => {
                if (doc != null) {
                    return doc;
                    // res.status(400).json({message: "student belongs to it number :  already allocate to the group"})
                }
            })
            .catch(err =>{
                res.status(400).json({message: err.message})
            })

        if(studentList != null){
            throw  new Error(`student belongs to it numbers ${studentList.groupMembers} :  already allocate to the group`)
        }

        //check whether students are exits or not
        // TODO check whether students are exits or not

        //create new group
        const group = new Groups(
            {
                groupName: body.groupName,
                groupMembers: body.groupMembers,
            }
        )

        group.save()

        res.status(201).json(group)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}


/**
 * req = {
 *     studentId = mongo created one
 * }
 */
exports.loadGroupByStudentId = (req , res) =>{

    const body = req.body
    console.log("this is request bidy", body)

    try {

        Groups.findOne({groupMembers: {$in: body.studentId}})
            .then(doc => {
                if(doc != null){
                    res.status(200).json(doc)
                }else{
                    res.status(400).json({message:"you are not allocated to group"})
                }
            })


    }catch (err){
        res.status(400).json({message: err.message})
    }


}

/**
 *
 * res = all searching for supervisor grps
 */
exports.listPendingForSupervisor = (req , res) =>{
    Groups.find({status : "SEARCHINGSUPERVISOR"})
        .then(doc => {
            if(doc != null){
                res.status(200).json(doc)
            }else{
                res.status(400).json({message:"no any groups for supervisors"})
            }
        })
}

/*
*   req = {
*       groupId,
*   }
* */
exports.enableSearchSupervisor = (req , res) =>{
    const body = req.body

    try{
        Groups.findOne({_id : body.groupId , status : "IDEAL"})
            .then(doc => {
                if(doc != null){
                    doc.status = "SEARCHINGSUPERVISOR"
                    doc.save()
                    res.status(200).json({message : "done"})
                }else{
                    res.status(400).json({message:"Your group is not eligible for search supervisor"})
                }
            })
    }catch(err){
        res.status(400).json({message: err.message})
    }

}

/**
 *
 * @param req {
 *     groupId,
 *     supervisorId
 * }
 * @param res
 */
exports.allocateSupervisor = (req , res) =>{
    const body = req.body
    try{

        Groups.findById(body.groupId)
            .then(doc => {
                if(doc != null){
                    doc.status = "APPROVESUPERVISOR"

                    //TODO add supervisor get and validate code
                    doc.supervisor = body.supervisorId

                    doc.save()
                    res.status(200).json({message : "done"})
                }else{
                    res.status(400).json({message:"Group does not exist"})
                }
            })

    }catch(err){
        res.status(400).json({message: err.message})
    }
}


/**
 *
 * res = all searching for co supervisor grps
 */
exports.listPendingForCoSupervisor = (req , res) =>{
    Groups.find({status : "SEARCHINGCOSUPERVISOR"})
        .then(doc => {
            if(doc != null){
                res.status(200).json(doc)
            }else{
                res.status(400).json({message:"no any groups for co supervisors"})
            }
        })
}


/*
*   req = {
*       groupId,
*   }
* */
exports.enableSearchCoSupervisor = (req , res) =>{
    const body = req.body

    try{
        Groups.findOne({_id : body.groupId , status : "APPROVESUPERVISOR"})
            .then(doc => {
                if(doc != null){
                    doc.status = "SEARCHINGCOSUPERVISOR"
                    doc.save()
                    res.status(200).json({message : "done"})
                }else{
                    res.status(400).json({message:"Your group is not eligible for search co supervisor"})
                }
            })
    }catch(err){
        res.status(400).json({message: err.message})
    }

}


/**
 *
 * @param req {
 *     groupId,
 *     coSupervisorId
 * }
 * @param res
 */
exports.allocateCoSupervisor = (req , res) =>{
    const body = req.body
    try{

        Groups.findById(body.groupId)
            .then(doc => {
                if(doc != null){
                    doc.status = "APPROVECOSUPERVISOR"

                    //TODO add co supervisor get and validate code
                    doc.coSupervisor = body.coSupervisorId

                    doc.save()
                    res.status(200).json({message : "done"})
                }else{
                    res.status(400).json({message:"Group does not exist"})
                }
            })

    }catch(err){
        res.status(400).json({message: err.message})
    }
}