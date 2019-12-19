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

class Track extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const track = navigation.getParam('name');
    this.state = {
      track: track,
    };
  }

  componentDidMount = async () => {
    const events = await getTrackEvents(this.state.track);
    this.setState({
      events: events,
    });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{marginTop:15, marginBottom:65}}>
            <View style={{alignItems: 'center', textAlign:'center'}}>
              <Text style={{textAlign: 'center', fontSize:18, fontWeight:'bold'}}>{this.state.track}</Text>
              <FlatList
                data={this.state.events}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Event item={item} />}
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
