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
      tx.executeSql(`SELECT * FROM CONTACTS`, [],
        (tx, result) => {
          const data = {};
          for (let i = 0; i < result.rows.length; i++) {
            const contact = result.rows.item(i);
            data[`+${contact.countrycode}${contact.number}`] = contact;
          }
          setContacts(data);
          setLoading(false);
        });
    }, err => {
      setLoading(false);
      console.log(err);
    });
  }

  const refresh = () => {
    // Request permission for accessing contacts
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
      Contacts.checkPermission((err, res) => {
        // if get authorized
        if (res === 'authorized') {
          // set loading true
          setLoading(true);
          // get all saved contacts
          Contacts.getAll(async (err, contactsArray) => {
            // inital data
            const data = {};
            // err checking
            if (err) {
              Alert.alert('Error', 'some error occurr try again later');
              return setLoading(false);
            }
            // Iterate over all the contacts
            for (let i = 0; i < contactsArray.length; i++) {
              // Get all phone no
              const phone = contactsArray[i].phoneNumbers;
              // check if phone no exist or not
              if (phone.length === 0) continue;
              const { label } = phone[0];
              // replace all the space eg +91 988******* => +91988*******
              const number = phone[0].number.replace(/ +/g, "");
              // check if contact already exist in saved contact table
              if (contacts[number]) continue;
              // fetch user info. If not exist return error
              const { err, ...info } = await user(number);
              // user exist and is not in contact list
              if (!err && !contacts[`+${info.countrycode}${info.number}`]) {
                // save user into contacts array
                console.log(info);
                insert(info);
                // save data in data variable with number as key
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

  const insert = ({ name, number, countrycode, status, publickey }) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO 
        CONTACTS (
          number,
          countrycode,
          name,
          status,
          publickey,
          createdAt,
          updatedAt
        )
        VALUES (
          "${number}",
          "${countrycode}",
          "${name}",
          "${status}",
          "${publickey}",
          "${Date()}",
          "${Date()}"
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