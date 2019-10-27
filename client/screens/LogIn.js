import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,

} from 'react-native';
import InvisButton from '../components/InvisButton';

export default class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '', loading: false };
  }

  menu() {
    this.props.navigation.navigate('Menu');
  }

  logIn() {
    this.setState({
      loading: true
    })
    fetch("http://10.142.140.165/users/login?username=" + this.state.username, {
      method: "POST"
    }).then(x => {
      if (x.status === 200) {
        global.USER = this.state.username;
        this.props.navigation.navigate("Tabs")
      } else {
        this.setState({
          loading: false
        })
        ToastAndroid.show("Error logging in, check username.", ToastAndroid.SHORT)
      }
    }).catch(err => {
      this.setState({
        loading: false
      })
      ToastAndroid.show("Error logging in, try again in a few minutes.", ToastAndroid.SHORT)
    })
  }

  render() {
    return (
      <LinearGradient
        colors={['#B24592', '#F15F79']}
        style={styles.container}>
        {
          this.state.loading &&
          <ActivityIndicator size="large" color="#fff" />
        }
        {
          !this.state.loading &&
          <KeyboardAvoidingView behavior="padding" enabled>
            <Text style={styles.signUpText}>Log In</Text>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.loginTextInput}
                placeholder="Username"
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
              />
            </View>
            <View style={styles.logInButton}>
              <InvisButton
                onPress={this.logIn.bind(this)}
                title="Log In"
              />
            </View>
          </KeyboardAvoidingView>
        }

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249,249,249,1)",
    opacity: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  signUpText: {
    color: "white",
    fontSize: 70,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 50
  },
  error: {
    color: "red",
    fontSize: 70,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 50
  },
  nameText: {
    color: "rgb(1, 1, 1)",
    fontFamily: "roboto-regular",
  },
  logInButton: {
    width: 118,
    height: 56,
    marginTop: 30,
    alignSelf: "center"
  },
  textInputView: {
    width: 270,
    height: 56,
    marginTop: 30,
    alignSelf: "center"
  },
  loginTextInput: {
    height: 40,
    marginBottom: 10,
    borderWidth: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  }
});
