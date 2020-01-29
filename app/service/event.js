import {fetchGet} from './fetch';
import XMLParser from 'react-xml-parser';

import {getEvents, postEvent} from '../model/events';
import {saveAsFavourite, removeAsFavourite, getFavourites} from '../model/favourite';

// TO BE MOVED IN AN "UTILS" SERVICE
const chainPromise = (array, action) => {
  let promise = Promise.resolve();
  array.forEach((element, index) => {
    promise = promise.then(() => action(element, index));
  });
  return promise;
};

const downloadScheduleFromXML = async url => {
  try {
    // download from http
    const xmlSchedule = await fetchGet(url);

    // xml to object
    const schedule = new XMLParser().parseFromString(xmlSchedule);

    // export events from object
    const events = exportEventsFromXML(schedule);

    // push missing events to asyncStorage
    await pushEventsToAsyncStorage(events);
  } catch (e) {
    console.log('downloadScheduleFromXML::ERROR::', e);
  }
}

const exportEventsFromXML = schedule => {

  let rooms = [];
  const eventsOutput = [];
  const fieldsToBeExtracted = [
    'duration',
    'room',
    'slug',
    'title',
    'subtitle',
    'track',
    'type',
    'description',
    'abstract',
  ];

  const days = schedule.children.filter(item => item.name === 'day');

  days.forEach(day => {
    const date = day.attributes.date;
    rooms = day.children.filter(item => item.name === 'room');

    rooms.forEach(room => {
      const events = room.children;

      events.forEach(event => {
        const eventOutput = {};
        eventOutput.id = event.attributes.id;
        eventOutput.start = `${date} ${
          event.children.filter(item => item.name === 'start')[0].value
        }:00`;

        fieldsToBeExtracted.forEach(field => {
          eventOutput[field] = event.children.filter(
            item => item.name === field,
          )[0].value;
        });

        // extract persons
        const persons = event.children.filter(item => item.name === 'persons')[0].children;

        eventOutput['persons'] = [];

        persons.forEach(person => {
          eventOutput['persons'].push(person.value);
        });

        eventsOutput.push(eventOutput);
      });
    });
  });

  return eventsOutput;
}

const pushEventsToAsyncStorage = async events => {
  const eventsFromAS = await getEvents();
  await chainPromise(events, async event => {
    if (!checkIfExists(event, eventsFromAS)) {
      await postEvent(event.id, event);
    }
  });
};

const checkIfExists = (event, events) => {
  if (events === null) {
    return false;
  }
  if (events.filter(thisEvent => thisEvent.id === event.id).length > 0) {
    return true;
  }
  return false;
};

const addEventAsFavourite = event => {
  saveAsFavourite(event);
};

const removeEventAsFavourite = event => {
  removeAsFavourite(event);
};

module.exports = {
  downloadScheduleFromXML,
  addEventAsFavourite,
  getFavourites,
  removeEventAsFavourite,
};
