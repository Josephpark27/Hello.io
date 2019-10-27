import React from 'react'
import {
  View,
  Button,
  Dimensions,
  TextInput,
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
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 1
  },
  buttonText: {
    fontSize: 18, alignSelf: 'center', textAlignVertical: 'center', fontWeight: "100", color: 'white'
  }
});



export default class GameStep2 extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Answer"></TextInput>
        <Button title="Submit" onPress={this.props.onSubmit.bind(this)}></Button>
      </View>
    )
  }
}

