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
  if (!error.response) {
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

const serverErrorInterceptor = (error) => {
  if (error.response && error.response.status >= 500 && error.response.status < 600) {
    store.dispatch(showError({
      message: 'Error al conectar con el servidor',
      iconName: 'planet-outline',
      onRetry: () => {
        store.dispatch(retryRequest(error.config));
      },
    }));
  }
  return Promise.reject(error);
};

const setupErrorsInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(internetRequestInterceptor, error => Promise.reject(error));
  apiInstance.interceptors.response.use(response => response, internetResponseErrorInterceptor);
  apiInstance.interceptors.response.use(response => response, serverErrorInterceptor);
};

export { setupErrorsInterceptors };


export const retryRequest = (config) => async (dispatch) => {
  try {
    const response = await apiInstance.request(config);
    return response;
  } catch (error) {
    dispatch(showError({
      message: 'Error al reintentar la solicitud. Por favor, inténtelo de nuevo.',
      iconName: 'alert-circle-outline',
    }));
  }
};
