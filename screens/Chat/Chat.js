import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
  Alert,
  Text
} from 'react-native';
import { } from 'react-native-paper';
import Header from './Header';
import { SocketContext } from '../../src/contexts/Socket';
import { ChatsContext } from '../../src/contexts/Chats';
import { UserContext } from '../../src/contexts/User';
import InputMessage from '../../src/components/InputMessage';

const Chat = ({ route }) => {
  const { availableChats, createPersonalChat, messages } = useContext(ChatsContext);
  const { fetchUserInfo } = useContext(UserContext);
  const {socket} = useContext(SocketContext);
  const [chatIndex, setChatIndex] = useState(-1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on('new-message', data => {
      setMessage( prevState => [...prevState, data.message]);
    });
    () => {
      socket.removeAllListeners('new-message');
    }
  }, []);

  useEffect(_ => {
    const { user, chat } = route.params;
    if (user) {
      createChat(user);
      return () => { };
    }
    fetchChatInfo(chat.index, chat._id);
  }, []);

  const createChat = async user => {
    for (let i = 0; i < availableChats.length; i++) {
      if (availableChats[i].chattype === 'personal' && availableChats[i].receiver._id === user) {
        fetchChatInfo(i, availableChats[i]._id);
        return;
      }
    }
    setUser(await fetchUserInfo(user));
    setLoading(prevSatate => !prevSatate);
  }

  const fetchChatInfo = async (i, id) => {
    setChatIndex(i);
    setUser(await fetchUserInfo(availableChats[i].receiver._id));
    setMessage(await messages(availableChats[i]._id));
    setLoading(prevSatate => !prevSatate);
  }

  const sendMessage = async message => {
    if(chatIndex === -1) {
       await createPersonalChat(user._id);
       setChatIndex(0);
    }
    socket.emit('send-message', {
      chat: {
        _id: availableChats[chatIndex]._id,
        receiver: [availableChats[chatIndex].receiver]
      },
      message: {
        message,
        messagetype: 'text'
      }
    },
    message => {
      setMessage( prevState => [ ...prevState, message ]);
    })
  }


  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          data={user}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              data={message}
              renderItem={(data) => <Text>{data.item.message}</Text>}
              keyExtractor={item => item._id}
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