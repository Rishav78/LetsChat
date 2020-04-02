import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
  Alert
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Header from './Header';
import { SocketContext } from '../../src/contexts/Socket';
import { ChatsContext } from '../../src/contexts/Chats';
import InputMessage from '../../src/components/InputMessage';
import { MessageContext } from '../../src/contexts/Message';
import Message from '../../src/components/Message';

const Chat = ({ route }) => {
  const { availableChats, createPersonalChat, updateLastMessage } = useContext(ChatsContext);
  const { getMessages, createAndSaveMessage } = useContext(MessageContext);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState({});

  const messageArray = Object.values(message);

  const receiveMessage = data => {
    if (data.chat.chattype !== 'personal' || chat.id !== data.message.sender) {
      return;
    }
    setMessage(prevState => ({ ...prevState, [data.message.id]: data.message }));
  }

  useEffect(() => {
    socket.on('new-message', receiveMessage);
    return () => {
      socket.off('new-message', receiveMessage);
    }
  }, [chat]);

  useEffect(_ => {
    if(route.params.id) {
      setChat(availableChats[route.params.id]);
      getMessages(data.id, result => setMessage(result));
      return;
    }
    setChat(route.params.data);
  }, []);

  const sendMessage = async message => {
    if (!message) return;
    const state = await NetInfo.fetch();
    if(!state.isConnected) {
      return Alert.alert(
        'Network error', 
        'Check your internet connection and try again');
    }
    const messageObject = await createAndSaveMessage(message, chat);
    if (!availableChats[chat.id]) {
      createPersonalChat(chat, () => {
        updateLastMessage(chat.id, messageObject);
      });
    }
    else {
      updateLastMessage(chat.id, messageObject);
    }
    setMessage(prevState => ({ ...prevState, [messageObject.id]: messageObject }));
    socket.emit('send-message', {
      chat: {
        members: chat.members,
        chattype: chat.chattype
      },
      message: messageObject
    },
    err => {
      if (err) Alert.alert(err);
    });
  }

  return (
    !chat ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Header
          data={chat.members[0]}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={messageArray}
              renderItem={(data) =>
                <Message data={data.item} />
              }
              keyExtractor={item => item.id}
            />
          </View>
          <View>
            <InputMessage
              onPress={sendMessage}
            />
          </View>
        </View>
      </SafeAreaView>
  );
}

export default Chat;