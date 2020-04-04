import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Header from './Header';
import { SocketContext } from '../../src/contexts/Socket';
import { ChatsDispatchContext } from '../../src/contexts/Chats';
import InputMessage from '../../src/components/InputMessage';
import { MessageDispatchContext } from '../../src/contexts/Message';
import Message from '../../src/components/Message';

const Chat = ({ route }) => {
  const { createPersonalChat, updateLastMessage } = useContext(ChatsDispatchContext);
  const { getMessages, createAndSaveMessage, insert } = useContext(MessageDispatchContext);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(route.params.data);
  const [active, setActive] = useState(route.params.exist);
  const [message, setMessage] = useState({});

  const messageArray = Object.values(message);

  const receiveMessage = data => {
    const chatid = data.chat.chattype === 'personal' ? data.message.sender : data.chat.id;
    if (chat.id === chatid) {
      setMessage(prevState => ({ ...prevState, [data.message.id]: data.message }));
    }
  }

  useEffect(() => {
    socket.on('new-message', receiveMessage);
    return () => {
      socket.off('new-message', receiveMessage);
    }
  }, [chat]);

  useEffect(_ => {
    const { exist } = route.params;
    if (exist) {
      getMessages(chat.id, result => {
        setMessage(result);
      });
    }
  }, []);

  const sendMessage = async text => {
    // check if message is not empty
    if (!text) return;

    //check network conectivity
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      return Alert.alert(
        'Network error',
        'Check your internet connection and try again');
    }

    // generate message information
    const { sendbyme, message, ...restinfo } = await createAndSaveMessage(text, chat);

    // check if chat is already exist or not
    if (!active) {
      // create chat if not exist
      await new Promise((resolve, reject) =>
        createPersonalChat(chat, err => err ? reject(err) : resolve(null)));
      setActive(true);
    }

    // update last message
    updateLastMessage(chat.id, { sendbyme, message, ...restinfo });

    // insert new message in array
    setMessage(prevState => ({
      ...prevState,
      [restinfo.id]: { sendbyme, message, ...restinfo }
    }));

    // send the message to other users
    socket.emit('send-message', {
      chat: { members: chat.members, chattype: chat.chattype },
      message: { ...restinfo, message: chat.members.map(e => message) }
    },
      err => {
        if (err) Alert.alert(err.message);
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
            <ScrollView>
              {messageArray.map((e, i) =>
                <Message data={e} key={i} />)}
            </ScrollView>
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

export default React.memo(Chat, () => true);