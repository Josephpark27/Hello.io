import React from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
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


export default class GameStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question:"",
      answer:"",
    }
  }

  q = (e) => { 
    this.setState({ question: e.nativeEvent.text })
    this.props.updateParent(this.state.question, this.state.answer)
  }
  a = (e) => { 
    this.setState({ answer: e.nativeEvent.text })
    this.props.updateParent(this.state.question, this.state.answer)
  }


  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>What is a fun fact about yourself?</Text>
            <TextInput style={styles.textInput} onChange={this.q} numberOfLines={6} placeholder="Question"></TextInput>
            <TextInput style={styles.textInput} onChange={this.a} placeholder="Answer"></TextInput>
            <Button title="Submit" onPress={this.props.onSubmit.bind(this)}></Button>
        </View>
    )
  }
}

