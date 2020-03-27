import React, { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {

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
              err
              chats {
                _id
                chattype
                chatname
                imageid
                createdAt
                updatedAt
              }
            }
          }
        `
      })
    });
    const data = await res.json();
    return data.data.chats;
  }

  return (
    <ChatsContext.Provider value={{ chats }}>
      { children }
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;