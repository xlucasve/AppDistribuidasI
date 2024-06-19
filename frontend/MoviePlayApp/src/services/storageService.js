// src/services/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const saveTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (e) {
    console.error('Failed to save tokens to AsyncStorage', e);
  }
};

const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  } catch (e) {
    console.error('Failed to get tokens from AsyncStorage', e);
    return { accessToken: null, refreshToken: null };
  }
};

const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove tokens from AsyncStorage', e);
  }
};

const saveUserId = async (userId) => {
    try {
        await AsyncStorage.setItem('userId', String(userId));
    } catch (e) {
        console.error('Failed to save userId to AsyncStorage', e);
    }
    };

const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        return userId;
    } catch (e) {
        console.error('Failed to get userId from AsyncStorage', e);
        return null;
    }
}




export { saveTokens, getTokens, removeTokens, saveUserId, getUserId };
