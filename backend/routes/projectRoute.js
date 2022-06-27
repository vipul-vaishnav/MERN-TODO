import express from 'express';
import AUTH from './../middlewares/authMiddleware.js';
import {
  getProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
} from './../controllers/projectController.js';

const router = express.Router();

router.route('/').get(AUTH, getProjects).post(AUTH, createProject);
router.route('/:id').get(AUTH, getProject).delete(AUTH, deleteProject).put(AUTH, updateProject);

export default router;
