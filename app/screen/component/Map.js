import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const imagePath = '../../asset/maps';

const assets = {
  'AW1.105': require(`${imagePath}/AW1.125.png`),
  'AW1.117': require(`${imagePath}/AW1.117.png`),
  'AW1.120': require(`${imagePath}/AW1.120.png`),
  'AW1.121': require(`${imagePath}/AW1.121.png`),
  'AW1.124': require(`${imagePath}/AW1.124.png`),
  'AW1.125': require(`${imagePath}/AW1.125.png`),
  'AW1.126': require(`${imagePath}/AW1.126.png`),
  'Chavanne': require(`${imagePath}/Chavanne.png`),
  'Ferrer': require(`${imagePath}/Ferrer.png`),
  'H.1301 (Cornil)': require(`${imagePath}/H.1301 (Cornil).png`),
  'H.1301': require(`${imagePath}/H.1301.png`),
  'H.1302 (Depage)': require(`${imagePath}/H.1302 (Depage).png`),
  'H.1302 (Depagne)': require(`${imagePath}/H.1302 (Depagne).png`),
  'H.1302': require(`${imagePath}/H.1302.png`),
  'H.1308 (Rolin)': require(`${imagePath}/H.1308 (Rolin).png`),
  'H.1308': require(`${imagePath}/H.1308.png`),
  'H.1309 (Van Rijn)': require(`${imagePath}/H.1309 (Van Rijn).png`),
  'H.1309': require(`${imagePath}/H.1309.png`),
  'H.2213': require(`${imagePath}/H.2213.png`),
  'H.2214': require(`${imagePath}/H.2214.png`),
  'H.2215 (Ferrer)': require(`${imagePath}/H.2215 (Ferrer).png`),
  'H.3327': require(`${imagePath}/H.3327.png`),
  'Janson': require(`${imagePath}/Janson.png`),
  'K.1.105 (La Fontaine)': require(`${imagePath}/K.1.105 (La Fontaine).png`),
  'K.1.105': require(`${imagePath}/K.1.105.png`),
  'K.3.201': require(`${imagePath}/K.3.201.png`),
  'K.3.401': require(`${imagePath}/K.3.401.png`),
  'K.3.601': require(`${imagePath}/K.3.601.png`),
  'K.4.201': require(`${imagePath}/K.4.201.png`),
  'K.4.401': require(`${imagePath}/K.4.401.png`),
  'K.4.601': require(`${imagePath}/K.4.601.png`),
  'Lameere': require(`${imagePath}/Lameere.png`),
  'UA2.114 (Baudoux)': require(`${imagePath}/UA2.114 (Baudoux).png`),
  'UA2.114': require(`${imagePath}/UA2.114.png`),
  'UB2.147': require(`${imagePath}/UB2.147.png`),
  'UB2.252A (Lameere)': require(`${imagePath}/UB2.252A (Lameere).png`),
  'UD2.120 (Chavanne)': require(`${imagePath}/UD2.120 (Chavanne).png`),
  'UD2.218A': require(`${imagePath}/UD2.218A.png`),
  'ulb_solbosch': require(`${imagePath}/ulb_solbosch.png`),
};

class Map extends React.Component {
  render() {
    const room = assets[this.props.room];
    const global = assets['ulb_solbosch'];
    return (
      <>
        <View style={styles.room}>
          <Image resizeMode={'contain'} style={{width: '100%'}} source={room} />
        </View>
        <View style={styles.room}>
          <Image resizeMode={'contain'} style={{width: '100%'}} source={global} />
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  room: {
    flexDirection: 'row',
    marginTop: 25,
  },
});

export default Map;
