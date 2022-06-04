const Topics = require("../models/topic/topic.model");
const e = require("express");

/**
 *
 * req = {
 *      group_id,
 *      topic
 * }
 */
exports.submitTopic = (req, res) => {

    let body = req.body;

    //validations
    try {

        if (body.groupId == null) {
            throw new Error("group id is required")
        }

        if (body.topic == null) {
            throw new Error("topic is required")
        }

        Topics.findOne({groupId: body.groupId}).then(doc => {

            if (doc == null) {
                const topic = new Topics(
                    {
                        groupId: body.groupId,
                        topic: body.topic,
                    }
                )

                topic.save()
                res.status(201).json(topic)
            } else if (doc.status === "PENDINGTOAPPROVE") {
                doc.topic = body.topic
                doc.save()
                res.status(201).json(doc)
            } else {
                res.status(200).json({message: `topic was approves, it cannot change`})
            }

        })
            .catch(e => {
                throw new Error(e.message)
            })

    } catch (err) {
        res.status(400).json({message: err.message})
    }

}


/**
 * req = {
 *     topic id
 * }
 * */
exports.approveTopic = (req, res) => {

    try {
        let body = req.body
        //validations
        if (body.topicId == null) {
            throw new Error("topic id is required")
        }

        Topics.findById(body.topicId)
            .then(doc => {
                if (doc !== null && doc.status !== "APPROVED") {
                    console.log(doc)
                    doc.status = "APPROVED"
                    doc.save()
                    res.status(201).json(doc)
                } else {
                    res.status(400).json({message: "no topic with this id"})
                }
            })
            .catch(e => {
                console.log(e)
            })

    } catch (err) {
        res.status(400).json({message: err.message})
    }

}


/**
 * req = {
 *     groupId
 * }
 */
exports.getTopicByGroupId = (req , res) =>{
    let body = req.body

    try{

        Topics.findOne({groupId : body.groupId})
            .then(doc => {
                if(doc != null){
                    res.status(200).json(doc)
                }else{
                    res.status(400).json({message: "no topic with this group id"})
                }
            })
            .catch(err =>{

            })

    }catch (e){
        res.status(400).json({message: err.message})
    }

}


exports.getPendingTopics = (req , res) =>{
    Topics.find({status : "PENDINGTOAPPROVE"})
        .then(doc => {
            res.status(200).json(doc)
        })
}