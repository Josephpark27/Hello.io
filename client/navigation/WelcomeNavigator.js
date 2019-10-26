import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LogIn';
import SignUpScreen from '../screens/SignUp';
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(
    createStackNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        Main: {
            screen: HomeScreen,
            title: "Welcome",
            navigationOptions: {
                header: null,
            }
        },
        LogIn: {
            screen: LogInScreen,
            title: "Log In"
        },
        SignUp: {
            screen: SignUpScreen,
            title: "Sign Up"
        }
    })
);