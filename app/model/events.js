import AsyncStorage from '@react-native-community/async-storage';
import {getFavourites} from './favourite';

// TO BE MOVED IN AN "UTILS" SERVICE
const chainPromise = (array, action) => {
  let promise = Promise.resolve();
  array.forEach((element, index) => {
    promise = promise.then(() => action(element, index));
  });
  return promise;
};

const getEvents = async () => {
  try {
    const eventsJson = await AsyncStorage.getItem('events');
    if (eventsJson) {
      return JSON.parse(eventsJson);
    }
    return [];
  } catch (e) {
    return [];
  }
};

const getEvent = async eventId => {
  try {
    const eventsJson = await AsyncStorage.getItem('events');
    if (eventsJson) {
      let events = JSON.parse(eventsJson);
      events = events.filter(event => event.id === eventId)[0];
      return events;
    }
    return false;
  } catch (e) {
    console.log('getEvent::ERROR::', e);
    return false;
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
    await AsyncStorage.setItem('events', JSON.stringify(events));
  } catch (e) {
    console.log('postEvent::ERROR::', e);
    return false;
  }
};

const cleanEvents = async () => {
  await AsyncStorage.removeItem('events');
};

const getEventsMarkedAsFavourite = async () => {
  const output = [];
  const favourites = await getFavourites();
  await chainPromise(favourites, async eventId => {
    const event = await getEvent(eventId);
    output.push(event);
  });
  return output.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
};

const getRoomEvents = async roomName => {
  try {
    const eventsJson = await AsyncStorage.getItem('events');
    if (eventsJson) {
      let events = JSON.parse(eventsJson);
      events = events.filter(event => event.room === roomName);
      return events.sort((a, b) => {
        return new Date(a.start) - new Date(b.start);
      });
    }
    return false;
  } catch (e) {
    console.log('getRoomEvents::ERROR::', e);
    return false;
  }
};

module.exports = {
  getEvents,
  postEvent,
  cleanEvents,
  getTracks,
  getTrackEvents,
  getEventsMarkedAsFavourite,
  getEvent,
  getRoomEvents,
};
