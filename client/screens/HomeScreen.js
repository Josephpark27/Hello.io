import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InvisButton from '../components/InvisButton';

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
      <LinearGradient
        colors={['#B24592', '#F15F79']}
        style={styles.container}>
        <View>
          <Text style={styles.text}>Hello.</Text>
          <View style={styles.buttonContainer}>
            <InvisButton onPress={this.logIn.bind(this)} title="Log In"></InvisButton>
            <InvisButton  onPress={this.signUp.bind(this)} title="Sign Up"></InvisButton>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center'
  },
  text: {
    color: "white",
    fontSize: 70,
    fontFamily: "roboto-regular",
    fontWeight: "400",
    alignSelf: "center"
  },
  button: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "rgba(0,0,0,0)",
    borderWidth: 1,
    alignSelf: "center",
    width: 200,
    borderRadius: 24,
  },
  buttonContainer: {
    width: 218,
    marginTop: 175,
    alignSelf: "center",
    bottom:0,

  }
});
