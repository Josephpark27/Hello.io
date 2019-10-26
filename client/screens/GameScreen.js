import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        enabled: false
    }
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
          {
              this.state.enabled &&
            <Text style={styles.text}>Game On</Text>
          }
          <Button onPress={(e) => this.setState({enabled: true})} title="Enable"></Button>
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
