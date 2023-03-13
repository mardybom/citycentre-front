import axios from 'axios';

const baseUrl = '/auth';

export const register = async (user) => {
  try {
    const { data } = await axios.post(`${baseUrl}/register`, {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    return {
      user: data,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      username: user.username,
      password: user.password,
    });
    localStorage.setItem('currentUser', JSON.stringify(data));
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};
