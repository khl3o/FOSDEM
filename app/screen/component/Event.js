import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {XmlEntities} from 'html-entities';
import { Icon } from 'react-native-elements';
import {
  addEventAsFavourite,
  removeEventAsFavourite
} from '../../service/event';
import moment from 'moment';

class Event extends React.Component {
  constructor(props) {
    super(props);
    const markedAsFavourite = this.checkIfMarkedAsFavourite();
    this.state = {
      markedAsFavourite: markedAsFavourite,
    };
  }

  formatDuration = duration => {
    const output = duration.split(':');
    const hours = parseInt(output[0], 10);
    const minutes = parseInt(output[1], 10);
    return hours * 60 + minutes;
  };

  addAsFavourite = event => {
    addEventAsFavourite(event);
    this.setState({
      markedAsFavourite: true,
    });
  };

  removeAsFavourite = event => {
    removeEventAsFavourite(event);
    this.setState({
      markedAsFavourite: false,
    });
  };

  checkIfMarkedAsFavourite = () => {
    const favourites = this.props.favourites;
    const event = this.props.item;
    if (
      favourites.filter(favouriteEventId => favouriteEventId === event.id)
        .length === 1
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <View style={{margin:5, marginTop: 50, borderColor: '#DDD', borderWidth: 2, padding:10, marginBottom:15, backgroundColor:'#F3F3F3'}}>

        <TouchableOpacity onPress={() => {}}>
          <Text style={{ fontSize:21, color:'#444', lineHeight:21, fontWeight: 'bold' }}>{XmlEntities.decode(this.props.item.title)}</Text>

          { this.props.item.persons.length > 0 ? <Text style={{fontSize: 16, color:'#333'}}>by { this.props.item.persons.join(', ') }</Text> : <View/> }

          <View style={{backgroundColor:'#A92492', alignSelf: 'flex-start', borderRadius:5, marginTop:10}}>
            <Text style={{fontSize: 14, fontWeight:'bold', color:'#fff', padding:5}}>{ this.props.item.room }</Text>
          </View>

          <View>
            <Text style={{color:'#666', marginTop:10}}>{ moment(this.props.item.start).format('YYYY-MM-DD') }</Text>
          </View>
        </TouchableOpacity>

        <View style={{position:'absolute', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#F3F3F3', borderColor:'#DDD', borderWidth: 2, borderBottomWidth: 0, right:5, padding:10, marginTop: -41}}>
          <Text style={{fontSize:16, color: '#888', fontWeight:'bold'}}>{ moment(this.props.item.start).format('HH:mm') } - {this.formatDuration(this.props.item.duration)} min</Text>
        </View>

        { this.state.markedAsFavourite ?
          <TouchableOpacity onPress={() => this.removeAsFavourite(this.props.item)}>
            <View style={{position:'absolute', padding:10, right:0, bottom: 0}}>
              <Icon name='star' color='#F5D523' type='font-awesome' />
            </View>
          </TouchableOpacity>
        : <TouchableOpacity onPress={() => this.addAsFavourite(this.props.item)}>
        <View style={{position:'absolute', padding:10, right:0, bottom: 0}}>
          <Icon name='star' color='#CCC' type='font-awesome' />
        </View>
      </TouchableOpacity> }


      </View>
    );
  }
};

export default Event;
