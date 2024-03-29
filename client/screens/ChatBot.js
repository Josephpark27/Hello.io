import React from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: require('../assets/images/gangster.png') 
};
export default class ChatBot extends React.Component {

  state = {
    messages: [
      {
        _id: 1,
        text: `Hello! I have an important mission for you 🕵️.`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={{flex:1}} keyboardVerticalOffset={80}>
        <View style={{ flex: 1, backgroundColor: '#fff'}}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

ChatBot.navigationOptions = {
  title: '                            ChatBot🤖',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
