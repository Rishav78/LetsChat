//@ts-check
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider
} from 'react-native-paper';
import Auth from './AuthStack';

const Stack = createStackNavigator();

const Main = props => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Auth" 
            component={Auth}
            options={{
              headerShown: false
            }} />
        </Stack.Navigator>
      </NavigationContainer>
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