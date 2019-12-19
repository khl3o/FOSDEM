import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class Event extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{margin:10, padding:5, marginBottom:15, borderBottomWidth: 2, borderBottomColor: '#CCC'}}>
          <Text style={{ fontSize:22 }}>{this.props.item.title}</Text>
          <View><Text>AAAAAHHHH{this.props.item.start}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default Event;
