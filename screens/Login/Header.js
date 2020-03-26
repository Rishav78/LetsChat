import React, { useState } from 'react';
import {
  Appbar,
  Menu
} from 'react-native-paper';

const LoginHeader = props => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  return (
    <Appbar.Header>
      <Appbar.Content
        title="Enter your email and password"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      />
      <Menu
        visible={menuVisibility}
        onDismiss={() => setMenuVisibility(false)}
        anchor={
          <Appbar.Action
            color="#FFF"
            icon="dots-vertical" onPress={() => setMenuVisibility(true)} />
        }>
        <Menu.Item title="Help" />
      </Menu>
    </Appbar.Header>
  );
}

export default LoginHeader;