import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
  Button,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import io from 'socket.io-client'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignContent: 'center',
    flex: 1,
  },
  text: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "roboto-regular",
    alignSelf: "center",
    paddingTop: 40
  },
  subText: {
    color: "#121212",
    fontSize: 18,
    fontFamily: "roboto-regular",
    alignSelf: "center",
    paddingTop: 20
  },
  horizontal: {
    flexDirection: 'column',
    padding: 10
  },
  numText: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 32
  }
});


export default class WaitingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Waiting for other players!</Text>
        <Text style={styles.subText}>{global.BOSS} has</Text>
        <Text style={styles.numText}>{this.props.numbers}</Text>
        <Text style={styles.subText}>players</Text>
      </View>
    )
  }
}