
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const saveAuthToken = async (token: string) => {
    
  await  AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
 

    const token = await AsyncStorage.getItem(TOKEN_KEY);

    console.log("TOKEN RESULT:", token);

    return token;
  } catch (error) {
    console.log("🔥 ACTUAL ASYNC STORAGE ERROR 🔥");
    console.log(error);
    console.log(JSON.stringify(error, null, 2));

    throw error;
  }
};

export const clearAuthToken = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
};

export const saveRefreshToken = async (token: string) => {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearRefreshToken = async () => {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
};

  