import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView
} from 'react-native';
import {
  FAB
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ChatsContext } from '../../src/contexts/Chats';
import User from '../../src/components/User';

const Chats = ({ navigation }) => {
  const { availableChats } = useContext(ChatsContext);
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1}}>
        {/* <User /> */}
      </View>
      <FAB
          small
          icon="message-text"
          color="#FFF"
          style={styles.newChat}
          onPress={() => navigation.navigate('Friends')}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newChat: {
    backgroundColor: '#2ab9a4',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
    margin: 25,
    color: '#FFF'
  }
})

export default Chats;