import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getTracks} from '../model/events';

class Tracks extends React.Component {
  static navigationOptions = {
    title: 'Tracks',
  };

  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount = async () => {
    const tracks = await getTracks();
    this.setState({
      tracks: tracks,
    });
  };

  UNSAFE_componentWillReceiveProps = async nextProps => {
    const tracks = await getTracks();
    this.setState({
      tracks: tracks,
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <SafeAreaView>
          <ScrollView style={{marginTop:15, marginBottom:65}} contentInsetAdjustmentBehavior="automatic">
            <View>
              { this.state.tracks.length > 0 ?
                <FlatList
                  data={this.state.tracks}
                  keyExtractor={item => item}
                  renderItem={({item}) =>
                    <TouchableOpacity onPress={() => navigate('Track', {name: item})}>
                      <View style={{margin:10, padding:5, marginBottom:15, borderBottomWidth: 2, borderBottomColor: '#CCC'}}>
                        <Text style={{ fontSize:22 }}>{item}</Text>
                      </View>
                    </TouchableOpacity>}
                />
              : <View style={{padding:10}}>
                  <Text style={{fontSize: 26, textAlign:'center', fontWeight:'bold'}}>NO EVENT FOUND IN YOUR LOCAL STORAGE</Text>
                  <Text style={{fontSize: 24, marginTop: 25, textAlign:'center', fontWeight:'bold'}}>PLEASE USE SETTINGS TAB TO DOWNLOAD THE EVENTS</Text>
                </View>}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

export default Tracks;
