import axios from 'axios';
import { getAuthorizationHeader } from './utils';

const baseUrl = '/api/events';

export const createEvent = async (event) => {
  try {
    const { data } = await axios.post(
      baseUrl,
      {
        title: event.title,
        capacity: event.capacity,
        isPrivate: event.isPrivate,
        password: event.password,
        startDate: event.startDate,
        endDate: event.endDate,
      },
      {
        headers: getAuthorizationHeader(),
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

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

export const joinEvent = async (eventId) => {
  try {
    const { data } = await axios.put(`${baseUrl}/${eventId}/join`, null, {
      headers: getAuthorizationHeader(),
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateEvent = async (event) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/${event.eventId}`,
      {
        title: event.title,
        capacity: event.capacity,
        isPrivate: event.isPrivate,
        password: event.password,
        startDate: event.startDate,
        endDate: event.endDate,
      },
      {
        headers: getAuthorizationHeader(),
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
