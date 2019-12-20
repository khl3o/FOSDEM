import AsyncStorage from '@react-native-community/async-storage';

const getFavourites = async () => {
  try {
    let favouritesJson = await AsyncStorage.getItem('favourites');
    if (!favouritesJson) {
      return [];
    }
    return JSON.parse(favouritesJson);
  } catch (e) {
    console.log('getSettings::ERROR::', e);
    return false;
  }
};

const saveAsFavourite = async event => {
  try {
    let favouritesJson = await AsyncStorage.getItem('favourites');
    if (!favouritesJson) {
      favouritesJson = '[]';
    }
    const favourites = JSON.parse(favouritesJson);
    if (favourites.filter(eventId => eventId === event.id).length === 0) {
      favourites.push(event.id);
      await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log('getSettings::ERROR::', e);
    return false;
  }
};

const removeAsFavourite = async event => {
  try {
    let favouritesJson = await AsyncStorage.getItem('favourites');
    if (!favouritesJson) {
      return false;
    }
    const favourites = JSON.parse(favouritesJson);
    const index = favourites.indexOf(event.id);
    if (index > -1) {
      favourites.splice(index, 1);
    }
    await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
    return true;
  } catch (e) {
    console.log('getSettings::ERROR::', e);
    return false;
  }
};

module.exports = {
  getFavourites,
  saveAsFavourite,
  removeAsFavourite,
};
