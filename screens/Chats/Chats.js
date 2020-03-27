import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView
} from 'react-native';
import {
  Provider
} from 'react-native-paper';
import Header from './AppBar';
import { ChatsContext } from '../../src/contexts/Chats';

const Chats = ({ navigation }) => {
  const { chats } = useContext(ChatsContext);
  chats();
  return (
    <SafeAreaView>
      <View>

      </View>
    </SafeAreaView>
  );
}

export default Chats;