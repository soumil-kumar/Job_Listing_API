const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/user.js");

//Login
router.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ erorr: "Invalid Credentials" });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    const token = jwt.sign(payload, config.get("JWT_KEY"), {
      expiresIn: "2hr",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//Register

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;  // Use req.body instead of req.query
  
  try {
    let user = await User.findOne({ email });
  
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
  
    const hashedPwd = await bcrypt.hash(password, 10);  // Await the bcrypt hash operation
      
    user = new User({
      username,
      email,
      password: hashedPwd
    });
  
    const newUser = await user.save();
  
    const payload = {
      user: {
        _id: newUser._id
      }
    };
  
    const token = jwt.sign(payload, config.get("JWT_SECRET"), {
      expiresIn: '2h',
    });
  
    res.status(201).json({ token});
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
});
   

module.exports = router;