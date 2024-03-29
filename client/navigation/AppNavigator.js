import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import WelcomeNavigator from './WelcomeNavigator';

export default createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        Main: WelcomeNavigator,
        Tabs: MainTabNavigator,
    })
);
