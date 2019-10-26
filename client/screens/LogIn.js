import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import InvisButton from '../components/InvisButton';

export default class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  menu() {
    this.props.navigation.navigate('Menu');
  }

  logIn() {
    username = this.state.text
    fetch("http://35.184.227.201/users/login?username=" + username, {
      method: "POST"
    }).then(x => {
      console.log(x);
      this.props.navigation.navigate("Tabs")
    }).catch(err => {
      alert("Error")
      console.log(err);
    })
  }

  render() {
    return (
      <LinearGradient
        colors={['#B24592', '#F15F79']}
        style={styles.container}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Text style={styles.signUpText}>Log In</Text>
          <View style={styles.textInputView}>
            <TextInput
              style={{ height: 40, marginBottom: 10, borderWidth:0, textAlign:'center', color:'white', fontSize:18 }}
              placeholder="Username"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
          </View>
          <View style={styles.logInButton}>
            <InvisButton
              onPress={this.logIn.bind(this)}
              title="Log In"
            />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249,249,249,1)",
    opacity: 1
  },
  signUpText: {
    color: "white",
    fontSize: 70,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    alignSelf: "center",
    marginTop:50
  },
  nameText: {
    color: "rgb(1, 1, 1)",
    fontFamily: "roboto-regular",
  },
  logInButton: {
    width: 118,
    height: 56,
    marginTop: 166,
    alignSelf: "center"
  },
  textInputView: {
    width: 270,
    height: 56,
    marginTop: 166,
    alignSelf: "center"
  }
});
