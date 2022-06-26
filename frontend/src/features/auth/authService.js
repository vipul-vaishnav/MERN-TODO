import axios from 'axios';

const API_URL = '/api/v1/users/';

// Register user
const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}register`, userData);

  if (res.data) {
    localStorage.setItem('taskzapuser', JSON.stringify(res.data));
  }

  return res.data;
};

// Register user
const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}login`, userData);

  if (res.data) {
    localStorage.setItem('taskzapuser', JSON.stringify(res.data));
  }

  return res.data;
};

// Change(Reset) Password
const changePasswordForUser = async (new_pass_data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(`${API_URL}me`, new_pass_data, config);

  return res.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('taskzapuser');
};

const authService = { registerUser, loginUser, changePasswordForUser, logout };

export default authService;
