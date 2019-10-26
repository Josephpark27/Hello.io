import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient
        colors={['#B24592', '#F15F79']}
        style={styles.container}>
        <View>
          <Text style={styles.text}>Title</Text>
          <View style={styles.button}>
            <Button
              onPress={this.logIn.bind(this)}
              title="Log In"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={this.signUp.bind(this)}
              title="Sign Up"
            />
          </View>
        </View>
      </LinearGradient>
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
  button: {
    width: 218,
    height: 56,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 1,
    alignSelf: "center"
  }
});
