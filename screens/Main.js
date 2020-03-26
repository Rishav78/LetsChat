//@ts-check
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './Login/Login';
import { AuthContext } from '../src/contexts/AuthContext';

const Stack = createStackNavigator();

const Main = props => {
  const { authenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;