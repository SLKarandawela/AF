const express = require('express');
const {createGroup, loadGroupByStudentId, enableSearchSupervisor, listPendingForSupervisor, allocateSupervisor,
    enableSearchCoSupervisor, listPendingForCoSupervisor, allocateCoSupervisor
} = require("../../service/group.service");

const router = express.Router();

router.post('/' , createGroup)

router.get('/groupByStudent' , loadGroupByStudentId)

router.post('/enableSearchSupervisor' , enableSearchSupervisor)

router.get('/listSearchSupervisor' , listPendingForSupervisor)

router.post('/allocateSupervisor' , allocateSupervisor)


router.post('/enableSearchCoSupervisor' , enableSearchCoSupervisor)
router.get('/listSearchCoSupervisor' , listPendingForCoSupervisor)
router.post('/allocateCoSupervisor' , allocateCoSupervisor)

module.exports = router