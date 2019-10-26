import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  menu() {
    this.props.navigation.navigate('Menu');
  }

  logIn() {
    username = this.state.text
    fetch("http://35.184.227.201/users/login?username="+username,{
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.signUpText}>Log In</Text>
        <View style={styles.textInputView}>
          <Text style={styles.nameText}>Username</Text>
          <TextInput
            style={{ height: 40, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgb(1,1,1)" }}
            placeholder=""
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={styles.logInButton}>
          <Button
            onPress={this.logIn.bind(this)}
            title="Log In"
          />
        </View>
      </KeyboardAvoidingView>
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
    color: "#121212",
    fontSize: 55,
    fontFamily: "roboto-regular",
    marginTop: 130,
    alignSelf: "center"
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
