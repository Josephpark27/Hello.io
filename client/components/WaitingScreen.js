import React from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    ActivityIndicator
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
      paddingTop:40
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
  

export default function WaitingScreen(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Waiting for other other players</Text>
        <View style={[styles.waitingContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    )
}