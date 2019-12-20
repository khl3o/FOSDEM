import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getTrackEvents} from '../model/events';
import Event from './component/Event';
import {getFavourites} from '../service/event';

class Track extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const track = navigation.getParam('name');
    this.state = {
      track: track,
      events: [],
      favourites: [],
    };
  }

  componentDidMount = async () => {
    const events = await getTrackEvents(this.state.track);
    const favourites = await getFavourites();
    console.log('getFavourites', favourites);
    this.setState({
      events: events,
      favourites: favourites,
    });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            style={{marginTop:15, marginBottom:65}}>
            <View style={{alignItems: 'center', paddingLeft:10, paddingRight:10, textAlign:'center'}}>
              <Text style={{textAlign: 'center', fontSize:28, fontWeight:'bold', lineHeight: 28, marginBottom: 35}}>{this.state.track}</Text>
              <FlatList
                data={this.state.events}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Event item={item} favourites={this.state.favourites} />}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

export default Track;
