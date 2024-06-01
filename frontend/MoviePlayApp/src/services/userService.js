import { api, endpoints } from '../config/apiConfig';
import store from '../redux/store';
const userService = {

  getUserData: async (userId) => {
    try {
      console.log(api.defaults.headers.common['Authorization'])
      api.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
      console.log(api.defaults.headers.common['Authorization'])
      const response = await api.get(endpoints.user.getUserData(userId));
      return response.data;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  },

  updateUserNickname: async (userId, nickname) => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
      const response = await api.put(endpoints.user.changeNickname(userId), { nickname });
      return response.data;
    } catch (error) {
      console.error('Error updating user nickname:', error);
      throw error;
    }
  },

  updateUserProfilePicture: async (userId, image) => {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
      const response = await api.put(endpoints.user.changeProfilePicture(userId), { image });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile picture:', error);
      throw error;
    }
  },

  removeMovieFromFavorites: async (userId, movieId) => {
    try {
      const response = await api.delete(endpoints.user.removeMovieFromFavorites(userId, movieId));
      return response.data;
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
      throw error;
    }
  }

}


export default userService;