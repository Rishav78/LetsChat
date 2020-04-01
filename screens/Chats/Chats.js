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
import { SocketContext } from '../../src/contexts/Socket';

const Chats = ({ navigation }) => {
  const { disconnectSocket: logout } = useContext(SocketContext);
  const { availableChats } = useContext(ChatsContext);
  const [search, setSeach] = useState('');

  const chats = Object.values(availableChats).sort((a, b) => {
    const dateA = new Date(a.lastmessage ? a.lastmessage.createdAt: a.createdAt);
    const dateB = new Date(b.lastmessage ? b.lastmessage.createdAt : b.createdAt);
    return dateB - dateA;
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header value={search} onChange={setSeach} logout={logout} />
      <FlatList
        style={{ flex: 1, backgroundColor: '#FFF' }}
        data={!search ? chats : chats.filter(e => new RegExp(search, 'i').test(e.chattype === 'personal' ? e.name : e.group.name))}
        renderItem={(data) =>
          <Chat
            data={data.item}
            onPress={() => navigation.navigate('Chat', {data: data.item} )} />}
        keyExtractor={item => item.id} />
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