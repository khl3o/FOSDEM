import React from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getRoomEvents} from '../model/events';
import Event from './component/Event';
import Map from './component/Map';
import {getFavourites} from '../service/event';

class Room extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions, props }) => {
    return {
      title: navigation.getParam('room'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      favourites: [],
    };
  }

  componentDidMount = async () => {
    const roomName = this.props.navigation.getParam('room');
    const events = await getRoomEvents(roomName);
    const favourites = await getFavourites();
    this.setState({
      events: events,
      favourites: favourites,
    });
  };

  render() {
    return (
      <>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.roomName}>
            {this.props.navigation.getParam('room')}
          </Text>
          <View style={styles.map}>
            <Map room={this.props.navigation.getParam('room')} />
          </View>
          <View style={styles.list}>
            <FlatList
              data={this.state.events}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Event item={item} navigation={this.props.navigation} favourites={this.state.favourites} />}
            />
          </View>
        </ScrollView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 15,
    marginBottom: 65,
  },
  roomName: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 35,
  },
  map: {
    marginBottom: 25,
  },
  list: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
});

export default Room;
