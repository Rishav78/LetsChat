import React, { useState, useEffect, createContext } from 'react';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

export const ContentsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState({});

  const refresh = () => {
    Contacts.checkPermission((err, res) => {
      if(res === 'authorized') {
        Contacts.getAll((err, contacts) => {
          const data = {};
          if(err) return;
          for(let i=0;i<contacts.length;i++) {
            const phone = contacts[i].phoneNumbers;
            for(let j=0;j<phone.length;j++) {
              if(!phone[j].number) {
                data[phone[j].number] = {
                  phone: phone[j].number,
                  name: contacts[j].givenName
                }
              }
            }
          }
          setContacts( prevState => ({ ...prevState, ...data }));
        });
      }
    });
  }

  useEffect( () => {
    refresh();
  }, []);

  return (
    <ContentsContext.Provider>
      { children }
    </ContentsContext.Provider>
  );
}

export default ContactsContextProvider;