import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

class BottomMenu extends React.Component {
  render() {
    const {push} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => push('Tracks', {name: 'Tracks'})} style={styles.iconView}>
          <Icon name='users' color='#fff' type='font-awesome' />
          <Text style={styles.iconTitle}>tracks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => push('Favourites', {name: 'Favourites'})} style={styles.iconView}>
          <Icon name='star' color='#fff' type='font-awesome' />
          <Text style={styles.iconTitle}>favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => push('Settings', {name: 'Settings'})} style={styles.iconView}>
          <Icon name='cog' color='#fff' type='font-awesome' />
          <Text style={styles.iconTitle}>settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 65,
    bottom: 0,
    backgroundColor: '#A92492',
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
  },
  iconTitle: {
    color: '#fff',
  },
});

export default BottomMenu;
