import React from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';

const LoginHeader = props => {
  return (
    <Appbar.Header>
      <Appbar.Content
        title="Enter your email and password" 
      />
    </Appbar.Header>
  );
}

export default LoginHeader;