import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (id) => {
  const TOKEN = jwt.sign({ userID: id }, JWT_SECRET_KEY, { expiresIn: '30d' });
  return TOKEN;
};

export default generateToken;
