import {api, endpoints} from '../config/apiConfig';
import * as Keychain from 'react-native-keychain';

const authService = {
  signIn: async (email, realName, photo) => {
    try {
      const response = await api.post(endpoints.auth.login(), {
        userEmail: email,
        realName: realName,
        profilePictureLink: photo,
      });
      const {accessToken, refreshToken} = response.data;

      await Keychain.setGenericPassword(accessToken, refreshToken);
      return response.data;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logout: async userId => {
    try {
      const response = await api.delete(endpoints.auth.logout(userId));
      await Keychain.resetGenericPassword();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteUser: async userId => {
    try {
      const response = await api.delete(endpoints.auth.deleteUser(userId));
      await Keychain.resetGenericPassword();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  refreshToken: async (userId, accessToken, refreshToken) => {
    try {
      const response = await api.post(endpoints.auth.refreshToken(), {
        userId, accessToken, refreshToken,
      });
      const {accessToken, newRefreshToken} = response.data;

      await Keychain.setGenericPassword(accessToken, newRefreshToken);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getUserCredentials: async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAccessToken: async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials.username; // accessToken is stored as username
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getRefreshToken: async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials.password; // refreshToken is stored as password
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default authService;
