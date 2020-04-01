import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
  Alert,
  Text
} from 'react-native';
import Header from './Header';
import { SocketContext } from '../../src/contexts/Socket';
import { ChatsContext } from '../../src/contexts/Chats';
import InputMessage from '../../src/components/InputMessage';
import { ContactsContext } from '../../src/contexts/Contacts';
import { MessageContext } from '../../src/contexts/Message';
import Message from '../../src/components/Message';

const Chat = ({ route }) => {
  const { availableChats, createPersonalChat, updateLastMessage } = useContext(ChatsContext);
  const { getMessages, createAndSaveMessage, insert } = useContext(MessageContext);
  const { contacts } = useContext(ContactsContext);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  const messageArray = Object.values(message);

  const receiveMessage = data => {
    const number = `+${chat.members[0].countrycode}${chat.members[0].number}`;
    if (data.chat.chattype !== 'personal' || number !== data.message.sender) {
      return;
    }
    insert(data.message);
    setMessage(prevState => ({ ...prevState, [data.message.id]: data.message }));
  }

  useEffect(() => {
    socket.on('new-message', receiveMessage);
    return () => {
      socket.off('new-message', receiveMessage);
    }
  }, [chat]);

  useEffect(_ => {
    const { data } = route.params;
    // console.log(data);
    getMessages(data.id, result => setMessage(result));
    setChat(data);
  }, []);

  const sendMessage = async message => {
    if (!message) return;
    const messageObject = await createAndSaveMessage(message, chat.id);
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
        members: chat.members.map(e => ({ number: e.number, countrycode: e.countrycode })),
        chattype: chat.chattype
      },
      message: messageObject
    },
    ({ err }) => {
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