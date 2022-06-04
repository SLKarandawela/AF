const router = require("express").Router();
const SubmittionModel = require("../../models/submission/submission.models");

// create new submittion
router.post("/", async (req, res) => {
  const newSubmission = new SubmittionModel(req.body);
  try {
    const savedSubmission = await newSubmission.save();
    res.status(200).json(savedSubmission);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

// update submittion
router.put("/:id", async (req, res) => {
  try {
    const selectedSubmission = await SubmittionModel.findById(req.params.id);
    if (selectedSubmission.author == req.body.author) {
      try {
        const updatedSubmission = await SubmittionModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedSubmission);
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(401).json("Update Restricted");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// delete submittion
router.get("/del/:id", async (req, res) => {
  try {
    const selectedSubmission = await SubmittionModel.findById(req.params.id);
    if (selectedSubmission.author == req.body.author) {
      try {
        selectedSubmission.availability = false;
        const stateChanged = await selectedSubmission.save();

        res.status(200).json(stateChanged);
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(401).json("Update Restricted");
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// get all submittions
router.get("/", async (req, res) => {
  try {
    let allSubmissions;
      allSubmissions = await SubmittionModel.find();
    res.status(200).json(allSubmissions);
  } catch (e) {
    res.status(500).json(e);
  }
});

// get spscific assignment
router.get("/:id", async (req, res) => {
  try {
    const selectedSubmission = await SubmittionModel.findById(req.params.id);
    res.status(200).json(selectedSubmission);
      
  } catch (e) {
    res.status(500).json(e);
  }
   
});
