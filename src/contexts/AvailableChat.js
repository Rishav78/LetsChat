// //@ts-check
// import React, { useState, useContext } from 'react';
// import {DatabseContext} from './Database';
// import { SocketContext } from './Socket';
// import { ContactsContext } from './Contacts';

// export const AvailableChatContext = React.createContext();

// const AvailableChatContextProvider = ({ children }) => {
//   const { db } = useContext(DatabseContext);
//   const { socket } = useContext(SocketContext);
//   const [availableChats, setAvailableChats] = useState({});
//   const { contacts, loading } = useContext(ContactsContext);

//   const chats = () => {
//     db.transaction(tx => {
//       tx.executeSql(`SELECT * FROM CHATS`, [], async (tx, result) => {
//         const data = {};
//         for (let i = 0; i < result.rows.length; i++) {
//           const item = result.rows.item(i);
//           item.members = await new Promise((resolve, reject) => chatMembers(item.id, resolve));
//           item.lastmessage = await new Promise((resolve, reject) => lastMessage(item.id, resolve));
//           if (item.chattype === 'personal') {
//             const key = `+${item.members[0].countrycode}${item.members[0].number}`;
//             item.name = contacts[key] ? contacts[key].name : key;
//           }
//           else {
//             item.group = await new Promise((resolve, reject) => groupInfo(item.id, resolve));
//           }
//           // console.log(item);
//           // console.log('--------------------------');
//           data[item.id] = item;
//         }
//         setAvailableChats(data);
//       });
//     },
//       (err) => console.log(err));
//   }

//   return (
//     <AvailableChatContext.Provider>
//       { children }
//     </AvailableChatContext.Provider>
//   );
// }

// export default AvailableChatContextProvider;