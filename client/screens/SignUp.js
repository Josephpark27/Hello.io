import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  logIn() {
      this.props.navigation.navigate('Menu');
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.signUpText}>Sign Up</Text>
          <View style={styles.textInputView}>
            <Text style={styles.nameText}>Username</Text>
            <TextInput
              style={{height: 40, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgb(1,1,1)"}}
              placeholder=""
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
          <View style={styles.logInButton}>
            <Button
              onPress={this.logIn.bind(this)}
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
