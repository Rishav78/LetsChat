import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList
} from 'react-native';
import {} from 'react-native-paper';
import Header from './Header';
import { ChatsContext } from '../../src/contexts/Chats';

const Chat = ({ route }) => {
  const { availableChats, createPersonalChat, messages } = useContext(ChatsContext);
  const [chatIndex, setChatIndex] = useState(-1);
  const [message, setMessage] = useState([]);

  const createChat = async user => {
    for(let i=0; i<availableChats.length;i++) {
      if( availableChats[i].chattype === 'personal' && availableChats[i].receiver._id === user) {
        fetchChatInfo(i, availableChats[i]._id);
        return;
      }
    }
    createPersonalChat(user);
  }

  const fetchChatInfo = async (i, id) => {
    setChatIndex(i);
    setMessage(await messages(availableChats[i]._id));
  }

  useEffect( _ => {
    const { user, chat } = route.params;
    if(user) {
      createChat(user);
      return () => {};
    }
    fetchChatInfo(chat.index, chat._id);
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1}}>
        <FlatList
          data={message}
          renderItem={() => <Text>hiii</Text>}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

export default Chat;