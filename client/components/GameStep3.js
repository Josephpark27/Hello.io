import React from 'react'
import {
    TouchableOpacity,
    View,
    Button,
    Dimensions,
    Text,
    StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1
  },
  text: {
    color: "#121212",
    fontSize: 24,
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
  textInput: {
    width: Dimensions.get('window').width - 50,
    alignSelf: "center",
    marginTop:10,
    marginBottom:10,
    padding:5,
    borderColor:"rgba(0,0,0,0.3)",
    borderWidth:1
  },
  buttonText: {
    fontSize:18, alignSelf: 'center', textAlignVertical: 'center', fontWeight: "100", color:'white'
  }
});
3
  

export default function GameStep3(props) {
    return (
        <View>
          <Text>{props.result}</Text>
        </View>
    )
}

