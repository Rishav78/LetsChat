/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Main from './screens/Main';
import AuthContextProvider from './src/contexts/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
};

export default App;
