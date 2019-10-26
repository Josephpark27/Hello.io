import React from 'react'
import {
    TouchableOpacity,
    View,
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
  

export default function InvisButton(props) {
    return (
        <TouchableOpacity style={{ backgroundColor: "rgba(0,0,0,0)", padding: 20 }} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

