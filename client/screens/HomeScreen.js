import React, { Component } from 'react';
import { LinearGradient } from 'expo'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  logIn() {
    this.props.navigation.navigate('LogIn');
  }

  signUp() {
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Title</Text>
        <View style={styles.logInButton}>
          <Button
            onPress={this.logIn.bind(this)}
            title="Log In"
          />
        </View>
        <View style={styles.signUpButton}>
          <Button
            onPress={this.signUp.bind(this)}
            title="Sign Up"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1
  },
  text: {
    color: "#121212",
    fontSize: 70,
    fontFamily: "roboto-regular",
    marginTop: 142,
    alignSelf: "center"
  },
  logInButton: {
    width: 118,
    height: 56,
    marginTop: 166,
    alignSelf: "center"
  },
  signUpButton: {
    width: 118,
    height: 56,
    marginTop: 30,
    alignSelf: "center"
  }
});
