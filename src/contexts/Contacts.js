import React, { useState, createContext, useContext } from 'react';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid, Alert } from 'react-native';
import { UserContext } from './User';
import { DatabseContext } from './Database';

export const ContactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { db } = useContext(DatabseContext);

  const refresh = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
      Contacts.checkPermission((err, res) => {
        if (res === 'authorized') {
          setLoading(true);
          Contacts.getAll(async (err, contacts) => {
            const data = {};
            if (err) {
              Alert.alert('Error', 'some error occurr try again later');
              return setLoading(false);
            };
            for (let i = 0; i < contacts.length; i++) {
              const phone = contacts[i].phoneNumbers;
              for (let j = 0; j < phone.length; j++) {
                const { number, label } = phone[j];
                const { err, ...info } = await user(number);
                if(!err && !data[info.number]) {
                  insert(info);
                  data[info.number] = { ...info, label };
                }
              }
            }
            setContacts(prevState => ({ ...prevState, ...data }));
            setLoading(false);
          });
        }
      });
    })
  }

  const insert = ({ name, number, countrycode, status }) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO CONTACTS VALUES (
          "${number}",
          "${countrycode}",
          "${name}",
          "${status}"
        )
    `, [], (tx, result) => console.log(result));
    }, err => console.log(err));
  }

  return (
    <ContactsContext.Provider value={{ contacts, refresh, loading }}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContextProvider;