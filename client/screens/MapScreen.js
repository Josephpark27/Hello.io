import React, { Component } from 'react';
import { LinearGradient } from 'expo'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      errorMessage: null,
      bosses: [],
      visible: [],
      currentBossIndex: 0,
      countdown: Date.now()
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    fetch("http://10.142.140.165/bosses").then(res =>
      res.json()
    ).then(data => {
      this.setState({
        bosses: data,
        countdown: this.state.countdown + data[this.state.currentBossIndex].delay
      });
    }).catch(err => {
      console.error(err);
      alert("Error")
    })
  }



  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    points = this.state.bosses.map(x => {
      return {latitide: x.location.coordinates[0], longitude: x.location.coordinates[1]}
    })
    region = this.getRegionForCoordinates([location.coords])
    this.setState({ location: region });
  };

  logIn() {
    this.props.navigation.navigate('LogIn');
  }

  signUp() {
    this.props.navigation.navigate('SignUp');
  }

  getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
  
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
  
    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };
  }
  

  startGame(name) {
    console.log(name);
    global.BOSS = name
    this.props.navigation.navigate("GameStack", { enabled: true})
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
          region={this.state.location}>
          <Marker coordinate={this.state.location} onPress={this.startGame.bind(this)}>
            <Image source={require('../assets/images/spyIcon.png')} style={{ height: 35, width: 35 }} />
          </Marker>
          {
            this.state.bosses.map(boss => {
              return (
                <Marker key={boss.name} coordinate={{latitude: boss.location.coordinates[0], longitude: boss.location.coordinates[1]}} onPress={this.startGame.bind(this, boss.name)}>
                  <Image source={require('../assets/images/alien.png')} style={{ height: 35, width: 35 }} />
                </Marker>)
            })
          }
        </MapView>
        <View>
          <Text>
            {this.state.countdown}
          </Text>
        </View>
      </View>
    );
  }
}