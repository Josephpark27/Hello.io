import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInScreen from '../screens/LogIn';
import SignUpScreen from '../screens/SignUp';
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: HomeScreen,
    LogIn: LogInScreen,
    SignUp: SignUpScreen,
    Tabs: MainTabNavigator,

  })
);
