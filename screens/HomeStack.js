import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Menu,
  IconButton
} from 'react-native-paper';
import { Text } from 'react-native';
import { AuthContext } from '../src/contexts/AuthContext';
import Chats from './Chats/Chats';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chats"
        component={Chats}
        />
    </Stack.Navigator>
  );
}

export default Home;

