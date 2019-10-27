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

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            enabled: false,
            step: 1
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.step === 1 &&
                    <GameStep1></GameStep1>
                }
                {
                    this.state.step === 2 &&
                    <GameStep2></GameStep2>

                }
                {
                    this.state.step === 3 &&
                    <GameStep3></GameStep3>

                }
                <Button style={styles.submitButton} onPress={(e) => this.setState({ step: !his.state.step + 1 })} title="Enable"></Button>
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
        alignSelf: "center"
    },
});
