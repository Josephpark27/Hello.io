import React from 'react'
import {
    TouchableOpacity,
    View,
    Input,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      opacity: 1
    },
    text: {
      color: "#121212",
      fontSize: 70,
      fontFamily: "roboto-regular",
      alignSelf: "center"
    },
    button: {
      backgroundColor: "rgba(0,0,0,0)",
      color: "rgba(0,0,0,0)",
      alignSelf: "center",
      width: 250,
      height: 56,
      borderRadius: 24,
      borderWidth: 3,
      borderColor: 'white',
      justifyContent: 'center'
    },
    buttonContainer: {
      width: 250,
      alignSelf: "center",
    },
    buttonText: {
      fontSize:18, alignSelf: 'center', textAlignVertical: 'center', fontWeight: "100", color:'white'
    }
  });
  

export default function GameStep2(props) {
    return (
        <View>
            <Input placeholder="Answer"></Input>
            <Button>Submit</Button>
        </View>
    )
}

