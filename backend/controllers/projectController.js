import asyncHandler from 'express-async-handler';
import userModel from './../models/userModel.js';
import projectModel from './../models/projectModel.js';

// @desc    To get projects of logged in user
// @route   GET /api/v1/projects
// @access  PROTECTED
const getProjects = asyncHandler(async (req, res) => {
  const user = req.user;
  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const projects = await projectModel.find({ user: loggedInUser._id });

    res.status(200).json({
      status: 'success',
      message: 'Projects fetched successfully',
      results: projects.length,
      projects: projects,
    });
  }
});

// @desc    To create a new project for logged in user
// @route   POST /api/v1/projects
// @access  PROTECTED
const createProject = asyncHandler(async (req, res) => {
  const { title, key, owner, category, priority, startDate, endDate, url, description } = req.body;

  const user = req.user;

  if (!title || !key || !owner || !category || !priority || !startDate || !endDate || !description) {
    res.status(400);
    throw new Error('Missing required field/s');
  } else {
    const projectData = {
      user: user._id,
      title: title,
      key: key,
      owner: owner,
      category: category,
      status: 'New',
      priority: priority,
      startDate: startDate,
      endDate: endDate,
      url: url,
      description: description,
    };

    const project = await projectModel.create(projectData);

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      project: project,
    });
  }
});

// @desc    To get (single) project of logged in user
// @route   GET /api/v1/projects/:id
// @access  PROTECTED
const getProject = asyncHandler(async (req, res) => {
  const user = req.user;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project Not Found');
    } else {
      if (project.user.toString() !== loggedInUser._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this project');
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Project Data fetched successfully',
          project: project,
        });
      }
    }
  }
});

// @desc    To delete (single) project of logged in user
// @route   DELETE /api/v1/projects/:id
// @access  PROTECTED
const deleteProject = asyncHandler(async (req, res) => {
  const user = req.user;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project Not Found');
    } else {
      if (project.user.toString() !== loggedInUser._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this project');
      } else {
        if (project.status !== 'Closed') {
          res.status(404);
          throw new Error('Project Not Closed');
        } else {
          await project.remove();
          res.status(200).json({
            status: 'success',
            message: 'Project deleted successfully',
          });
        }
      }
    }
  }
});

// @desc    To update (single) project of logged in user
// @route   PUT /api/v1/projects/:id
// @access  PROTECTED
const updateProject = asyncHandler(async (req, res) => {
  const user = req.user;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project Not Found');
    } else {
      if (project.user.toString() !== loggedInUser._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this project');
      } else {
        const { status } = req.body;

        if (status === 'Closed') {
          const { close_project } = req.body;

          if (close_project === `${project.owner}/${project.title}/${project.key}`) {
            const newData = { ...req.body };
            delete newData.close_project;

            const updated_project = await projectModel.findByIdAndUpdate(req.params.id, newData, { new: true });
            res.status(200).json({
              status: 'success',
              message: 'Project Closed successfully',
              project: updated_project,
            });
          } else {
            res.status(404);
            throw new Error('Close String is Incorrect!');
          }
        } else {
          delete req.body.close_project;
          const updated_project = await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.status(200).json({
            status: 'success',
            message: 'Project updated successfully',
            project: updated_project,
          });
        }
      }
    }
  }
});

export { getProjects, createProject, getProject, deleteProject, updateProject };
