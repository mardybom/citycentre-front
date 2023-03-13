import axios from 'axios';

const baseUrl = '/api/events';
// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

export const listEvents = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getEvent = async (eventId) => {
  try {
    const { data } = await axios.get(`${baseUrl}/${eventId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
