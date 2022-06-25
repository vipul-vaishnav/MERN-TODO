import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import userModel from './../models/userModel.js';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const AUTH = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //get token from authorization
      token = req.headers.authorization.split(' ')[1];

      // get id from token
      const { userID } = jwt.verify(token, JWT_SECRET_KEY);

      // get user from id
      req.user = await userModel.findById(userID).select('-password');

      // calling next middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

export default AUTH;
