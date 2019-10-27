import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MapScreen from '../screens/MapScreen';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MapStack = createStackNavigator(
  {
    Home: MapScreen,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-map${focused ? '' : '-outline'}`
          : 'md-map'
      }
    />
  ),
  params: {
    test:"Hello World"
  }
};

MapStack.path = '';

const GameStack = createStackNavigator(
  {
    Games: GameScreen,
  },
  config
);

GameStack.navigationOptions = {
  tabBarLabel: 'Game',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
  params: {
    test:"Hello World"
  }
};

GameStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MapStack,
  GameStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
