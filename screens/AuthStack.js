//@ts-check
import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Menu,
  IconButton
} from 'react-native-paper';
import { Text } from 'react-native';
import Login from './Login/Login';
import { AuthContext } from '../src/contexts/AuthContext';
import Welcome from './Welcome/Welcome';

const Stack = createStackNavigator();

const Auth = props => {
  const [show, setShow] = useState(false);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Enter your email and password',
          headerRight: () => (
            <Menu
              visible={show}
              onDismiss={() => setShow(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  onPress={() => setShow(true)}
                />
              }>
              <Menu.Item
                onPress={() => { }}
                title={<Text>Help</Text>} />
            </Menu>
          )
        }}
      />
    </Stack.Navigator>
  );
}

/*
<Stack.Screen 
          name="Chats" 
          component={Chats}
          options={{ headerShown: false }} />


*/

/*

{!authenticated ?
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }} />
            <Stack.Screen name="Login"
              component={Login}
              options={{ headerShown: false }} />
          </> :
          <>
          </>
        }

*/
export default Auth;