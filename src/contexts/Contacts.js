import React, { useState, createContext, useContext, useEffect } from 'react';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid, Alert } from 'react-native';
import { UserContext } from './User';
import { DatabseContext } from './Database';

export const ContactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { db } = useContext(DatabseContext);

  useEffect(() => fetchContactsFromDatabase(), []);

  const fetchContactsFromDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM CONTACTS
    `, [], (tx, result) => {
        const data = {};
        for (let i = 0; i < result.rows.length; i++) {
          const contact = result.rows.item(i);
          data[`+${contact.countrycode}${contact.number}`] = contact;
        }
        setContacts(data);
        setLoading(false);
      });
    }, err => console.log(err));
  }

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
          Contacts.getAll(async (err, contactsArray) => {
            const data = {};
            if (err) {
              Alert.alert('Error', 'some error occurr try again later');
              return setLoading(false);
            };
            for (let i = 0; i < contactsArray.length; i++) {
              const phone = contactsArray[i].phoneNumbers;
              if(phone.length === 0) continue;
              const { label } = phone[0];
              const number = phone[0].number.replace(/ +/g, "");
              if (contacts[number]) continue;
              const { err, ...info } = await user(number);
              if (!err && !contacts[`+${info.countrycode}${info.number}`]) {
                console.log(info);
                insert(info);
                data[`+${info.countrycode}${info.number}`] = { ...info, label };
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