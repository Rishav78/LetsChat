import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import {} from 'react-native-paper';
import Header from './Header';
import { ChatsContext } from '../../src/contexts/Chats';

const Chat = ({ route }) => {
  const { availableChats, createPersonalChat } = useContext(ChatsContext);

  const fetchChatInfo = async () => {
    const { user } = route.params;
    for(let i=0; i<availableChats.length;i++) {
      const member = availableChats[i].chatmembers.filter( e => e._id === user);
      if(member.length === 1 && availableChats[i].chattype === 'personal') {
        console.log('exists');
        return;
      }
    }
    createPersonalChat(user);
  }

  useEffect(_ => {

    fetchChatInfo();

  }, []);


  return (
    <SafeAreaView>
      <Header />
    </SafeAreaView>
  );
}

export default Chat;