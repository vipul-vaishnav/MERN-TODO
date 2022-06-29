import axios from 'axios';

const API_URL = '/api/v1/projects/';

// Create New Project
const createProject = async (projectData, TOKEN) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.post(API_URL, projectData, config);

  return response.data;
};

// get all Projects
const getProjects = async (TOKEN) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// get one Projects
const getProject = async (projectID, TOKEN) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.get(`${API_URL}${projectID}`, config);

  return response.data;
};

// update project
const updateProject = async (projectID, data, TOKEN) => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.put(`${API_URL}${projectID}`, data, config);

  return response.data;
};

const projectService = { createProject, getProjects, getProject, updateProject };

export default projectService;
