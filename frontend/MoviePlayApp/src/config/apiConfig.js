import {API_BASE_URL_DEV, API_BASE_URL_PROD, API_BASE_URL_LOCAL} from '@env';
import store from '../redux/store';
import axios from 'axios';
import authService from '../services/authService';

const API_BASE_URL = __DEV__ ? API_BASE_URL_DEV : API_BASE_URL_PROD;
// const API_BASE_URL = API_BASE_URL_LOCAL;

const API_VERSION = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        const userId = state.user.userData.userId;
        const oldAccessToken = state.auth.accessToken;

        const response = await authService.refreshToken(
          userId,
          oldAccessToken,
          refreshToken,
        );

        const newAccessToken = response.data.accessToken;

        store.dispatch(
          refreshToken({
            accessToken: newAccessToken,
            refreshToken: refreshToken,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const api_image = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

api_image.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.accessToken;

    console.log('Appended token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api_image.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    console.log('about to read status');
    console.log('ERROR');
    console.log(error.config);

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Read status');
      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        const userId = state.user.userData.userId;
        const oldAccessToken = state.auth.accessToken;

        const response = await authService.refreshToken(
          userId,
          oldAccessToken,
          refreshToken,
        );

        const newAccessToken = response.data.accessToken;

        store.dispatch(
          refreshToken({
            accessToken: newAccessToken,
            refreshToken: refreshToken,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api_image(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

const endpoints = {
  user: {
    removeMovieFromFavorites: (userId, movieId) =>
      `${API_VERSION}/users/${userId}/movies/${movieId}`,
    getUserData: userId => `${API_VERSION}/users/${userId}`,
    getFavoriteMovies: userId => `${API_VERSION}/users/${userId}/favorites`,
    addMovieToFavorites: (userId, movieId) =>
      `${API_VERSION}/users/${userId}/movies/${movieId}`,
    changeNickname: userId => `${API_VERSION}/users/${userId}/nickname`,
    changeProfilePicture: userId => `${API_VERSION}/users/${userId}/images`,
  },
  movie: {
    getMoviesForHomepage: () => `${API_VERSION}/movies/`,
    getMovieById: movieId => `${API_VERSION}/movies/${movieId}`,
    searchMovies: (input, sort, orderBy) =>
      `${API_VERSION}/movies/search?input=${input}&page=0&size=30&sort=${sort}&orderBy=${orderBy}`,
    getNewReleases: () => `${API_VERSION}/movies/new`,
    rateMovie: (movieId, userId) =>
      `${API_VERSION}/movies/${movieId}/rate/${userId}`,
  },

  auth: {
    logout: userId => `${API_VERSION}/auth/logout/${userId}`,
    deleteUser: userId => `${API_VERSION}/auth/delete-account/${userId}`,
    refreshToken: () => `${API_VERSION}/auth/refresh`,
    login: () => `${API_VERSION}/auth/login`,
  },
};

export {api, api_image, endpoints};
