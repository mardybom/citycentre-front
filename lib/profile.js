import axios from 'axios';
import { getAuthorizationHeader } from './utils';

const baseUrl = '/api/profile';

export const getProfile = async () => {
  try {
    const { data } = await axios.get(baseUrl, {
      headers: getAuthorizationHeader(),
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
