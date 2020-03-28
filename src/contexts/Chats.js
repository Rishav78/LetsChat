import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './AuthContext';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    chats();
  }, []);

  const chats = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          query {
            chats {
              chats{
                _id
                chattype
                chatname
                chatmembers {
                  _id
                  firstname
                  lastname
                }
                createdAt
                updatedAt
              }
            }
          }
        `
      })
    });
    const { data } = await res.json();
    const chats = data.chats.chats;
    for(let i=0;i<chats.length;i++) {
      const chatmembers = chats[i].chatmembers.filter(e => e._id !== user);
      chats[i].receiver = chats[i].chattype === 'personal' ? chatmembers[0] : chatmembers;
      if(chats[i].chattype === 'personal') {
        chats[i].chatname = `${chats[i].receiver.firstname} ${chats[i].receiver.lastname}`
      }
      delete chats[i].chatmembers;
    }
    setAvailableChats(chats);
  }

  const createPersonalChat = async member => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          mutation{
            CreatePersonalChat(InputChat: {
              chatmember: "${member}"
            }) {
              _id
            }
          }
        `
      })
    });
    const data = await res.json();
    return data;
  }

  const messages = async _id => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query : `
          query {
            chat(_id: "${_id}") {
              messages {
                _id
                message
              }
            }
          }
        `
      })
    });
    const {data} = await res.json();
    return data.chat.messages;
  }

  return (
    <ChatsContext.Provider value={{ availableChats, createPersonalChat, messages }}>
      { children }
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;