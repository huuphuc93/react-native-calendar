import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Error saving data:', e);
  }
}

export const getData = async (key) => {
  try {
    const value = await await AsyncStorage.getItem(key);

    if(value !== null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch(e) {
    console.log('Error retrieving data:', e);
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error remove data:', e);
  }
}
