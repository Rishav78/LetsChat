import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './Chats/Chats';
import ChatsContextProvider from '../src/contexts/Chats';
import SocketContextProvider from '../src/contexts/Socket';
import AddFriend from './AddFriend/AddFriend';
import Chat from './Chat/Chat';
import UserContextProvider from '../src/contexts/User';
import Contacts from './Contacts/Contacts';
import ContactsContextProvider from '../src/contexts/Contacts';
import MessageContextProvider from '../src/contexts/Message';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <SocketContextProvider>
      <UserContextProvider>
        <ContactsContextProvider>
          <ChatsContextProvider>
            <MessageContextProvider>
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
                  name="AddFriend"
                  component={AddFriend}
                  options={{ headerShown: false }} />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                  options={{ headerShown: false }} />
              </Stack.Navigator>
            </MessageContextProvider>
          </ChatsContextProvider>
        </ContactsContextProvider>
      </UserContextProvider>
    </SocketContextProvider>
  );
}

export default Home;

