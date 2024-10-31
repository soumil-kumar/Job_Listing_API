const Job = require('../models/job.model.js');
const fs = require('fs');

const getJobs = async (req, res) => {
  try {
    const { job_title, location, job_type } = req.query;

    let filters = {};

    if (job_title) filters.job_title = { $regex: job_title, $options: 'i' }; 
    if (location) filters.location = { $regex: location, $options: 'i' };     
    if (job_type) filters.job_type = { $regex: job_type, $options: 'i' };     

    const jobs = await Job.find(filters);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to load data from a JSON file 
const uploadInitialJobData = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('job_listings.json', 'utf-8'));
    const existingJobs = await Job.countDocuments();
    if (existingJobs === 0) {
      await Job.insertMany(data);
      res.status(201).json({ message: 'Job data successfully uploaded to MongoDB' });
    } else {
      res.status(409).json({ message: 'Job data already exists in MongoDB' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error uploading job data: ' + err.message });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  uploadInitialJobData
};
