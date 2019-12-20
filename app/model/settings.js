import AsyncStorage from '@react-native-community/async-storage';

const getSettings = async settingKey => {
  try {
    const settingsJson = await AsyncStorage.getItem('settings');
    if (!settingsJson) {
      return false;
    }
    const settings = JSON.parse(settingsJson);
    if (settings[settingKey]) {
      return settings[settingKey];
    }
    return false;
  } catch (e) {
    console.log('getSettings::ERROR::', e);
    return false;
  }
};

const postSettings = async (settingKey, settingValue) => {
  try {
    const settingsJson = await AsyncStorage.getItem('settings');
    let settings = {};
    if (settingsJson) {
      settings = JSON.parse(settingsJson);
    }
    settings[settingKey] = settingValue;
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
  } catch (e) {
    console.log('postSettings::ERROR::', e);
    return false;
  }
};

module.exports = {
  getSettings,
  postSettings,
};
