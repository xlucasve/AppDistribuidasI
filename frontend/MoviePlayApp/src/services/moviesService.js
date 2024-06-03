import {api, endpoints} from '../config/apiConfig';

const movieService = {
  getHomeData: async () => {
    try {
      const response = await api.get(endpoints.movie.getMoviesForHomepage());

      return response.data;
      
    } catch (error) {
      console.error(error);
    }
  },
};

export default movieService;
