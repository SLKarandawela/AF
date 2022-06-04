const Evaluation = require('../models/Evaluation');

exports.viewevaluations = (req,res) => {
    // res.send("View Evaluations Route");
    Evaluation.find().then((evaluation) =>{
        res.json(evaluation);
    }).catch((err) => {
        res.status(404).json({
            message: "There is no any evaluations available",
            error: err.message 
        });
    });

};

exports.addevaluation = async (req,res) => {
    // res.send("Add Evaluation Route");
    const {studentid,groupid,researcharea,researchtopic,result,evaluatorid,evaluatorname,evaluationdate,remark } = req.body;
    try{
        const evaluation = await Evaluation.create({
            studentid,groupid,researcharea,researchtopic,result,evaluatorid,evaluatorname,evaluationdate,remark
        });
        res.status(201).json({
            success:true,
            evaluation
        });
    }catch (error){
        res.status(500).json({
            success:false,
            error:error.message
        });
    }    
};

exports.updateevaluation = (req, res) => {
    Evaluation.findByIdAndUpdate(req.params.id, req.body)
    .then((evaluation) => {
      return res.json({
        message: "You have successfully updated the evaluation",
        evaluation,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Sorry this evaluation cannot be updated",
        error: err.message,
      });
    });
  };

exports.getevaluation = (req,res) => {
    // res.send("Get one Evaluation Route");
    Evaluation.findById(req.params.id).then((evaluation) =>{
        res.json(evaluation);
    }).catch((err) => {
        res.status(404).json({
            message: "There is no any evaluations available for this ID",
            error: err.message 
        });
    });
};

exports.deleteevaluation = (req,res) => {
    // res.send("delete one Evaluation Route");
    Evaluation.findByIdAndRemove(req.params.id, req.body).then((evaluation) =>{
        res.json(evaluation);
    }).catch((err) => {
        res.status(404).json({
            message: "There is no any evaluations available for this ID",
            error: err.message 
        });
    });
};
