const express = require('express');

const {submitTopic} = require('../../service/topic.service')
const {approveTopic, getTopicByGroupId, getPendingTopics} = require('../../service/topic.service')

const router = express.Router();

router.post('/submit' , submitTopic )
router.post('/approveTopic' , approveTopic )
router.get('/getTopicByGroup' , getTopicByGroupId )
router.get('/toApprove' , getPendingTopics )

module.exports = router;
