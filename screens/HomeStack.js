import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from './Chats/Chats';
import Header from './Chats/Header';
import ChatsContextProvider from '../src/contexts/Chats';
import SocketContextProvider from '../src/contexts/Socket';

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
              header: () => <Header />
            }}
          />
        </Stack.Navigator>
      </ChatsContextProvider>
    </SocketContextProvider>
  );
}

export default Home;
