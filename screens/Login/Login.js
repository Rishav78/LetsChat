import React from 'react';
import {
  View,
  SafeAreaView
} from 'react-native';
import { Provider } from 'react-native-paper';
import Header from './Header';

const Login = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider>
        <Header />
        <View>

        </View>
      </Provider>
    </SafeAreaView>
  );
}

export default Login;