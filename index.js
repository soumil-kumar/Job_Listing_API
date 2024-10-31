const express = require('express');
const connectDB = require("./config/db.js")
const Job = require('./models/job.model');
const jobRoutes = require('./routes/job.route.js');
const authRoutes = require('./routes/auth.js')
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/jobs/', jobRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Updated');
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

