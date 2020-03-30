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
import { AuthContext } from '../../src/contexts/AuthContext';

const Chats = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { availableChats } = useContext(ChatsContext);
  const [search, setSeach] = useState('');

  const chats = Object.values(availableChats);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header value={search} onChange={setSeach} logout={logout} />
      <FlatList
        style={{ flex: 1, backgroundColor: '#FFF' }}
        data={!search ? chats : chats.filter(e => new RegExp(search, 'i').test(e.chatname))}
        renderItem={(data) =>
          <Chat
            data={data.item}
            onPress={() => navigation.navigate('Chat', { chat: { _id: data.item._id, index: data.index } })} />}
        keyExtractor={item => item._id} />
      <FAB
        small
        icon="message-text"
        color="#FFF"
        style={styles.newChat}
        onPress={() => navigation.navigate('Contacts')}
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