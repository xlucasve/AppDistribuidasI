import {api, endpoints} from '../config/apiConfig';
import authService from './authService';

const movieService = {
  getHomeData: async () => {
    try {
      const accessToken = 'Bearer ' + (await authService.getAccessToken());
      const myHeaders = new Headers();
      myHeaders.append('Authorization', accessToken);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        'https://movieplay-api.onrender.com/api/v1/movies/',
        requestOptions,
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  },
};

export default movieService;
