import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([]);

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
                chattype
                chatname
                chatmembers {
                  _id
                }
                createdAt
                updatedAt
              }
            }
          }
        `
      })
    });
    const {data} = await res.json();
    setAvailableChats(data.chats.chats);
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
    console.log(data);
    return data;
  }

  return (
    <ChatsContext.Provider value={{ availableChats, createPersonalChat }}>
      { children }
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;