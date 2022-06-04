// const router = require("express").Router();
// const ConversationModel = require("../../models/chat/chat.models");

// // create new submittion
// router.post("/", async (req, res) => {
//   const newConversation = new ConversationModel(
//     {
//       members:[req.body.senderId, req.body.recieverId],
//     }

//   );
//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   }
//   catch (e) {
//     res.status(500).json(e);
//   }
  
// });

// // get user conversation
// router.get("/:id", async (req, res) => {
//   try {
//     const selectedConversation = await ConversationModel.find(
//       {
//         members: { $in :[req.params.id]}
//       },
//     );
//     res.status(200).json(selectedConversation);
      
//   } catch (e) {
//     res.status(500).json(e);
//   }
   
// });








// // get all chats
// router.get("/", async (req, res) => {
//   try {
//     // let allChats;
//     //   allChats = await SubmittionModel.find();
//     res.status(200).json(Chats);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// });

// module.exports = router;

// // single chat
// router.get("/:id", async (req, res) => {
//     try {
      
//     // const selectedChat = Chats.findById(req.params.id);
//         const selectedChat = Chats.find((c) => c._id === req.params.id)
        
        
//     res.status(200).json(selectedChat);
      
//   } catch (e) {
//     res.status(500).json(e);
//   }
   
// });


const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  singleChat
} = require("../../service/chat.service");

const { protect } = require("../../middleware/auth.middleware");
const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/:id").get(protect, singleChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;