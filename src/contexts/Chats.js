import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { v1 as uuidv4 } from 'uuid';
import { DatabseContext } from './Database';
import { AuthContext } from './AuthContext';
import { cos } from 'react-native-reanimated';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([]);
  const { user } = useContext(AuthContext);
  const { db } = useContext(DatabseContext);

  const chats = () => {
    db.transaction( tx => {
      tx.executeSql(`SELECT * FROM CHATS`, [], (tx, result) => {
        const data = {};
        for(let i=0;i<result.rows.length;i++) {
          const item = result.rows.item(i);
          tx.executeSql(`
            SELECT * FROM 
            MEMBERS 
            WHERE chatid="${item.id}"`, 
          [], 
          (tx, result) => {
            item.receivers = result.rows.raw();
            data[item.id] = item;
          });
        }
        setAvailableChats(data);
      });
    },
    (err)  => {
      console.log('err -> ', err);
    });
  }

  const createPersonalChat = member => {
    const id = uuidv4();
    db.transaction( tx => {
      tx.executeSql(`
        INSERT INTO 
        CHATS (id, chattype)
        VALUES ("${id}", "personal")
      `, [], 
      (tx, result) => {
        console.log(result);
      });

      tx.executeSql(`
        INSERT INTO
        MEMBERS
        VALUES (
          "${uuidv4()}", 
          "${member._id}", 
          "${id}", 
          "${member.firstname}",
          "${member.lastname}"
        )
      `, [], 
      (tx, result) => {
        console.log(result);
      })
    },
    (err) => {
      console.log('err -> ', err);
    })
  }

  useEffect(() => {
    chats();
  }, []);

  // const chats = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   const res = await fetch('http://192.168.43.215:8000/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Barrer ${token}`
  //     },
  //     body: JSON.stringify({
  //       query: `
  //         query {
  //           chats {
  //             chats{
  //               _id
  //               chattype
  //               chatname
  //               chatmembers {
  //                 _id
  //                 firstname
  //                 lastname
  //               }
  //               createdAt
  //               updatedAt
  //             }
  //           }
  //         }
  //       `
  //     })
  //   });
  //   const { data } = await res.json();
  //   const chats = data.chats.chats;
  //   for(let i=0;i<chats.length;i++) {
  //     const chatmembers = chats[i].chatmembers.filter(e => e._id !== user);
  //     chats[i].receiver = chats[i].chattype === 'personal' ? chatmembers[0] : chatmembers;
  //     if(chats[i].chattype === 'personal') {
  //       chats[i].chatname = `${chats[i].receiver.firstname} ${chats[i].receiver.lastname}`
  //     }
  //     delete chats[i].chatmembers;
  //   }
  //   setAvailableChats(chats);
  // }

  // const createPersonalChat = async member => {
  //   const token = await AsyncStorage.getItem('token');
  //   const res = await fetch('http://192.168.43.215:8000/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Barrer ${token}`
  //     },
  //     body: JSON.stringify({
  //       query: `
  //         mutation{
  //           CreatePersonalChat(InputChat: { chatmember: "${member}" }) {
  //             _id
  //             chattype
  //             chatname
  //             chatmembers {
  //               _id
  //               firstname
  //               lastname
  //             }
  //             createdAt
  //             updatedAt
  //           }
  //         }
  //       `
  //     })
  //   });
  //   const data = await res.json();
  //   const chat = data.CreatePersonalChat;
  //   chat.receiver = chat.chatmembers.filter(e => e._id !== user)[0];
  //   delete chat.chatmembers;
  //   setAvailableChats( prevState => [chat, ...prevState]);
  // }

  // const messages = async _id => {
  //   const token = await AsyncStorage.getItem('token');
  //   const res = await fetch('http://192.168.43.215:8000/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Barrer ${token}`
  //     },
  //     body: JSON.stringify({
  //       query : `
  //         query {
  //           chat(_id: "${_id}") {
  //             messages {
  //               _id
  //               message
  //             }
  //           }
  //         }
  //       `
  //     })
  //   });
  //   const {data} = await res.json();
  //   return data.chat.messages;
  // }

  return (
    <ChatsContext.Provider value={{ availableChats }}>
      { children }
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;