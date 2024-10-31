const mongoose = require('mongoose');

const JobSchema = mongoose.Schema(
  {
    job_title: {
      type: String,
      required: [true,"Please enter product name"],
    },  
  
    company_name: {
      type: String,
      required: true,
    },
  
    location: {
      type: String,
      required: true,
    },
  
    job_type: {
      type : String,
      required: true,
    },

    description :{
      type : String,
      required : true,
    },

    salary_range :{
      type: String,
      required : false,
    },
  },

  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job",JobSchema);

module.exports = Job;

