// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import MapView, { Marker, Overlay } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {


  constructor(props) {
    super(props);
    this.state = {
      latitude: 20.964805,
      longitude: 105.826726,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      isEdit: true
    }
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  render() {
    const { region } = this.props;
    console.log(region);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
          onRegionChangeComplete={(region) => {
            console.log(" ===============================================> ", region);
            this.setState({
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            })
          }}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        >
          <Marker
            coordinate={{ latitude: 20.964805, longitude: 105.826726 }}
            title="my maker"
            description="my description"
          />

        </MapView>

        <View style={{ position: 'absolute', top: 0, padding: 20, width: '100%' }}

        >

          {/* <TextInput
            placeholder="Search here"
            placeholderTextColor='#333333'
            style={{
              fontSize: 16,
              color: 'black',
              borderColor: 'black',
              borderRadius: 3,
              borderWidth: StyleSheet.hairlineWidth,
              backgroundColor: 'white'
            }}
            underlineColorAndroid='transparent'

            editable={false}

          /> */}
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              borderColor: 'black',
              borderRadius: 3,
              borderWidth: StyleSheet.hairlineWidth,
              backgroundColor: 'white',
              padding: 15
            }}
            onPress={() => {
              RNGooglePlaces.openAutocompleteModal().then(place => {
                console.log("====================================> ", place);
                this.setState({
                  latitude: place.latitude,
                  longitude: place.longitude,
                })
              }).catch(error => {
                console.log("====================================> ", error);
              })
            }}>
            Search here
          </Text>

        </View>

        <Image
          style={{ width: 48, height: 48, position: 'absolute' }}
          source={require('./assets/location.png')}
        />

        <View style={{ position: 'absolute', bottom: 0, left: 0, padding: 20 }}>
          <Text style={{ color: 'black', fontSize: 18 }}>
            latitude: {this.state.latitude}
          </Text>
          <Text style={{ color: 'black', fontSize: 18 }}>
            longitude: {this.state.longitude}
          </Text>
          <Text style={{ color: 'black', fontSize: 18 }}>
            latitudeDelta: {this.state.latitudeDelta}
          </Text>
          <Text style={{ color: 'black', fontSize: 18 }}>
            longitudeDelta: {this.state.longitudeDelta}
          </Text>
        </View>



      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
});


