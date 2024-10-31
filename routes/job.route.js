const express = require("express");
const Job = require('../models/job.model.js'); 
const router = express.Router();
const isAuth = require("../middlewares/is_auth.js")
const {getJobs, getJob, createJob, updateJob, deleteJob, uploadInitialJobData}= require('../controllers/job.controller.js');

router.get('/', isAuth, getJobs);
router.get('/:id', isAuth, getJob);
router.post('/', isAuth, createJob);
router.put('/:id', isAuth, updateJob);
router.delete('/:id', isAuth, deleteJob);
//router.get('/:id' , isAuth, uploadInitialJobData);
module.exports = router;