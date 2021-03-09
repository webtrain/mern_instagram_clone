const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Utils functions
const { createAccessToken, createRefreshToken } = require('../utils/functions');

const USER = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      // console.log({fullname, username, email, password, gender});
      // if(!fullname || !username || !email || !password || !gender) return
      //   res.status(400).json({ msg: 'Please fill out all fields' });

      let newUsername = username.toLowerCase().replace(/ /g, '');

      const user_name = await User.findOne({ username: newUsername });
     if(user_name) return res.status(400).json({ msg: 'This username is already exists' });

      const user_email = await User.findOne({ email });
      if(user_email) return res.status(400).json({ msg: 'This email is already exists' });

      if(password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
      if(password.length > 250) return res.status(400).json({ msg: 'Password must be at least 250 characters long' });

      const passwordHash = await bcrypt.hash(password, 12);

      const user = new User({
        fullname,
        username: newUsername,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/users/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // expired in after 30days
      });

      await user.save();

      res.json({ msg: 'Registration success', access_token, user: { ...user._doc, password: '' } });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if(!email || !password) return res.status(401).json({ msg: 'Please add your credentials' });

      const user = await User.findOne({ email }).populate('followers following');

      if(!user) return res.status(401).json({ msg: 'This email is not exists' });
  
      const isMatch = bcrypt.compareSync(password, user.password);

      if(!isMatch) return res.status(401).json({ msg: 'Password is incorrect' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/users/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // expired in after 30days
      });

      res.json({ msg: 'Login success', access_token, user: { ...user._doc, password: '' } });
    } catch (err) {
      res.status(401).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/users/refresh_token' });

      return res.json({ msg: 'Logged out' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if(!rf_token) return res.status(500).json({ msg: 'Please login' });

      jwt.verify(rf_token, process.env.JWT_REFRESH_TOKEN_SECRET, async (err, result) => {
        err && res.status(500).json({ msg: 'Please login' });

        const user = await User.findById(result.id).select('-password').populate('followers following');
        if(!user) return res.status(500).json({ msg: 'This does not exists' });

        const access_token = createAccessToken({ id: result.id });

        res.json({ access_token, user });
      });

      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = USER;
