//@ts-check
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider
} from 'react-native-paper';
import Auth from './AuthStack';
import Home from './HomeStack';
import { AuthContext } from '../src/contexts/AuthContext';

const Stack = createStackNavigator();

const Main = props => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Provider>
      <Stack.Navigator>
        {!authenticated ?
          <>
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{
                headerShown: false
              }} />
          </> :
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false
              }} />
          </>
        }
      </Stack.Navigator>
    </Provider>
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
export default Main;