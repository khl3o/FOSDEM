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
    console.log('constructor');
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount = async () => {
    console.log('componentDidMount AAA');
    const tracks = await getTracks();
    this.setState({
      tracks: tracks,
    });
  };

  UNSAFE_componentWillReceiveProps = async nextProps => {
    console.log('componentWillReceiveProps AAA');
    const tracks = await getTracks();
    this.setState({
      tracks: tracks,
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <SafeAreaView>
          <ScrollView style={{marginTop:15, marginBottom:65}} contentInsetAdjustmentBehavior="automatic">
            <View>
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
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

export default Tracks;
