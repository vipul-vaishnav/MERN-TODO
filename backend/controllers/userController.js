import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from './../models/userModel.js';
import generateToken from './../token/generateToken.js';

// @desc    To register a new user
// @route   /api/v1/users/register
// @access  PUBLIC

const register = asyncHandler(async (req, res) => {
  const { name, email, password, password_cnf, agree_tnc } = req.body;

  // check if all required fileds are present
  if (name && email && password && password_cnf && agree_tnc) {
    // check if user with this email already exists
    const user = await userModel.findOne({ email: email });

    if (user) {
      res.status(400);
      throw new Error('User with this email is already registered');
    } else {
      if (password !== password_cnf) {
        res.status(400);
        throw new Error('Passwords do not match');
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            agree_tnc: agree_tnc,
          };

          const newUser = await userModel.create(userData);

          if (newUser) {
            res.status(201).json({
              status: 'success',
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              token: generateToken(newUser._id),
              message: 'User registered successfully',
            });
          } else {
            res.status(400);
            throw new Error('Invalid user data');
          }
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
    }
  } else {
    res.status(400);
    throw new Error('Missing required field/s');
  }
});

// @desc    To login an existing user
// @route   /api/v1/users/login
// @access  PUBLIC

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // check if user with this email exists or not
    const user = await userModel.findOne({ email: email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        res.status(201).json({
          status: 'success',
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          message: 'User logged in successfully',
        });
      } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
      }
    } else {
      res.status(400);
      throw new Error('User not found');
    }
  } else {
    res.status(400);
    throw new Error('Missing required field/s');
  }
});

// @desc    To get data of an existing user
// @route   /api/v1/users/me
// @access  PROTECTED
const getMe = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: 'success',
    message: 'User data fetched successfully',
    user,
  });
};

// @desc    To change the password of an existing user
// @route   /api/v1/users/:id
// @access  PROTECTED
const resetPassword = asyncHandler(async (req, res) => {
  const user = req.user;
  const { new_password, new_password_cnf } = req.body;

  if (new_password && new_password_cnf) {
    if (new_password !== new_password_cnf) {
      res.status(400);
      throw new Error('Passwords do not match');
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        await userModel.findByIdAndUpdate(req.user._id, { $set: { password: hashedPassword } });
        res.status(200).json({
          status: 'success',
          message: 'Password updated successfully',
        });
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  } else {
    res.status(400);
    throw new Error('Missing required field/s');
  }
});

export { register, login, getMe, resetPassword };
