import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text
} from 'react-native';
import {
  FAB
} from 'react-native-paper';
import { ChatsContext } from '../../src/contexts/Chats';
import Chat from '../../src/components/Chat';
import Header from './Header';

const Chats = ({ navigation }) => {
  const { availableChats } = useContext(ChatsContext);
  const [search, setSeach] = useState('');
  console.log(availableChats);
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Header value={search} onChange={setSeach} />
      <FlatList
        style={{ flex: 1, backgroundColor: '#FFF'}}
        data={ !search ? availableChats : availableChats.filter(e => new RegExp(search, 'i').test(e.chatname))}
        renderItem={(data) => <Chat data={data.item} />}
        keyExtractor={item => item._id} />
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