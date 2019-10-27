import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/MapScreen';
import GameScreen from '../screens/GameScreen';
import ChatBot from '../screens/ChatBot';

const config = Platform.select({
    web: { headerMode: 'none' },
    default: {},
});

const MapStack = createStackNavigator({
        Home: {
            screen:MapScreen,
            navigationOptions: {
                header: null,
            }},
    },
    config
);

MapStack.navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = {
            Platform.OS === 'ios' ?
            `ios-map${focused ? '' : '-outline'}` : 'md-map'
        }
        />
    ),
    params: {
        test: "Hello World"
    }
};

MapStack.path = '';

const GameStack = createStackNavigator({
        Games: {screen:GameScreen,
            navigationOptions: {
                header: null,
            }
        },
    },
    config
);

GameStack.navigationOptions = {
    tabBarLabel: 'Game',
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === 'ios' ? 'ios-play' : 'md-play' }
        />
    ),
    screenProps: {
        test: "Hello World"
    }
};

GameStack.path = '';

const ChatBotStack = createStackNavigator({
        Bot: ChatBot,
    },
    config
);

ChatBotStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => ( <
        TabBarIcon focused = { focused }
        name = { Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
        />
    ),
};

ChatBotStack.path = '';

const tabNavigator = createBottomTabNavigator({
    MapStack,
    GameStack,
    ChatBotStack,
});

tabNavigator.path = '';

export default tabNavigator;