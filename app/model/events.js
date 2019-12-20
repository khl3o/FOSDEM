import AsyncStorage from '@react-native-community/async-storage';

const getEvents = async () => {
  try {
    const eventsJson = await AsyncStorage.getItem('events');
    if (eventsJson) {
      return JSON.parse(eventsJson);
    }
    return [];
  } catch (e) {
    console.log('getSettings::ERROR::', e);
    return [];
  }
};

const getTracks = async () => {
  const events = await getEvents();
  const tracks = [];
  events.forEach(event => {
    if (tracks.indexOf(event.track) === -1) {
      tracks.push(event.track);
    }
  });
  return tracks.sort();
};

const getTrackEvents = async track => {
  const events = await getEvents();
  const filteredEvents = events.filter(event => event.track === track);

  // sort output by date
  return filteredEvents.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
};

const postEvent = async (eventId, event) => {
  try {
    const eventsJson = await AsyncStorage.getItem('events');
    let events = [];
    if (eventsJson) {
      events = JSON.parse(eventsJson);
    }
    events.push(event);
    console.log('postEvent', eventId, event);
    await AsyncStorage.setItem('events', JSON.stringify(events));
  } catch (e) {
    console.log('postSettings::ERROR::', e);
    return false;
  }
};

const cleanEvents = async () => {
  await AsyncStorage.removeItem('events');
};

module.exports = {
  getEvents,
  postEvent,
  cleanEvents,
  getTracks,
  getTrackEvents,
};
