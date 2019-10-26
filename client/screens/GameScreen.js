import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Dimensions,
} from 'react-native';

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.enabled &&
                    <View>
                        <TextInput style={styles.textBox}></TextInput>
                    </View>
                }
                <Button style={styles.submitButton} onPress={(e) => this.setState({ enabled: !this.state.enabled })} title="Enable"></Button>
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
