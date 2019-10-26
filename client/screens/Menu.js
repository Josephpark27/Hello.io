import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToolbarAndroid
} from 'react-native';

export default class Menu extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid 
          title="Title"
          actions={[{title: 'Settings', icon: require('../assets/images/icon_settings.png'), show: 'always'}]}
          onActionSelected={this.onActionSelected} />
        <Text style={styles.nameText}>Hello World</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249,249,249,1)",
    opacity: 1
  },
  nameText: {
    color: "rgb(1, 1, 1)",
    fontFamily: "roboto-regular",
  }
});
 