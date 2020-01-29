import React from 'react';
import {
  ScrollView,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getEventsMarkedAsFavourite} from '../model/events';
import Event from './component/Event';
import {getFavourites} from '../service/event';

class Favourites extends React.Component {
  static navigationOptions = {
    title: 'Favourites',
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      favourites: [],
    };
  }

  componentDidMount = async () => {
    const events = await getEventsMarkedAsFavourite();
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
          <View style={styles.body}>
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
  body: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
});

export default Favourites;
