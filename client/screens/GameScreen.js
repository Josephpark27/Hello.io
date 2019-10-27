import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
import WaitingStep from '../components/WaitingStep';

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: true,
            step: 1,
            ready: false,
            question: "",
            answer: "",
        }

        console.log(props.navigation.getParam("bossName", ""))

        global.SOCKET.on('connection', () => {
            global.SOCKET.send("Hello World");
        });

        global.SOCKET.on('event', (data) => {

        });


    }

    nextStep() {
        if (this.state.step === 1) {
            global.SOCKET.emit('party', { username: global.USER, question: this.state.question, answer: this.state.answer })
        }
        if (!this.state.ready) {
            this.setState({
                ready: true,
            })
        } else {
            this.setState({
                step: this.state.step + 1,
            })
        }
    }

    updateQuestionAnswer(q,a) {
        this.setState({
            question: q,
            answer: a,
        })
    }

    disable() {
        this.setState({
            enabled: false
        })
    }

    render() {
        return (
            <LinearGradient
                colors={['#B24592', '#F15F79']}
                style={styles.container}>
                <View style={styles.gameStepContainer}>
                    <Button title="X" onPress={this.props.navigation.navigate.bind(this, 'MapStack')} style={{marginTop:25, width:50, flex: 0, height: 50}}></Button>
                    {
                        this.state.step === 1 && this.state.enabled && !this.state.ready &&
                        <GameStep1 updateParent={this.updateQuestionAnswer.bind(this)} onSubmit={this.nextStep.bind(this)}></GameStep1>
                    }
                    {
                        this.state.step === 1 && this.state.enabled && this.state.ready &&
                        <WaitingStep onSubmit={this.nextStep.bind(this)}></WaitingStep>
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
        bottom: 0,
    },
    gameStepContainer: {
        alignSelf: "center",
        margin: 10,
        paddingTop: 50,
        flex: 1,
        display: 'flex',
        flexDirection: "row"
    }
});
