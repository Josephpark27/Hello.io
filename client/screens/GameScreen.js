import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Dimensions,
} from 'react-native';
import GameStep1 from '../components/GameStep1';
import GameStep2 from '../components/GameStep2';
import GameStep3 from '../components/GameStep3';

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        enabled = this.props.navigation.getParam("enabled")
        this.state = {
            enabled: true,
            step: 1
        }
    }

    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }

    disable() {
        this.setState({
            enabled: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.gameStepContainer}>
                    {
                        this.state.step === 1 && this.state.enabled &&
                        <GameStep1 onSubmit={this.nextStep.bind(this)}></GameStep1>
                    }
                    {
                        this.state.step === 2 && this.state.enabled &&
                        <GameStep2 onSubmit={this.nextStep.bind(this)}></GameStep2>

                    }
                    {
                        this.state.step === 3 && this.state.enabled &&
                        <GameStep3 onSubmit={this.disable.bind(this)}></GameStep3>
                    }
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
    textBox: {
        color: "#121212",
        fontSize: 14,
        fontFamily: "roboto-regular",
        marginTop: 142,
        borderColor: "#000",
        borderWidth: 1,
        padding: 5,
        width: Dimensions.get('window').width - 50,
        alignSelf: "center"
    },
    submitButton: {
        width: 118,
        height: 56,
        marginTop: 166,
        alignSelf: "flex-end",
        bottom:0,
    },
    gameStepContainer: {
        alignSelf: "center",
        margin:10,
        paddingTop:50
    }
});
