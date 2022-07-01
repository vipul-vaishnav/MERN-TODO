import express from 'express';
import AUTH from './../middlewares/authMiddleware.js';
import { getBoards, createNewBoard, getBoard, deleteBoard, updateBoard } from './../controllers/boardController.js';

const router = express.Router();

// api/v1/projects/:projectID/boards
router.route('/:projectID/boards').get(AUTH, getBoards).post(AUTH, createNewBoard);

// api/v1/projects/:projectID/boards/:boardID
router.route('/:projectID/boards/:boardID').get(AUTH, getBoard).delete(AUTH, deleteBoard).put(AUTH, updateBoard);

export default router;
