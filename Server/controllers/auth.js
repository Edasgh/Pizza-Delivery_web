const async_handler = require("express-async-handler");

const User = require("../models/Usermodel");
const generateToken = require("../config/generateToken");

const bcrypt = require("bcryptjs");
const axios = require("axios");

//function to register user
const registerUser = async_handler(async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || (!password && password.length >= 8) || !address) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  //create an User object in User model
  const newUser = await User.create({
    name,
    email,
    password,
    address,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("User creation failed!");
  }
});
//function to login user
const loginUser = async_handler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      token: generateToken(user._id),
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
//function to view logged in user's details
const getUser = async_handler(async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(401);
    throw new Error("Can't view user details");
  }
});
//function to edit logged in user's details
const updateUser = async_handler(async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");

    let newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }
    if (address) {
      newUser.address = address;
    }

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true }
      );
      res.status(201).send(updatedUser);
    }
  } catch (error) {
    res.status(401);
    throw new Error("Can't view user details");
  }
});
//function to change password || for logged in user
const changePassword = async_handler(async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      let newPassword = await bcrypt.hash(password, salt);
      let userPassword = await User.findByIdAndUpdate(
        { _id: userId },
        { password: newPassword },
        { new: true }
      );
      if (userPassword) {
        res.status(201).send({ message: "Password changed successfully!" });
      }
    } else {
      res.status(401);
      throw new Error("Can't change password");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Can't change password");
  }
});

const forgotPassword = async_handler(async (req, res) => {
  try {
    const { password } = req.body; //without token , access via email
    const user = req.user;
    const userId = req.user._id;
    if (user) {
      const salt = await bcrypt.genSalt(10);
      let newPassword = await bcrypt.hash(password, salt);
      let userPassword = await User.findByIdAndUpdate(
        userId,
        { password: newPassword },
        { new: true }
      );
      if (userPassword) {
        res.status(201).send({ message: "Password changed successfully!" });
      }
    } else {
      res.status(401);
      throw new Error("Can't find User!");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Can't change password");
  }
});

const verifyUserEmail = async_handler(async (req, res) => {
  //to verify user's email for login and forgot password
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(200).json({ success: true });
    } else {
      throw new Error("An unknown error occurred!");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Can't change password");
  }
});

const oauth_via_google = async_handler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        token: generateToken(user._id),
        success: true,
      });
    } else {
      res.status(401).send({ message: "Can't find user!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const getGhUser = async_handler(async (req, res) => {
  try {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    const { code } = req.body;
    const fetchUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;

    
    const getAccessTokenResponse = await axios.post(fetchUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (getAccessTokenResponse.status !== 200) {
      throw new Error("Something went wrong!");
    }
    const data = await getAccessTokenResponse.data;
    const access_token = new URLSearchParams(data).get("access_token");
    const getGithubUserResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (getGithubUserResponse.status !== 200) {
      throw new Error("Something went wrong!");
    }

    const userEmail = getGithubUserResponse.data.email;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        token: generateToken(user._id),
        success: true,
      });
    } else {
      res.status(401).send({ message: "Can't find user!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  changePassword,
  forgotPassword,
  verifyUserEmail,
  oauth_via_google,
  getGhUser,
};
