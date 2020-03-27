import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './Chats/Chats';
import ChatsHeader from './Chats/Header';
import ChatsContextProvider from '../src/contexts/Chats';
import SocketContextProvider from '../src/contexts/Socket';
import Friends from './Friends/Friends';
import FriendsHeader from './Friends/Header';
import AddFriend from './AddFriend/AddFriend';
import AddFriendHeader from './AddFriend/Header';

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
            options={{ header: () => <FriendsHeader /> }}
          />
          <Stack.Screen
            name="AddFriend"
            component={AddFriend}
            options={{ header: () => <AddFriendHeader /> }} />
        </Stack.Navigator>
      </ChatsContextProvider>
    </SocketContextProvider>
  );
}

export default Home;

