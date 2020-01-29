import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import {XmlEntities} from 'html-entities';
import moment from 'moment';
import HTML from 'react-native-render-html';
import BottomMenu from './component/BottomMenu';
import Map from './component/Map';

class Event extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const event = navigation.getParam('event');
    this.state = {
      event: event,
    };
  }

  formatDuration = duration => {
    const output = duration.split(':');
    const hours = parseInt(output[0], 10);
    const minutes = parseInt(output[1], 10);
    return hours * 60 + minutes;
  };

  render() {
    return (
      <>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>
            {XmlEntities.decode(this.state.event.title)}
          </Text>

          {(this.state.event.persons && this.state.event.persons.length > 0)
            ? <Text style={styles.persons}>by { this.state.event.persons.join(', ') }</Text>
            : <View/>}

          <View style={styles.body}>

            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {moment(this.state.event.start).format('dddd')}
              </Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {moment(this.state.event.start).format('HH:mm')}
              </Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {this.formatDuration(this.state.event.duration)} min
              </Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>{this.state.event.room}</Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>{this.state.event.track}</Text>
            </View>

          </View>

          { (this.state.event.subtitle !== '')
            ? <View style={{alignSelf: 'flex-start', fontSize:20, marginTop:10}}>
              <HTML baseFontStyle={{fontSize: 18, fontWeight: 'bold'}} html={XmlEntities.decode(this.state.event.subtitle)} />
            </View>
            : <View/> }

          { (this.state.event.abstract !== '')
            ? <View style={{alignSelf: 'flex-start', fontSize:20, marginTop:10}}>
              <HTML baseFontStyle={{fontSize: 18}} html={XmlEntities.decode(this.state.event.abstract)} />
            </View>
            : <View/> }

          { (this.state.event.description !== '')
            ? <View style={{alignSelf: 'flex-start', fontSize:18, marginTop:10}}>
              <HTML baseFontStyle={{fontSize: 18}} html={XmlEntities.decode(this.state.event.description)} />
            </View>
            : <View/> }

          <Map room={this.state.event.room} />
        </ScrollView>
        <BottomMenu navigation={this.props.navigation} />
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    margin: 15,
    marginBottom: 65,
  },
  title: {
    fontSize: 24,
    color: '#333',
    lineHeight: 26,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  persons: {
    fontSize: 16,
    color: '#333',
  },
  body: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#CCC',
    borderRadius: 5,
    margin: 5,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    padding: 5,
  },
});

export default Event;
