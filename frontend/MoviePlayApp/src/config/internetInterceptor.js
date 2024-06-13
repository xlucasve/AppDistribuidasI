// api/interceptors.js

import NetInfo from '@react-native-community/netinfo';
import store from '../redux/store';
import { showError } from '../redux/slices/errorSlice';

const internetRequestInterceptor = async (config) => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    throw { message: 'No hay conexión a internet' };
  }
  return config;
};

const internetResponseErrorInterceptor = (error) => {
    console.log("ERROR RESPONSE", error)
  if (!error.response) {
    console.log("ERROR CONFIG", error.config)
    store.dispatch(showError({
      message: 'No hay conexión a internet',
      iconName: 'cloud-offline-outline',
      onRetry: () => {
        store.dispatch(retryRequest(error.config));
      },
    }));
  }
  return Promise.reject(error);
};

const setupInternetInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(internetRequestInterceptor, error => Promise.reject(error));
  apiInstance.interceptors.response.use(response => response, internetResponseErrorInterceptor);
};

export { setupInternetInterceptors };


export const retryRequest = (config) => async (dispatch) => {
  try {
    console.log('Retrying request...', config);
    const response = await apiInstance.request(config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
