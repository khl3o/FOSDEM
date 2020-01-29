import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import BottomMenu from './component/BottomMenu';
import {getTracks} from '../model/events';

class Tracks extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions, props }) => {
    return {
      title: 'Tracks',
      headerLeft: null,
    };
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
    const {push} = this.props.navigation;
    return (
      <>
        <SafeAreaView>
          <ScrollView style={styles.scrollView} contentInsetAdjustmentBehavior="automatic">
            <View>
              { this.state.tracks.length > 0 ?
                <FlatList
                  data={this.state.tracks}
                  keyExtractor={item => item}
                  renderItem={({item}) =>
                    <TouchableOpacity onPress={() => push('Track', {name: item})}>
                      <View style={styles.track}>
                        <Text style={styles.trackText}>{item}</Text>
                      </View>
                    </TouchableOpacity>}
                />
              : <View style={styles.empty}>
                  <Text style={styles.emptyTitlte}>NO EVENT FOUND IN YOUR LOCAL STORAGE</Text>
                  <Text style={styles.emptySubTitle}>PLEASE USE SETTINGS TAB TO DOWNLOAD THE EVENTS</Text>
                </View>}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop:15, 
    marginBottom:65
  },
  track: {
    margin:10,
    padding:5,
    marginBottom:15,
    borderBottomWidth: 2,
    borderBottomColor: '#CCC'
  },
  trackText: {
    fontSize: 22,
  },
  empty: {
    padding:10
  },
  emptyTitle: {
    fontSize: 26,
    textAlign:'center',
    fontWeight:'bold'
  },
  emptySubTitle: {
    fontSize: 24,
    marginTop: 25,
    textAlign:'center',
    fontWeight:'bold'
  },
});

export default Tracks;
