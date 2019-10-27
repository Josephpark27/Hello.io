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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "roboto-regular",
    alignSelf: "center",
    paddingTop: 40
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});


export default class WaitingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    }

    global.SOCKET.on('clients', (data) => {
      ToastAndroid.show("New User!", ToastAndroid.SHORT);
      this.setState({
        clients: data
      })
    });

    global.SOCKET.on('join', (data) => {
      ToastAndroid.show("New User!", ToastAndroid.SHORT);
      this.setState({
        clients: this.state.clients + [data.username]
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Waiting for other other players</Text>
        <View style={[styles.waitingContainer, styles.horizontal]}>
          {
            this.state.clients.length === 0 &&
            <ActivityIndicator size="large" color="#0000ff" />
          }
          {
            this.state.clients.map(client => {
              return(
                <Text key={client}>{client}</Text>
              )
            })
          }
        </View>
      </View>
    )
  }
}