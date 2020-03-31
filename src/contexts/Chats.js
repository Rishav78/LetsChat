import React, { createContext, useState, useEffect, useContext } from 'react';
import { DatabseContext } from './Database';
import { ContactsContext } from './Contacts';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([]);
  const { db } = useContext(DatabseContext);
  const { contacts, loading } = useContext(ContactsContext);

  const chats = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM CHATS`, [], async (tx, result) => {
        const data = {};
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          console.log(item)
          item.members = await new Promise(function(resolve, reject){
            chatMembers(item.id, data => resolve(data));
          });
          if(item.chattype === 'personal') {
            const { user } = item.members[0];
            item.name = contacts[user].name;
          }
          data[item.id] = item;
        }
        console.log('sdfbgrevcds', data)
        setAvailableChats(data);
      });
    },
      (err) => {
        console.log('err -> ', err);
      });
  }

  const chatMembers = (chatid, cb) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM MEMBERS WHERE chatid="${chatid}"`, [],
        (tx, result) => cb(result.rows.raw()));
    });
  }

  const createPersonalChat = data => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO 
        CHATS (id, chattype)
        VALUES ("${data.id}", "personal")
      `, [],
        (tx, result) => {
          console.log(result);
        });

      tx.executeSql(`
        INSERT INTO
        MEMBERS
        VALUES (
          "${data.members[0].id}", 
          "${data.members[0].user}", 
          "${data.id}"
        )
      `, [],
        (tx, result) => {
          console.log(result);
          setAvailableChats( prevState => ({ ...prevState, [data.id]: { ...data, name: contacts[data.members[0].user].name} }));
        })
    },
      (err) => {
        console.log('err -> ', err);
      })
  }

  useEffect(() => {
    if(!loading)
     chats();
  }, [loading]);

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
    <ChatsContext.Provider value={{ availableChats, createPersonalChat }}>
      {children}
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;