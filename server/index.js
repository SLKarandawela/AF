const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotEnv.config();
app.use(express.json());
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// getting routes
// submittion route
const SubmissionRoute = require("../server/routes/submittion/submittion.route");
//chat route
const ChatRoute = require("../server/routes/chat/chat.route");
// auth route
const AuthRoute = require("./auth/routes/auth");
// messages route
const MessageRoute = require("./routes/chat/message.route");
// topic route
const topicRoutes = require('./routes/topic/topic.router')
// group route
const groupRoutes = require('./routes/group/group.router')
// group evaluations
const groupEvaluation = require('./panel_member/routes/evaluation')

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Mongo db cluster connected"))
  .catch((e) => console.log(e.message));

app.use("/api/submission", SubmissionRoute),
  app.use("/api/chat", ChatRoute),
  app.use('/api/auth', AuthRoute);
app.use('/api/messages', MessageRoute);
  app.use('/api/topic' , topicRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/evaluation' , groupEvaluation)




  app.listen(process.env.PORT_NUM, () => {
    console.log("Backend is running successfully on port", process.env.PORT_NUM);
  });
