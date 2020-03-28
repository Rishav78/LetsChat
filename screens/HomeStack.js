import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './Chats/Chats';
import ChatsHeader from './Chats/Header';
import ChatsContextProvider from '../src/contexts/Chats';
import SocketContextProvider from '../src/contexts/Socket';
import Friends from './Friends/Friends';
import AddFriend from './AddFriend/AddFriend';
import Chat from './Chat/Chat';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <SocketContextProvider>
      <ChatsContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{
              title: "LetsChat",
              header: () => <ChatsHeader />
            }}
          />
          <Stack.Screen
            name="Friends"
            component={Friends}
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
      </ChatsContextProvider>
    </SocketContextProvider>
  );
}

export default Home;

