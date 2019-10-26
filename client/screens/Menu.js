import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToolbarAndroid
} from 'react-native';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return {
      <ToolbarAndroid
        logo={require('./app_logo.png')}
        title="AwesomeApp"
        actions={[{title: 'Settings', icon: require('./icon_settings.png'), show: 'always'}]}
        onActionSelected={this.onActionSelected} />
    }
  }

}