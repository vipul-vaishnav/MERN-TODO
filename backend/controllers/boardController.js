import asyncHandler from 'express-async-handler';
import userModel from './../models/userModel.js';
import projectModel from './../models/projectModel.js';
import boardModel from './../models/boardModel.js';

// @desc    To get boards in a project of logged in user
// @route   GET /api/v1/projects/:projectID/boards
// @access  PROTECTED
const getBoards = asyncHandler(async (req, res) => {
  const user = req.user;
  const { projectID } = req.params;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(projectID);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    } else {
      const boards = await boardModel.find({ project: project._id });

      res.status(200).json({
        status: 'success',
        message: 'boards fetched successfully',
        results: boards.length,
        projects: boards,
      });
    }
  }
});

// @desc    To create a new board in a project for logged in user
// @route   POST /api/v1/projects/:projectID/boards
// @access  PROTECTED
const createNewBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const user = req.user;
  const { projectID } = req.params;

  if (!title) {
    throw new Error('Please Enter a title');
  } else {
    const project = await projectModel.findById(projectID);

    const boards = await boardModel.find({ project: project._id });

    let board_already_exist = false;

    boards.forEach((board) => {
      if (board.title === title) {
        board_already_exist = true;
      }
    });

    if (board_already_exist) {
      res.status(404);
      throw new Error('Board already exists');
    } else {
      const boardData = {
        title,
        user: user._id,
        project: project._id,
      };

      if (user._id.toString() === project.user.toString()) {
        const board = await boardModel.create(boardData);

        res.status(200).json({ status: 'OK', message: 'board created successfully', board });
      } else {
        res.status(404);
        throw new Error('Not Authorized');
      }
    }
  }
});

// @desc    To get (single) board of project of logged in user
// @route   GET /api/v1/projects/:projectID/boards/:boardID
// @access  PROTECTED
const getBoard = asyncHandler(async (req, res) => {
  const user = req.user;
  const { projectID, boardID } = req.params;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(projectID);
    if (!project) {
      res.status(404);
      throw new Error('Project Not Found');
    } else {
      if (project.user.toString() !== loggedInUser._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this project');
      } else {
        const board = await boardModel.findById(boardID);
        if (!board) {
          res.status(404);
          throw new Error('Board Not Found');
        } else {
          if (board.project.toString() !== project._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to view this board');
          } else {
            res.status(200).json({
              status: 'success',
              message: 'Project board fetched successfully',
              board: board,
            });
          }
        }
      }
    }
  }
});

// @desc    To delete (single) board of project of logged in user
// @route   DELETE /api/v1/projects/:projectID/boards/:boardID
// @access  PROTECTED
const deleteBoard = asyncHandler(async (req, res) => {
  const user = req.user;
  const { projectID, boardID } = req.params;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(projectID);
    if (!project) {
      res.status(404);
      throw new Error('Project Not Found');
    } else {
      if (project.user.toString() !== loggedInUser._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this project');
      } else {
        const board = await boardModel.findById(boardID);
        if (!board) {
          res.status(404);
          throw new Error('Board Not Found');
        } else {
          if (board.project.toString() !== project._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to view this board');
          } else {
            if (project.status === 'Closed') {
              res.status(404);
              throw new Error('Project is closed, not able to make any changes');
            } else {
              await board.remove();
              res.status(200).json({
                status: 'success',
                message: 'board deleted successfully',
              });
            }
          }
        }
      }
    }
  }
});

// @desc    To update (single) board of project of logged in user
// @route   PUT /api/v1/projects/:id
// @access  PROTECTED
const updateBoard = asyncHandler(async (req, res) => {
  const user = req.user;
  const { projectID, boardID } = req.params;

  //   Getting user from DB
  const loggedInUser = await userModel.findById(user._id);

  if (!loggedInUser) {
    res.status(400);
    throw new Error('Not Authorized');
  } else {
    const project = await projectModel.findById(projectID);
    if (!project) {
      res.status(404);
      throw new Error('Project Not Found');
    } else {
      if (project.user.toString() !== loggedInUser._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this project');
      } else {
        const board = await boardModel.findById(boardID);
        if (!board) {
          res.status(404);
          throw new Error('Board Not Found');
        } else {
          if (board.project.toString() !== project._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to view this board');
          } else {
            if (project.status === 'Closed') {
              res.status(404);
              throw new Error('Project is closed, not able to make any changes');
            } else {
              const updated_board = await boardModel.findByIdAndUpdate(boardID, req.body, { new: true });
              res.status(200).json({
                status: 'success',
                message: 'Board updated successfully',
                project: updated_board,
              });
            }
          }
        }
      }
    }
  }
});

export { getBoards, createNewBoard, getBoard, deleteBoard, updateBoard };
