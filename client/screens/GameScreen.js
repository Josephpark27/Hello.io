import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
    ToastAndroid,
} from 'react-native';
import GameStep1 from '../components/GameStep1';
import GameStep2 from '../components/GameStep2';
import GameStep3 from '../components/GameStep3';
import WaitingStep from '../components/WaitingStep';
import io from 'socket.io-client'
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

        global.SOCKET = io("ws://10.142.140.165/" + global.BOSS)

        global.SOCKET.on('answer', (data) => {
            console.log(data);
            if (data.message) {
                this.setState({
                    step: 3
                })
            } else {
                if (data.result) {
                    // if right
                    this.setState({
                        step: 3,
                        result: data.result
                    })
                } else {
                    ToastAndroid.show("Wrong guess, try again!", ToastAndroid.LONG)
                }

                // else do nothing
            }
        });

        global.SOCKET.on('join', (data) => {
            console.log(data);
            if (data.message || data.question) {
                if (data.message === "Game begins!") {
                    setTimeout(() => {
                        this.setState({
                            step: 2
                        })
                    }, 1000)

                } else if (data.question) {
                    this.setState({
                        question: data.question
                    })
                }
            } else {
                this.setState({
                    status: (data.split(" ")[1]),
                    numbers: (data.split(" ")[2]).replace("players", "")
                })
            }
        });
    }

    makeGuess(guess) {
        global.SOCKET.emit('answer', { username: global.USER, answer: guess })
    }

    nextStep() {
        if (this.state.step === 1) {
            global.SOCKET.emit('join', { username: global.USER, question: this.state.question, answer: this.state.answer })
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

    updateQuestionAnswer(q, a) {
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

                <View style={{ marginLeft: 25, marginTop: 75, width: 50, height: 50 }}>
                    <Button title="X" onPress={this.props.navigation.navigate.bind(this, 'MapStack')} style={{ position: 'absolute', top: 25, width: 50, height: 50, left: 25 }}></Button>
                </View>
                <View style={styles.gameStepContainer}>
                    {
                        this.state.step === 1 && this.state.enabled && !this.state.ready &&
                        <GameStep1 updateParent={this.updateQuestionAnswer.bind(this)} onSubmit={this.nextStep.bind(this)}></GameStep1>
                    }
                    {
                        this.state.step === 1 && this.state.enabled && this.state.ready &&
                        <WaitingStep onSubmit={this.nextStep.bind(this)} numbers={this.state.numbers}></WaitingStep>
                    }
                    {
                        this.state.step === 2 && this.state.enabled &&
                        <GameStep2 onSubmit={this.nextStep.bind(this)} question={this.state.question} makeGuess={this.makeGuess}></GameStep2>

                    }
                    {
                        this.state.step === 3 && this.state.enabled &&
                        <GameStep3 result={this.state.result} onSubmit={this.disable.bind(this)}></GameStep3>
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
