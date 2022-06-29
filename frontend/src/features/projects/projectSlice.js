import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from './projectService';

const initialState = {
  projects: [],
  project: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create a new project
export const create = createAsyncThunk('projects/create', async (projectData, thunkAPI) => {
  try {
    const TOKEN = thunkAPI.getState().auth.user.token;
    return await projectService.createProject(projectData, TOKEN);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get user projects
export const get = createAsyncThunk('projects/getAll', async (_, thunkAPI) => {
  try {
    const TOKEN = thunkAPI.getState().auth.user.token;
    return await projectService.getProjects(TOKEN);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get single user project
export const getOne = createAsyncThunk('projects/getOne', async (projectID, thunkAPI) => {
  try {
    const TOKEN = thunkAPI.getState().auth.user.token;
    return await projectService.getProject(projectID, TOKEN);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// update project
export const update = createAsyncThunk('projects/update', async (load, thunkAPI) => {
  try {
    const TOKEN = thunkAPI.getState().auth.user.token;
    const { id: projectID, data } = load;
    return await projectService.updateProject(projectID, data, TOKEN);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(get.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.projects = action.payload.projects;
      })
      .addCase(get.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOne.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.project = action.payload.project;
      })
      .addCase(getOne.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.project = action.payload.project;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
