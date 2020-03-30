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
import InputMessage from '../../src/components/InputMessage';
import { ContactsContext } from '../../src/contexts/Contacts';

const Chat = ({ route }) => {
  const { availableChats, createPersonalChat, messages } = useContext(ChatsContext);
  const { contacts } = useContext(ContactsContext);
  const {socket} = useContext(SocketContext);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const { data } = route.params;
    setChat(data);
    if(availableChats[data.id]) {
      
    }
  }, []);

  const sendMessage = async message => {
    // if(!availableChats[chat.id]) {
    //   createPersonalChat({
    //     ...chat,
    //     member: contacts[chat.member.number]
    //   });
    // }
    setMessage( prevState => [ ...prevState, {message} ]);
    // socket.emit('send-message', {
    //   chat: {
    //     _id: availableChats[chatIndex]._id,
    //     receiver: [availableChats[chatIndex].receiver]
    //   },
    //   message: {
    //     message,
    //     messagetype: 'text'
    //   }
    // },
    // message => {
    //   setMessage( prevState => [ ...prevState, message ]);
    // })
  }


  return (
    !chat ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          data={contacts[`+${chat.member.countrycode}${chat.member.number}`]}
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