/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import Main from './screens/Main';

import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/contexts/AuthContext';
import Splash from './screens/Splash';

const App = () => {
  const [currentScreen, setCurrentscreen] = useState('Splash');

  useEffect(() => {
    setTimeout(() => setCurrentscreen('MainScreen'), 1000);
  }, []);

  const Screen = currentScreen === 'Splash' ? Splash : Main;
  return (

    <NavigationContainer>
      <AuthContextProvider>
        <Screen />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
