import * as Keychain from 'react-native-keychain';

export const getAccessToken = async () => {
  const response = await Keychain.getGenericPassword();
  return response.username;
};

export const getRefreshToken = async () => {
  const response = await Keychain.getGenericPassword();
  return response.password;
};

export const getUserCredentials = async () => {
  const response = await Keychain.getGenericPassword();
  return response;
};

const userCredentials = () => {};

export default userCredentials;
