import axios from 'axios';

const baseUrl = '/api/auth';

export const register = async (user) => {
  try {
    await axios.post(`${baseUrl}/register`, {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
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
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
