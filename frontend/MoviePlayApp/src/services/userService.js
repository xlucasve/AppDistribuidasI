import { api, apiWithFormData, endpoints } from '../config/apiConfig';

const userService = {
  getUserData: async (userId) => {
    try {
      const response = await api.get(endpoints.user.getUserData(userId));
      return response.data;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  },

  updateUserNickname: async (userId, nickname) => {
    try {
      const response = await api.put(endpoints.user.changeNickname(userId), {
        nickname,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateUserProfilePicture: async (userId, image) => {
    try {
      const formData = new FormData();

      const media = {
        name: image.fileName,
        height: image.height,
        width: image.width,
        type: image.type,
        uri: image.uri,
      };

      formData.append('image', media);

      const response = await apiWithFormData.put(
        endpoints.user.changeProfilePicture(userId),
        formData,
      );

      return response.data;
    } catch (error) {
      console.error('Error updating user profile picture:', error);
      throw error;
    }
  },

  removeMovieFromFavorites: async (userId, movieId) => {
    try {
      const response = await api.delete(
        endpoints.user.removeMovieFromFavorites(userId, movieId),
      );
      return response.data;
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
      throw error;
    }
  },
};

export default userService;
