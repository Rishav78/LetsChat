import React, { createContext, useState, useEffect, useContext } from 'react';
import { DatabseContext } from './Database';
import { ContactsContext } from './Contacts';
import { SocketContext } from './Socket';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([]);
  const { db } = useContext(DatabseContext);
  const { socket, connected } = useContext(SocketContext);
  const { contacts, loading } = useContext(ContactsContext);

  const chats = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM CHATS`, [], async (tx, result) => {
        const data = {};
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          item.members = await new Promise(function (resolve, reject) {
            chatMembers(item.id, data => resolve(data));
          });
          item.lastmessage = await new Promise(function(resolve, reject) {
            lastMessage(item.id, data => resolve(data));
          });
          if (item.chattype === 'personal') {
            const { user } = item.members[0];
            item.name = contacts[user] ? contacts[user].name : user;
          }
          data[item.id] = item;
          console.log(item.lastmessage);
        }
        setAvailableChats(data);
      });
    },
      (err) => console.log(err));
  }

  const updateLastMessage = (chatid, message) => {
    setAvailableChats( prevSatate => {
      const chat = prevSatate[chatid];
      chat.lastmessage = message;
      return { ...prevSatate, [chat.id]: chat };
    });
  }

  const lastMessage = (chatid, cb) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM 
        MESSAGES WHERE chatid="${chatid}" 
        ORDER BY updatedAt DESC 
        LIMIT 1
      `, [], (tx, result) => {
        const message = result.rows.raw();
        if(message.length !== 0) {
          return cb(message[0]);
        }
        return cb(null);
      });
    }, err => console.log(err));
  }

  const chatMembers = (chatid, cb) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM MEMBERS WHERE chatid="${chatid}"`, [],
        (tx, result) => cb(result.rows.raw()));
    });
  }

  const createPersonalChat = (data, cb) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO 
        CHATS (
          id, 
          chattype, 
          createdAt, 
          updatedAt
        )
        VALUES (
          "${data.id}", 
          "personal",
          "${data.createdAt}",
          "${data.updatedAt}"
        )
      `, [],
        (tx, result) => console.log(result));

      tx.executeSql(`
        INSERT INTO
        MEMBERS
        VALUES (
          "${data.members[0].id}", 
          "${data.members[0].user}", 
          "${data.id}",
          "${data.members[0].createdAt}",
          "${data.members[0].updatedAt}"
        )
      `, [],
        (tx, result) => {
          setAvailableChats(prevState => (
            {
              ...prevState,
              [data.members[0].user]: {
                ...data,
                name: contacts[data.members[0].user] ? contacts[data.members[0].user].name : data.members[0].user
              }
            }
          ));
          if(cb) cb();
        })
    },
      (err) => console.log('err -> ', err));
  }

  const newMessage = data => {
    const { chat, message } = data;
    if (!availableChats[message.sender]) {
      const newChatData = { ...chat, members: [{ user: message.sender }] }
      createPersonalChat(newChatData);
    }
    updateLastMessage(chat.id, message);
  }

  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', newMessage);

    return () => {
      socket.off('new-message', newMessage);
    }
  }, [availableChats, socket]);

  useEffect(() => {
    if (!loading) chats();
  }, [loading]);

  return (
    <ChatsContext.Provider value={{ availableChats, createPersonalChat, updateLastMessage }}>
      {children}
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;