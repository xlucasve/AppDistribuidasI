import api, { endpoints } from '../config/apiConfig';

export const removeMovieFromFavorites = async (userId, movieId) => {
  try {
    const response = await api.delete(endpoints.user.removeMovieFromFavorites(userId, movieId));
    return response.data;
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await api.get(endpoints.user.getUserData(userId));
    return response.data;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};