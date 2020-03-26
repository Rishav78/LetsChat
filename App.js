/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import Login from './screens/Login/Login';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" 
          component={Login}
          options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
