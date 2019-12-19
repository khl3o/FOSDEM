import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getSettings, postSettings} from '../model/settings';
import {cleanEvents, getEvents} from '../model/events';
import {downloadScheduleFromXML} from '../service/event';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  constructor(props) {
    super(props);
    this.state = {
      xmlURL: '',
      eventCount: 0,
      showSpinner: false,
    };
  }

  componentDidMount = async () => {
    // const postSettingsOutput = await postSettings('schedule_xml', 'https://fosdem.org/2020/schedule/xml');
    console.log('schedule_xml_url');
    let xmlUrl = await getSettings('schedule_xml_url');
    let events = await getEvents();
console.log(xmlUrl);
    if (!xmlUrl) {
      xmlUrl = 'https://fosdem.org/2020/schedule/xml';
    }

    this.setState({
      xmlURL: xmlUrl,
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
            <View style={{padding:25, paddingBottom:0}}>
              <Text>FOSDEM XML Schedule URL</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', fontSize:16, padding: 5, borderWidth: 1 }}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.xmlURL}
              />
            </View>
            <View style={{paddingTop:10, alignItems: 'center'}}>
              <Text>last sync: xxx</Text>
              <Text>{ this.state.eventCount } events found</Text>
            </View>
            {this.state.spinner ? (
              <ActivityIndicator size="large" />
            ) : (
              <View>
                <View style={{paddingTop:10, alignItems: 'center'}}>
                  <Button
                    title="REFRESH"
                    onPress={() => {this.refreshXml()}}
                  />
                </View>
                <View style={{paddingTop:50, alignItems: 'center'}}>
                  <Button
                    title="CLEAN"
                    onPress={() => {this.cleanEvents()}}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text>clean local storage (events + favourites)</Text>
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

export default Settings;
