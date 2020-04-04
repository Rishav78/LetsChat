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
import ActionHeader from './ActionHeader';

const Chat = ({ route }) => {
  const { createPersonalChat, updateLastMessage, chatMembers } = useContext(ChatsDispatchContext);
  const { getMessages, createAndSaveMessage, deleteMessages } = useContext(MessageDispatchContext);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(route.params.data);
  const [active, setActive] = useState(route.params.exist);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({});

  const messageArray = Object.values(message);
  const membersArray = Object.values(chat.members ? chat.members : {});

  const receiveMessage = data => {
    const key = `+${data.message.sender.countrycode}${data.message.sender.number}`;
    const chatid = data.chat.chattype === 'personal' ? key : data.chat.id;
    if (chat.id === chatid) {
      setMessage(prevState => ({ ...prevState, [data.message.id]: data.message }));
    }
  }

  const fetchData = async () => {
    const chat = route.params.data;
    const members = await new Promise((resolve, reject) => chatMembers(chat.id, resolve));
    const messages = await new Promise((resolve, reject) => getMessages(chat.id, resolve));
    setChat({ ...chat, members });
    setMessage(messages);
    setLoading(false);
  }

  useEffect(() => {
    socket.on('new-message', receiveMessage);
    return () => {
      socket.off('new-message', receiveMessage);
    }
  }, [chat]);


  useEffect(_ => {
    if (!route.params.exist) {
      setLoading(false);
      return;
    }
    fetchData();
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
    const { sendbyme, message, name, ...restinfo } = await createAndSaveMessage(text, chat);
    // return;

    // check if chat is already exist or not
    if (chat.chattype === 'personal' && !active) {
      // create chat if not exist
      await new Promise((resolve, reject) =>
        createPersonalChat(chat, membersArray[0], err => err ? reject(err) : resolve(null)));
      setActive(true);
    }

    // update last message
    updateLastMessage(chat.id, { sendbyme, message, ...restinfo });

    // insert new message in array
    setMessage(prevState => ({
      ...prevState,
      [restinfo.id]: { sendbyme, message, name, ...restinfo }
    }));

    // send the message to other users
    socket.emit('send-message', {
      chat: { members: membersArray, chattype: chat.chattype },
      message: { ...restinfo, message: membersArray.map(e => message) }
    },
      err => {
        if (err) Alert.alert(err.message);
      });
  }

  const deleteMessage = () => {
    setMessage(prevState => {
      const newState = {...prevState};
      for(let i=0;i<selected.length;i++) {
        delete newState[selected[i]]
      }
      deleteMessages(selected);
      setSelected([]);
      return newState;
    })
  }

  const selectMessage = id => {
    setSelected(prevState => {
      const newState = [...prevState, id];
      console.log('add', newState);
      return newState;
    })
  }

  const unSelectMessage = id => {
    setSelected(prevstate => {
      const newState = prevstate.filter(e => e !== id);
      console.log('remove',newState)
      return newState;
    });
  }

  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
        {selected.length === 0 ?
          <Header
            data={chat}
          /> :
          <ActionHeader
            count={selected.length}
            onDelete={() => deleteMessage()}
            onBack={() => setSelected([])}
          />
        }
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {messageArray.map((e, i) =>
                <Message
                  data={e}
                  key={i}
                  selectable={selected.length}
                  onSelect={() => selectMessage(e.id)}
                  onUnselect={() => unSelectMessage(e.id)}
                />)}
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