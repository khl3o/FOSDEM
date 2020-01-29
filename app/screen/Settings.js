import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getSettings, postSettings} from '../model/settings';
import {cleanEvents, getEvents} from '../model/events';
import {downloadScheduleFromXML} from '../service/event';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      xmlURL: 'https://',
      eventCount: 0,
      showSpinner: false,
    };
  }

  componentDidMount = async () => {
    let xmlURL = await getSettings('schedule_xml_url');
    let events = await getEvents();
    if (!xmlURL) {
      xmlURL = 'https://fosdem.org/2020/schedule/xml';
    }
    this.setState({
      xmlURL: xmlURL,
      eventCount: events.length,
    });
  };

  onChangeText = text => {
    this.setState({
      xmlURL: text,
    });
  };

  refreshXml = async () => {
    this.setState({
      spinner: true,
    });

    // save url in async storage
    await postSettings('schedule_xml_url', this.state.xmlURL);

    // download xml and refresh async storage
    await downloadScheduleFromXML(this.state.xmlURL);

    let events = await getEvents();

    this.setState({
      eventCount: events.length,
      spinner: false,
    });
  };

  cleanEvents = async () => {
    await cleanEvents();
    this.setState({
      eventCount: 0,
    });
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.inputForm}>
              <Text>FOSDEM Pentabarf XML URL</Text>
              <TextInput
                style={styles.xmlInputField}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.xmlURL}
              />
            </View>
            <View style={styles.eventCountView}>
              <Text style={styles.eventCountText}>
                {this.state.eventCount} events found
              </Text>
            </View>
            {this.state.spinner ? (
              <ActivityIndicator size="large" />
            ) : (
              <View>
                <View style={styles.refreshButtonContainer}>
                  <Button
                    title="REFRESH"
                    onPress={() => {this.refreshXml()}}
                  />
                </View>
                <View style={styles.cleanEventsContainer}>
                  <Button
                    title="CLEAN EVENTS"
                    onPress={() => {this.cleanEvents()}}
                  />
                  <View style={styles.cleanDetails}>
                    <Text>clean events from local storage</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

const styles = StyleSheet.create({
  inputForm: {
    padding: 25,
    paddingBottom: 0,
  },
  xmlInputField: {
    height: 40,
    borderColor: 'gray',
    color: '#000',
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
  },
  eventCountView: {
    paddingTop: 15,
    alignItems: 'center',
  },
  eventCountText: {
    fontSize: 18,
  },
  refreshButtonContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  cleanEventsContainer: {
    paddingTop: 50,
    alignItems: 'center',
  },
  cleanDetails: {
    alignItems: 'center',
  },
});

export default Settings;
