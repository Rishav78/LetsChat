import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './Chats/Chats';
import ChatsContextProvider from '../src/contexts/Chats';
import SocketContextProvider from '../src/contexts/Socket';
import Chat from './Chat/Chat';
import UserContextProvider from '../src/contexts/User';
import Contacts from './Contacts/Contacts';
import ContactsContextProvider from '../src/contexts/Contacts';
import MessageContextProvider from '../src/contexts/Message';
import CreateGroup from './CreateGroup/CreateGroup';
import AddSubject from './CreateGroup/AddSubject';
import Group from './Group/Group';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <SocketContextProvider>
      <UserContextProvider>
        <ContactsContextProvider>
          <MessageContextProvider>
            <ChatsContextProvider>
              <Stack.Navigator>
                <Stack.Screen
                  name="Chats"
                  component={Chats}
                  options={{
                    title: "LetsChat",
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="Contacts"
                  component={Contacts}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                  options={{ headerShown: false }} />
                <Stack.Screen
                  name="Group"
                  component={Group}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="CreateGroup"
                  component={CreateGroup}
                  options={{ headerShown: false }} />
                <Stack.Screen
                  name="AddSubject"
                  component={AddSubject}
                  options={{ headerShown: false }} />
              </Stack.Navigator>
            </ChatsContextProvider>
          </MessageContextProvider>
        </ContactsContextProvider>
      </UserContextProvider>
    </SocketContextProvider>
  );
}

export default Home;

