// const router = require("express").Router();
// const MessageModel = require("../../models/chat/message.models");

// // create new submittion
// router.post("/", async (req, res) => {
//   const newMessage = new MessageModel(req.body);
//   try {
//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);  
//   }
//   catch (e) {
//     res.status(500).json(e);
//   }
  
// });

// // get user messages
// router.get("/:id", async (req, res) => {
//   try {
//     const selectedMessage = await MessageModel.find(
//       {
//         conversationId: req.params.id
//       },
//     );
//     res.status(200).json(selectedMessage);
      
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
  allMessages,
  sendMessage,
} = require("../../service/message.service");

const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.route("/:chatId").get(protect,allMessages);
router.route("/").post(protect,sendMessage);

module.exports = router;