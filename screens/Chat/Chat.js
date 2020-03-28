import React from 'react';
import {
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import {} from 'react-native-paper';
import Header from './Header';

const Chat = ({ route }) => {
  console.log(route.params)
  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
}

export default Chat;