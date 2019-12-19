import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class BottomMenu extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ position: 'absolute', alignItems: 'center', flexDirection: 'row', width: '100%', height: 65, bottom:0, backgroundColor: '#A92492' }}>
        <TouchableOpacity onPress={() => navigate('Tracks', {name: 'Tracks'})} style={{ flex: 1, alignItems: 'center' }}>
          <Icon name='users' color='#fff' type='font-awesome' />
          <Text style={{color:'#fff'}}>tracks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Favourites', {name: 'Favourites'})} style={{ flex: 1, alignItems: 'center' }}>
          <Icon name='star' color='#fff' type='font-awesome' />
          <Text style={{color:'#fff'}}>favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Settings', {name: 'Settings'})} style={{ flex: 1, alignItems: 'center' }}>
          <Icon name='cog' color='#fff' type='font-awesome' />
          <Text style={{color:'#fff'}}>settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default BottomMenu;
